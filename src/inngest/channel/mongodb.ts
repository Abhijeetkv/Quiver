import { realtime } from "inngest";
import { z } from "zod";

export const MONGODB_CHANNEL_NAME = "mongodb-execution";

export const mongodbChannel = realtime.channel({
  name: MONGODB_CHANNEL_NAME,
  topics: {
    status: {
      schema: z.object({
        nodeId: z.string(),
        status: z.enum(["loading", "success", "error"]),
      }),
    },
  },
});
