import type { NodeExecutor } from "@/features/executions/types";
import { googleFormTriggerChannel } from "@/inngest/channel/google-form-trigger";

type GoogleFormTriggerData = Record<string, unknown>;

export const googleFormTriggerExecutor: NodeExecutor<GoogleFormTriggerData> = async ({
  nodeId,
  context,
  step,
}) => {
  await step.realtime.publish(
    `google-form-trigger-loading-${nodeId}`,
    googleFormTriggerChannel.status,
    {
      nodeId,
      status: "loading",
    },
  );

  const result = await step.run(`google-form-trigger-${nodeId}`, async () => context);

  await step.realtime.publish(
    `google-form-trigger-success-${nodeId}`,
    googleFormTriggerChannel.status,
    {
      nodeId,
      status: "success",
    },
  );

  return result;
};