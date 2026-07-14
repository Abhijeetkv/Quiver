import { InitialNode } from "@/components/initial-node";
import { HttpRequestNode } from "@/features/executions/components/http-request/node";
import { GoogleFormTrigger } from "@/features/triggers/components/google-form-trigger/node";
import { ManualTriggerNode } from "@/features/triggers/components/manual-trigger/node";
import { StripeTriggerNode } from "@/features/triggers/components/stripe-trigger/node";
import { GeminiNode } from "@/features/executions/components/gemini/node";
import { NodeType } from "@/generated/prisma";
import type { NodeTypes } from "@xyflow/react";
import { SlackNode } from "@/features/executions/components/slack/node";
import { DiscordNode } from "@/features/executions/components/discord/node";
import { OpenAiNode } from "@/features/executions/components/openai/node";
import { AnthropicNode } from "@/features/executions/components/anthropic/node";
import { EmailNode } from "@/features/executions/components/email/node";
import { PostgreSQLNode } from "@/features/executions/components/PostgreSQL/node";
import { MongoDBNode } from "@/features/executions/components/mongodb/node";
import { MySQLNode } from "@/features/executions/components/mysql/node";

export const nodeComponents = {
    [NodeType.INITIAL]: InitialNode,
    [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
    [NodeType.HTTP_REQUEST]: HttpRequestNode,
    [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTrigger,
    [NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
    [NodeType.GEMINI]: GeminiNode,
    [NodeType.OPENAI]: OpenAiNode,
    [NodeType.ANTHROPIC]: AnthropicNode,
    [NodeType.DISCORD]: DiscordNode,
    [NodeType.SLACK]: SlackNode,
    [NodeType.EMAIL]: EmailNode,
    [NodeType.POSTGRESQL]: PostgreSQLNode,
    [NodeType.MONGODB]: MongoDBNode,
    [NodeType.MYSQL]: MySQLNode,

} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;

