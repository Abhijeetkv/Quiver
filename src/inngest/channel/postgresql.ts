import { realtime } from "inngest";
import { z } from "zod";

export const POSTGRESQL_CHANNEL_NAME = "postgresql-execution";

export const postgresqlChannel = realtime.channel({
  name: POSTGRESQL_CHANNEL_NAME,
  topics: {
    status: {
      schema: z.object({
        nodeId: z.string(),
        status: z.enum(["loading", "success", "error"]),
      }),
    },
  },
});
