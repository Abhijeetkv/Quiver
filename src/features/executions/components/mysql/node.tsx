"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { DatabaseIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { MySQLDialog, MySQLFormValues } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchMySQLRealtimeToken } from "./action";
import { mysqlChannel } from "@/inngest/channel/mysql";

type MySQLNodeData = {
  connectionString?: string;
  query?: string;
};

type MySQLNodeType = Node<MySQLNodeData>;

export const MySQLNode = memo((props: NodeProps<MySQLNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: mysqlChannel,
    topic: "status",
    refreshToken: fetchMySQLRealtimeToken,
  });

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: MySQLFormValues) => {
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
      <MySQLDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/icons/mysql.png"
        name="MySQL"
        status={nodeStatus}
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  )
});

MySQLNode.displayName = "MySQLNode";
