"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { mongodbChannel } from "@/inngest/channel/mongodb";
import { inngest } from "@/inngest/client";

export async function fetchMongoDBRealtimeToken() {
  return getClientSubscriptionToken(inngest, {
    channel: mongodbChannel,
    topics: ["status"],
  });
};
