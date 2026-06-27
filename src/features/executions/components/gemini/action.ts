"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { geminiChannel } from "@/inngest/channel/gemini";
import { inngest } from "@/inngest/client";

export async function fetchGeminiRealtimeToken() {
  return getClientSubscriptionToken(inngest, {
    channel: geminiChannel,
    topics: ["status"],
  });
};