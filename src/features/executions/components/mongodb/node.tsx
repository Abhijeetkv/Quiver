"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { DatabaseIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { MongoDBDialog, MongoDBFormValues } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchMongoDBRealtimeToken } from "./action";
import { mongodbChannel } from "@/inngest/channel/mongodb";

type MongoDBNodeData = {
  connectionString?: string;
  collection?: string;
  operation?: "find" | "insertOne" | "updateOne" | "deleteOne";
  query?: string;
};

type MongoDBNodeType = Node<MongoDBNodeData>;

export const MongoDBNode = memo((props: NodeProps<MongoDBNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: mongodbChannel,
    topic: "status",
    refreshToken: fetchMongoDBRealtimeToken,
  });

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: MongoDBFormValues) => {
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
  const description = nodeData?.collection
    ? `${nodeData.operation || "find"} → ${nodeData.collection}`
    : "Not configured";

  return (
    <>
      <MongoDBDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/icons/mongodb.png"
        name="MongoDB"
        status={nodeStatus}
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  )
});

MongoDBNode.displayName = "MongoDBNode";
