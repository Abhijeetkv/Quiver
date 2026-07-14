"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { emailChannel } from "@/inngest/channel/email";
import { inngest } from "@/inngest/client";

export async function fetchEmailRealtimeToken() {
  return getClientSubscriptionToken(inngest, {
    channel: emailChannel,
    topics: ["status"],
  });
};