"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { openAiChannel } from "@/inngest/channel/openai";
import { inngest } from "@/inngest/client";

export async function fetchOpenAiRealtimeToken() {
  return getClientSubscriptionToken(inngest, {
    channel: openAiChannel,
    topics: ["status"],
  });
};