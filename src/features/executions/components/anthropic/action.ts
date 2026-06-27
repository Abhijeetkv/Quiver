"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { anthropicChannel } from "@/inngest/channel/anthropic";
import { inngest } from "@/inngest/client";

export async function fetchAnthropicRealtimeToken() {
  return getClientSubscriptionToken(inngest, {
    channel: anthropicChannel,
    topics: ["status"],
  });
};