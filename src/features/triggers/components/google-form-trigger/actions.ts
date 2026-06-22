"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { googleFormTriggerChannel } from "@/inngest/channel/google-form-trigger";
import { inngest } from "@/inngest/client";

export async function fetchGoogleFormTriggerRealtimeToken() {
  const token = await getClientSubscriptionToken(inngest, {
    channel: googleFormTriggerChannel,
    topics: ["status"],
  });

  return token;
};