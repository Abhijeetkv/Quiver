"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { DatabaseIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { PostgreSQLDialog, PostgreSQLFormValues } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchPostgreSQLRealtimeToken } from "./action";
import { postgresqlChannel } from "@/inngest/channel/postgresql";

type PostgreSQLNodeData = {
  connectionString?: string;
  query?: string;
};

type PostgreSQLNodeType = Node<PostgreSQLNodeData>;

export const PostgreSQLNode = memo((props: NodeProps<PostgreSQLNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: postgresqlChannel,
    topic: "status",
    refreshToken: fetchPostgreSQLRealtimeToken,
  });

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: PostgreSQLFormValues) => {
    setNodes((nodes) => nodes.map((node) => {
      if (node.id === props.id) {
        return {
          ...node,
          data: {
            ...node.data,
            ...values,
          }
        }
      }
      return node;
    }))
  };

  const nodeData = props.data;
  const description = nodeData?.query
    ? `${nodeData.query.slice(0, 50)}...`
    : "Not configured";

  return (
    <>
      <PostgreSQLDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/icons/postgre.png"
        name="PostgreSQL"
        status={nodeStatus}
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  )
});

PostgreSQLNode.displayName = "PostgreSQLNode";