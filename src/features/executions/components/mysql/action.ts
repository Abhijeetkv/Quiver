"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { mysqlChannel } from "@/inngest/channel/mysql";
import { inngest } from "@/inngest/client";

export async function fetchMySQLRealtimeToken() {
  return getClientSubscriptionToken(inngest, {
    channel: mysqlChannel,
    topics: ["status"],
  });
};
