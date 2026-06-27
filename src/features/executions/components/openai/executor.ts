import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import type { NodeExecutor } from "@/features/executions/types";
import { openAiChannel } from "@/inngest/channel/openai";
import prisma from "@/lib/db";
import { decrypt } from "@/lib/encryption";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type OpenAiData = {
  variableName?: string;
  credentialId?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

export const openAiExecutor: NodeExecutor<OpenAiData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
}) => {
  await step.realtime.publish(
    `openai-loading-${nodeId}`,
    openAiChannel.status,
    {
      nodeId,
      status: "loading",
    },
  );

  if (!data.variableName) {
    await step.realtime.publish(
      `openai-error-varname-${nodeId}`,
      openAiChannel.status,
      {
        nodeId,
        status: "error",
      },
    );
    throw new NonRetriableError("OpenAi node: Variable name is missing");
  }

  if (!data.credentialId) {
    await step.realtime.publish(
      `openai-error-credential-${nodeId}`,
      openAiChannel.status,
      {
        nodeId,
        status: "error",
      },
    );
    throw new NonRetriableError("OpenAi node: Credential is required");
  }

  if (!data.userPrompt) {
    await step.realtime.publish(
      `openai-error-prompt-${nodeId}`,
      openAiChannel.status,
      {
        nodeId,
        status: "error",
      },
    );
    throw new NonRetriableError("OpenAi node: User prompt is missing");
  }

  const systemPrompt = data.systemPrompt
    ? Handlebars.compile(data.systemPrompt)(context)
    : "You are a helpful assistant.";
  const userPrompt = Handlebars.compile(data.userPrompt)(context);

  const credential = await step.run("get-credential", () => {
    return prisma.credential.findUnique({
      where: {
        id: data.credentialId,
        userId,
      },
    });
  });

  if (!credential) {
    await step.realtime.publish(
      `openai-error-notfound-${nodeId}`,
      openAiChannel.status,
      {
        nodeId,
        status: "error",
      },
    );
    throw new NonRetriableError("OpenAI node: Credential not found");
  }

  const openai = createOpenAI({
    apiKey: decrypt(credential.value),
  });

  try {
    const { steps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-4"),
        system: systemPrompt,
        prompt: userPrompt,
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );

    const text = 
      steps[0].content[0].type === "text" 
        ? steps[0].content[0].text
        : "";
    
    await step.realtime.publish(
      `openai-success-${nodeId}`,
      openAiChannel.status,
      {
        nodeId,
        status: "success",
      },
    );

    return {
      ...context,
      [data.variableName]: {
        text,
      },
    }
  } catch (error) {
    await step.realtime.publish(
      `openai-error-${nodeId}`,
      openAiChannel.status,
      {
        nodeId,
        status: "error",
      },
    );
    throw error;
  }
};