import { NonRetriableError } from "inngest";
import { inngest } from "./client";
import prisma from "@/lib/db";
import { topologicalSort } from "./utils";
import { ExecutionStatus, NodeType } from "@/generated/prisma";
import { getExecutor } from "@/features/executions/lib/executor-registry";

import { httpRequestChannel } from "./channel/http-request";
import { manualTriggerChannel } from "./channel/manual-trigger";
import { googleFormTriggerChannel } from "./channel/google-form-trigger";
import { stripeTriggerChannel } from "./channel/stripe-trigger";

import { geminiChannel } from "./channel/gemini";
import { openAiChannel } from "./channel/openai";
import { anthropicChannel } from "./channel/anthropic";
import { discordChannel } from "./channel/discord";
import { slackChannel } from "./channel/slack";

export const executeWorkflow = inngest.createFunction(
  {
    id: "execute-workflow",
    retries: process.env.NODE_ENV === "production" ? 3 : 0,

    onFailure: async ({ event, error }) => {
      try {
        await prisma.execution.update({
          where: {
            inngestEventId: event.id,
          },
          data: {
            status: ExecutionStatus.FAILED,
            error: error?.message ?? "Unknown error",
            errorStack: error?.stack ?? null,
            completedAt: new Date(),
          },
        });
      } catch (err) {
        console.error("Failed to update execution status:", err);
      }
    },
  },
  {
    event: "workflows/execute.workflow",
    channels: [
      httpRequestChannel(),
      manualTriggerChannel(),
      googleFormTriggerChannel(),
      stripeTriggerChannel(),
      geminiChannel(),
      openAiChannel(),
      anthropicChannel(),
      discordChannel(),
      slackChannel(),
    ],
  },
  async ({ event, step, publish }) => {
    const inngestEventId = event.id;
    const workflowId = event.data.workflowId;

    if (!inngestEventId || !workflowId) {
      throw new NonRetriableError(
        "Event ID or Workflow ID is missing"
      );
    }

    await step.run("create-execution", async () => {
      return prisma.execution.create({
        data: {
          workflowId,
          inngestEventId,
          status: ExecutionStatus.RUNNING,
        },
      });
    });

    const workflow = await step.run(
      "load-workflow",
      async () => {
        return prisma.workflow.findUniqueOrThrow({
          where: {
            id: workflowId,
          },
          include: {
            nodes: true,
            connections: true,
          },
        });
      }
    );

    const sortedNodes = topologicalSort(
      workflow.nodes,
      workflow.connections
    );

    const userId = workflow.userId;

    let context: Record<string, any> =
      event.data.initialData || {};

    for (const node of sortedNodes) {
      const executor = getExecutor(node.type as NodeType);

      if (!executor) {
        throw new NonRetriableError(
          `No executor registered for node type: ${node.type}`
        );
      }

      const result = await executor({
        data: node.data as Record<string, unknown>,
        nodeId: node.id,
        userId,
        context,
        step,
        publish,
      });

      context = {
        ...context,
        ...(result || {}),
      };
    }

    await step.run("update-execution", async () => {
      return prisma.execution.update({
        where: {
          inngestEventId,
        },
        data: {
          status: ExecutionStatus.SUCCESS,
          completedAt: new Date(),
          output: context,
        },
      });
    });

    return {
      workflowId,
      result: context,
    };
  }
);