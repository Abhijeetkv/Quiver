import { realtime } from "inngest";
import { z } from "zod";

export const EMAIL_CHANNEL_NAME = "email-execution";

export const emailChannel = realtime.channel({
  name: EMAIL_CHANNEL_NAME,
  topics: {
    status: {
      schema: z.object({
        nodeId: z.string(),
        status: z.enum(["loading", "success", "error"]),
      }),
    },
  },
});
