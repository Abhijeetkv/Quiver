import { realtime } from "inngest";
import { z } from "zod";

export const ANTHROPIC_CHANNEL_NAME = "anthropic-execution";

export const anthropicChannel = realtime.channel({
  name: ANTHROPIC_CHANNEL_NAME,
  topics: {
    status: {
      schema: z.object({
        nodeId: z.string(),
        status: z.enum(["loading", "success", "error"]),
      }),
    },
  },
});