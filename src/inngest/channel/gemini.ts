import { realtime } from "inngest";
import { z } from "zod";

export const GEMINI_CHANNEL_NAME = "gemini-execution";

export const geminiChannel = realtime.channel({
  name: GEMINI_CHANNEL_NAME,
  topics: {
    status: {
      schema: z.object({
        nodeId: z.string(),
        status: z.enum(["loading", "success", "error"]),
      }),
    },
  },
});