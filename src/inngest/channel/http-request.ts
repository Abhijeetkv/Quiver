import { realtime } from "inngest";
import { z } from "zod";

export const httpRequestChannel = realtime.channel({
  name: ({ nodeId }: { nodeId: string }) => `httpRequest:${nodeId}`,
  topics: {
    status: {
      schema: z.object({
        state: z.enum(["loading", "error", "success"]),
        message: z.string().optional(),
        data: z.any().optional(),
      }),
    },
  },
});
