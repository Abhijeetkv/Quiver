import { NodeType } from '@/generated/prisma';
import { NodeExecutor } from '../types';
import { manualTriggerExecutor } from '@/features/triggers/components/manual-trigger/executor';
import { httpRequestExecutor } from '../components/http-request/executor';
import { googleFormTriggerExecutor } from '@/features/triggers/components/google-form-trigger/executer';
import { stripeTriggerExecutor } from '@/features/triggers/components/stripe-trigger/executor';
import { geminiExecutor } from '../components/gemini/executor';
import { anthropicExecutor } from '../components/anthropic/executor';
import { openAiExecutor } from '../components/openai/executor';
import { slackExecutor } from '../components/slack/executor';
import { discordExecutor } from '../components/discord/executor';

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor as NodeExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
  [NodeType.STRIPE_TRIGGER]: stripeTriggerExecutor,
  [NodeType.GEMINI]: geminiExecutor,
  [NodeType.ANTHROPIC]: anthropicExecutor, 
  [NodeType.OPENAI]: openAiExecutor, 
  [NodeType.DISCORD]: discordExecutor,
  [NodeType.SLACK]: slackExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for node type: ${type}`);
  }
  return executor;
}