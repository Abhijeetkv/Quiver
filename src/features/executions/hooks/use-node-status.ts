"use client";

import { useRealtime, type getClientSubscriptionToken } from "inngest/react";
import { useState, useEffect } from "react";
import type { NodeStatus } from "@/components/react-flow/node-status-indicator";
import type { googleFormTriggerChannel } from "@/inngest/channel/google-form-trigger";

interface UseNodeStatusOptions {
  nodeId: string;
  channel: typeof googleFormTriggerChannel;
  topic: string;
  refreshToken: () => ReturnType<typeof getClientSubscriptionToken>;
};

export function useNodeStatus({
  nodeId,
  channel,
  topic,
  refreshToken,
}: UseNodeStatusOptions) {
  const [status, setStatus] = useState<NodeStatus>("initial");

  const { messages } = useRealtime({
    channel,
    topics: [topic],
    enabled: true,
    token: refreshToken,
  });

  useEffect(() => {
    const latestMessage = messages.byTopic[topic];

    if (latestMessage?.data && "nodeId" in latestMessage.data && latestMessage.data.nodeId === nodeId) {
      setStatus((latestMessage.data as { status: string }).status as NodeStatus);
    }
  }, [messages, nodeId, topic]);

  return status;
};