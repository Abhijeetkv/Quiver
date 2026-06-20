"use client";

import { useRealtime } from "inngest/react";
import { httpRequestChannel } from "@/inngest/channel/http-request";
import { getRealtimeToken } from "@/app/actions/realtime";
import type { NodeStatus } from "@/components/react-flow/node-status-indicator";

/**
 * Subscribe to realtime status updates for a workflow node.
 * Returns the current NodeStatus and an optional message.
 */
export function useNodeStatus(nodeId: string, enabled = true) {
  const topics = ["status"] as const;
  const channel = httpRequestChannel({ nodeId });

  const { connectionStatus, messages } = useRealtime({
    channel,
    topics,
    enabled,
    token: () => getRealtimeToken(nodeId),
  });

  const latestStatus = messages.byTopic.status;

  const state: NodeStatus = latestStatus?.data?.state ?? "initial";
  const message: string | undefined = latestStatus?.data?.message ?? undefined;

  return {
    status: state,
    message,
    connectionStatus,
  };
}
