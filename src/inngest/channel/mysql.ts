import { realtime } from "inngest";
import { z } from "zod";

export const MYSQL_CHANNEL_NAME = "mysql-execution";

export const mysqlChannel = realtime.channel({
  name: MYSQL_CHANNEL_NAME,
  topics: {
    status: {
      schema: z.object({
        nodeId: z.string(),
        status: z.enum(["loading", "success", "error"]),
      }),
    },
  },
});
