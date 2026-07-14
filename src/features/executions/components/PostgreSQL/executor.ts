import Handlebars from "handlebars";
import { decode } from "html-entities";
import { NonRetriableError } from "inngest";
import type { NodeExecutor } from "@/features/executions/types";
import { postgresqlChannel } from "@/inngest/channel/postgresql";
import pg from "pg";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  return new Handlebars.SafeString(jsonString);
});

// Helper for object keys with spaces
Handlebars.registerHelper("get", (obj: any, key: string) => {
  if (!obj) return "";
  return obj[key];
});

type PostgreSQLData = {
  variableName?: string;
  connectionString?: string;
  query?: string;
};

export const postgresqlExecutor: NodeExecutor<PostgreSQLData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  await step.realtime.publish(
    `postgresql-loading-${nodeId}`,
    postgresqlChannel.status,
    {
      nodeId,
      status: "loading",
    },
  );

  if (!data.connectionString) {
    await step.realtime.publish(
      `postgresql-error-conn-${nodeId}`,
      postgresqlChannel.status,
      {
        nodeId,
        status: "error",
      },
    );

    throw new NonRetriableError(
      "PostgreSQL node: Connection string is required",
    );
  }

  if (!data.query) {
    await step.realtime.publish(
      `postgresql-error-query-${nodeId}`,
      postgresqlChannel.status,
      {
        nodeId,
        status: "error",
      },
    );

    throw new NonRetriableError(
      "PostgreSQL node: SQL query is required",
    );
  }

  const rawConnectionString = Handlebars.compile(data.connectionString)(context);
  const connectionString = decode(rawConnectionString);

  const rawQuery = Handlebars.compile(data.query)(context);
  const query = decode(rawQuery);

  try {
    const result = await step.run("postgresql-query", async () => {
      const client = new pg.Client({
        connectionString,
      });

      try {
        await client.connect();
        const queryResult = await client.query(query);

        if (!data.variableName) {
          throw new NonRetriableError(
            "PostgreSQL node: Variable name is missing",
          );
        }

        return {
          ...context,
          [data.variableName]: {
            rows: queryResult.rows,
            rowCount: queryResult.rowCount,
            command: queryResult.command,
          },
        };
      } finally {
        await client.end();
      }
    });

    await step.realtime.publish(
      `postgresql-success-${nodeId}`,
      postgresqlChannel.status,
      {
        nodeId,
        status: "success",
      },
    );

    return result;
  } catch (error) {
    await step.realtime.publish(
      `postgresql-error-${nodeId}`,
      postgresqlChannel.status,
      {
        nodeId,
        status: "error",
      },
    );

    throw error;
  }
};