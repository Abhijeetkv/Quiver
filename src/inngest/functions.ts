import { NonRetriableError } from "inngest";
import { inngest } from "./client";
import prisma from "@/lib/db";
import { topologicalSort } from "./utils";
import { NodeType } from "@/generated/prisma";
import { getExecutor } from "@/features/executions/lib/executor-registry";


export const executeWorkflow = inngest.createFunction(
  {
    id: "execute-workflow",
    triggers: [
      {
        event: "workflows/execute.workflow",
      },
    ],
  },
  async ({ event, step }) => {
    const workflowId = (event.data as Record<string, unknown>).workflowId as string;

    if (!workflowId) {
      throw new NonRetriableError("No workflow ID provided");
    }

    const sortedNodes = await step.run(
      "prepare-workflow.nodes",
      async () => {
        const workflow = await prisma.workflow.findUniqueOrThrow({
          where: { id: workflowId },
          include: {
            nodes: true,
            connections: true,
          },
        });

        return topologicalSort(
          workflow.nodes,
          workflow.connections
        );
      }
    );

    // initialize context with trigger data
    let context = (event.data as Record<string, unknown>).initialData as Record<string, unknown> || {};

    // execute nodes in order
    for (const node of sortedNodes) {
      const executor = getExecutor(node.type as NodeType);

      context = await executor({
        data: node.data as Record<string, unknown>,
        nodeId: node.id,
        context,
        step,
      });
    }

    return {
      workflowId,
      result: context,
    };
  }
);