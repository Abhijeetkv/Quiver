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
  const { connectionStatus, messages } = useRealtime({
    channel: httpRequestChannel,
    topics: ["status"],
    enabled,
    token: () => getRealtimeToken(),
  });

  // Find the latest message for this specific node
  const latestStatus = messages.byTopic.status;

  const isMatch = latestStatus?.data?.nodeId === nodeId;
  const status: NodeStatus = isMatch
    ? (latestStatus.data.status as NodeStatus)
    : "initial";
  const message: string | undefined = isMatch
    ? latestStatus.data.message
    : undefined;

  return {
    status,
    message,
    connectionStatus,
  };
}
