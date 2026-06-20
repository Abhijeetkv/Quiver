"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { inngest } from "@/inngest/client";
import { httpRequestChannel } from "@/inngest/channel/http-request";

export async function getRealtimeToken(nodeId: string) {
  return getClientSubscriptionToken(inngest, {
    channel: httpRequestChannel({ nodeId }),
    topics: ["status"],
  });
}
