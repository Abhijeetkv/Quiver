"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { postgresqlChannel } from "@/inngest/channel/postgresql";
import { inngest } from "@/inngest/client";

export async function fetchPostgreSQLRealtimeToken() {
  return getClientSubscriptionToken(inngest, {
    channel: postgresqlChannel,
    topics: ["status"],
  });
};