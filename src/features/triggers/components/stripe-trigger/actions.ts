"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { stripeTriggerChannel } from "@/inngest/channel/stripe-trigger";
import { inngest } from "@/inngest/client";

export async function fetchStripeTriggerRealtimeToken() {
  return getClientSubscriptionToken(inngest, {
    channel: stripeTriggerChannel,
    topics: ["status"],
  });
};