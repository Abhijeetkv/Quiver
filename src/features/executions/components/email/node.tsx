"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { MailIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { EmailDialog, EmailFormValues } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchEmailRealtimeToken } from "./action";
import { emailChannel } from "@/inngest/channel/email";

type EmailNodeData = {
  to?: string;
  subject?: string;
};

type EmailNodeType = Node<EmailNodeData>;

export const EmailNode = memo((props: NodeProps<EmailNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: emailChannel,
    topic: "status",
    refreshToken: fetchEmailRealtimeToken,
  });

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: EmailFormValues) => {
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
  const description = nodeData?.to
    ? `To: ${nodeData.to}`
    : "Not configured";

  return (
    <>
      <EmailDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/icons/email.png"
        name="Email"
        status={nodeStatus}
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  )
});

EmailNode.displayName = "EmailNode";