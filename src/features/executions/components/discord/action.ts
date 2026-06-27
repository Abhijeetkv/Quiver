"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { discordChannel } from "@/inngest/channel/discord";
import { inngest } from "@/inngest/client";

export async function fetchDiscordRealtimeToken() {
  return getClientSubscriptionToken(inngest, {
    channel: discordChannel,
    topics: ["status"],
  });
};