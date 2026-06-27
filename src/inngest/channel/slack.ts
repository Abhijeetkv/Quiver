import { realtime } from "inngest";
import { z } from "zod";

export const SLACK_CHANNEL_NAME = "slack-execution";

export const slackChannel = realtime.channel({
  name: SLACK_CHANNEL_NAME,
  topics: {
    status: {
      schema: z.object({
        nodeId: z.string(),
        status: z.enum(["loading", "success", "error"]),
      }),
    },
  },
});