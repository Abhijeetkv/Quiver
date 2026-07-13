import Handlebars from "handlebars";
import { decode } from "html-entities";
import { NonRetriableError } from "inngest";
import ky from "ky";

import type { NodeExecutor } from "@/features/executions/types";
import { slackChannel } from "@/inngest/channel/slack";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  return new Handlebars.SafeString(jsonString);
});

type SlackData = {
  variableName?: string;
  webhookUrl?: string;
  content?: string;
};

export const slackExecutor: NodeExecutor<SlackData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  await step.realtime.publish(
    `slack-loading-${nodeId}`,
    slackChannel.status,
    {
      nodeId,
      status: "loading",
    },
  );

  if (!data.content) {
    await step.realtime.publish(
      `slack-error-content-${nodeId}`,
      slackChannel.status,
      {
        nodeId,
        status: "error",
      },
    );

    throw new NonRetriableError(
      "Slack node: Message content is required",
    );
  }

  const rawContent = Handlebars.compile(data.content)(context);
  const content = decode(rawContent);

  try {
    const result = await step.run("slack-webhook", async () => {
      if (!data.webhookUrl) {
        throw new NonRetriableError(
          "Slack node: Webhook URL is required",
        );
      }

      try {
        await ky.post(data.webhookUrl, {
          json: {
            text: content, // ✅ Slack Incoming Webhooks require "text"
          },
        });
      } catch (error: any) {
        if (error.response) {
          console.error("Slack Error:", await error.response.text());
        }
        throw error;
      }

      if (!data.variableName) {
        throw new NonRetriableError(
          "Slack node: Variable name is missing",
        );
      }

      return {
        ...context,
        [data.variableName]: {
          text: content,
        },
      };
    });

    await step.realtime.publish(
      `slack-success-${nodeId}`,
      slackChannel.status,
      {
        nodeId,
        status: "success",
      },
    );

    return result;
  } catch (error) {
    await step.realtime.publish(
      `slack-error-${nodeId}`,
      slackChannel.status,
      {
        nodeId,
        status: "error",
      },
    );

    throw error;
  }
};