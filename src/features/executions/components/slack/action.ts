"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { slackChannel } from "@/inngest/channel/slack";
import { inngest } from "@/inngest/client";

export async function fetchSlackRealtimeToken() {
  return getClientSubscriptionToken(inngest, {
    channel: slackChannel,
    topics: ["status"],
  });
};