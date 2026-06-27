"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { httpRequestChannel } from "@/inngest/channel/http-request";
import { inngest } from "@/inngest/client";

export async function fetchHttpRequestRealtimeToken() {
  return getClientSubscriptionToken(inngest, {
    channel: httpRequestChannel,
    topics: ["status"],
  });
};