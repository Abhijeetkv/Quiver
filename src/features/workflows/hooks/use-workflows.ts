
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useWorkflowsParams } from "./use-workflows-params"


// Hook to fetch all workflows using suspense
export const useSuspenseWorkflows = () => {
    const trpc = useTRPC()
    const [params]  = useWorkflowsParams()
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params))
}


// Hooks to create a new workflow
export const useCreateWorkflow = () => {
    const trpc = useTRPC()
    const router = useRouter()
    const queryClient = useQueryClient()

    return useMutation(
        trpc.workflows.create.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow ${data.name} created`)
                queryClient.invalidateQueries(
                    trpc.workflows.getMany.queryOptions({})
                )
            },
            onError: (error) =>{
                toast.error(`Error creating workflow: ${error.message}`)
            }
        })
    )
}


// Hook to delete a workflow

export const useRemoveWorkflow = () => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    return useMutation(
        trpc.workflows.remove.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow ${data.name} removed`)
                queryClient.invalidateQueries(
                    trpc.workflows.getMany.queryOptions({})
                )
                queryClient.invalidateQueries(
                    trpc.workflows.getOne.queryFilter({id: data.id})
                )
            },
            onError: (error) =>{
                toast.error(`Error removing workflow: ${error.message}`)
            }
        })
)
}

// Hook to fetch a single workflow using suspense

export const useSuspenseWorkflow = (id: string) => {
    const trpc = useTRPC()
    return useSuspenseQuery(
        trpc.workflows.getOne.queryOptions({ id })
    )
}


// Hooks to update a workflow name
export const useUpdateWorkflowName = () => {
    const trpc = useTRPC()
    const router = useRouter()
    const queryClient = useQueryClient()

    return useMutation(
        trpc.workflows.updateName.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow ${data.name} updated`)
                queryClient.invalidateQueries(
                    trpc.workflows.getMany.queryOptions({})
                )
                queryClient.invalidateQueries(
                    trpc.workflows.getOne.queryOptions({id: data.id})
                )
            },
            onError: (error) =>{
                toast.error(`Failed to update workflow: ${error.message}`)
            }
        })
    )
}


// Hooks to update a workflow 
export const useUpdateWorkflow = () => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    return useMutation(
        trpc.workflows.update.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow ${data.name} saved`)
                queryClient.invalidateQueries(
                    trpc.workflows.getMany.queryOptions({})
                )
                queryClient.invalidateQueries(
                    trpc.workflows.getOne.queryOptions({id: data.id})
                )
            },
            onError: (error) =>{
                toast.error(`Failed to save workflow: ${error.message}`)
            }
        })
    )
}

// Hook to execute a workflow

export const useExecuteWorkflow = () => {
    const trpc = useTRPC()

    return useMutation(
        trpc.workflows.execute.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow ${data.name} executed`);
            },
            onError: (error) =>{
                toast.error(`Failed to execute workflow: ${error.message}`)
            }
        })
    )
}
