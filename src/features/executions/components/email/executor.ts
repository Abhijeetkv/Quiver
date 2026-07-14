import Handlebars from "handlebars";
import { decode } from "html-entities";
import { NonRetriableError } from "inngest";
import type { NodeExecutor } from "@/features/executions/types";
import { emailChannel } from "@/inngest/channel/email";
import ky from "ky";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  return new Handlebars.SafeString(jsonString);
});

// Helper for object keys with spaces
Handlebars.registerHelper("get", (obj: any, key: string) => {
  if (!obj) return "";
  return obj[key];
});

type EmailData = {
  variableName?: string;
  to?: string;
  from?: string;
  subject?: string;
  body?: string;
};

export const emailExecutor: NodeExecutor<EmailData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  await step.realtime.publish(
    `email-loading-${nodeId}`,
    emailChannel.status,
    {
      nodeId,
      status: "loading",
    },
  );

  if (!data.to) {
    await step.realtime.publish(
      `email-error-to-${nodeId}`,
      emailChannel.status,
      {
        nodeId,
        status: "error",
      },
    );

    throw new NonRetriableError(
      "Email node: Recipient (to) is required",
    );
  }

  if (!data.subject) {
    await step.realtime.publish(
      `email-error-subject-${nodeId}`,
      emailChannel.status,
      {
        nodeId,
        status: "error",
      },
    );

    throw new NonRetriableError(
      "Email node: Subject is required",
    );
  }

  if (!data.body) {
    await step.realtime.publish(
      `email-error-body-${nodeId}`,
      emailChannel.status,
      {
        nodeId,
        status: "error",
      },
    );

    throw new NonRetriableError(
      "Email node: Body content is required",
    );
  }

  const rawTo = Handlebars.compile(data.to)(context);
  const to = decode(rawTo);

  const rawSubject = Handlebars.compile(data.subject)(context);
  const subject = decode(rawSubject);

  const rawBody = Handlebars.compile(data.body)(context);
  const body = decode(rawBody);

  const from = data.from
    ? decode(Handlebars.compile(data.from)(context))
    : "onboarding@resend.dev";

  try {
    const result = await step.run("email-send", async () => {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        throw new NonRetriableError(
          "Email node: RESEND_API_KEY environment variable is not set",
        );
      }

      await ky.post("https://api.resend.com/emails", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        json: {
          from,
          to: [to],
          subject,
          html: body,
        },
      });

      if (!data.variableName) {
        throw new NonRetriableError(
          "Email node: Variable name is missing",
        );
      }

      return {
        ...context,
        [data.variableName]: {
          to,
          subject,
          body,
          from,
        },
      };
    });

    await step.realtime.publish(
      `email-success-${nodeId}`,
      emailChannel.status,
      {
        nodeId,
        status: "success",
      },
    );

    return result;
  } catch (error) {
    await step.realtime.publish(
      `email-error-${nodeId}`,
      emailChannel.status,
      {
        nodeId,
        status: "error",
      },
    );

    throw error;
  }
};