import { Button } from "@/components/ui/button";
import { useExecuteWorkflow, useUpdateWorkflow } from "@/features/workflows/hooks/use-workflows";
import { FlaskConicalIcon } from "lucide-react";
import { useAtomValue } from "jotai";
import { editorAtom } from "./store/atoms";

export const ExecuteWorkflowButton = ({
    workflowId,
}: {
    workflowId: string;
}) => {
    const editor = useAtomValue(editorAtom)
    const saveWorkflow = useUpdateWorkflow()
    const executeWorkflow = useExecuteWorkflow()

    const handleExecute = () => {
        if (!editor) return;

        // Save the current editor state before executing
        // so the database has the latest node data (variableName, credentials, etc.)
        const nodes = editor.getNodes()
        const edges = editor.getEdges()

        saveWorkflow.mutate(
            { id: workflowId, nodes, edges },
            {
                onSuccess: () => {
                    executeWorkflow.mutate({ id: workflowId })
                },
            }
        )
    }

    const isPending = saveWorkflow.isPending || executeWorkflow.isPending;

    return (
        <Button size="lg" onClick={handleExecute} disabled={isPending}>
            <FlaskConicalIcon className="size-4" />
             Execute workflow
        </Button>
    );
}
