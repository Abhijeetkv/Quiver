import type { NodeExecutor } from "@/features/executions/types";

type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
    nodeId,
    context,
    step,
    publish,
}) => {

    const result = await step.run("manual-trigger", async () => context)

    return result;
}