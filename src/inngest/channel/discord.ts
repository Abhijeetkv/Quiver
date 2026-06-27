import { realtime } from "inngest";
import { z } from "zod";

export const DISCORD_CHANNEL_NAME = "discord-execution";

export const discordChannel = realtime.channel({
  name: DISCORD_CHANNEL_NAME,
  topics: {
    status: {
      schema: z.object({
        nodeId: z.string(),
        status: z.enum(["loading", "success", "error"]),
      }),
    },
  },
});