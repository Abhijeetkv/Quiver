"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { manualTriggerChannel } from "@/inngest/channel/manual-trigger";
import { inngest } from "@/inngest/client";

export async function fetchManualTriggerRealtimeToken() {
  return getClientSubscriptionToken(inngest, {
    channel: manualTriggerChannel,
    topics: ["status"],
  });
};