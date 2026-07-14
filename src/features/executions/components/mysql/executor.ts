import Handlebars from "handlebars";
import { decode } from "html-entities";
import { NonRetriableError } from "inngest";
import type { NodeExecutor } from "@/features/executions/types";
import { mysqlChannel } from "@/inngest/channel/mysql";
import mysql from "mysql2/promise";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  return new Handlebars.SafeString(jsonString);
});

Handlebars.registerHelper("get", (obj: any, key: string) => {
  if (!obj) return "";
  return obj[key];
});

type MySQLData = {
  variableName?: string;
  connectionString?: string;
  query?: string;
};

export const mysqlExecutor: NodeExecutor<MySQLData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  await step.realtime.publish(
    `mysql-loading-${nodeId}`,
    mysqlChannel.status,
    {
      nodeId,
      status: "loading",
    },
  );

  if (!data.connectionString) {
    await step.realtime.publish(
      `mysql-error-conn-${nodeId}`,
      mysqlChannel.status,
      {
        nodeId,
        status: "error",
      },
    );

    throw new NonRetriableError(
      "MySQL node: Connection string is required",
    );
  }

  if (!data.query) {
    await step.realtime.publish(
      `mysql-error-query-${nodeId}`,
      mysqlChannel.status,
      {
        nodeId,
        status: "error",
      },
    );

    throw new NonRetriableError(
      "MySQL node: SQL query is required",
    );
  }

  const rawConnectionString = Handlebars.compile(data.connectionString)(context);
  const connectionString = decode(rawConnectionString);

  const rawQuery = Handlebars.compile(data.query)(context);
  const query = decode(rawQuery);

  try {
    const result = await step.run("mysql-query", async () => {
      const connection = await mysql.createConnection(connectionString);

      try {
        const [rows, fields] = await connection.execute(query);

        if (!data.variableName) {
          throw new NonRetriableError(
            "MySQL node: Variable name is missing",
          );
        }

        return {
          ...context,
          [data.variableName]: {
            rows,
            rowCount: Array.isArray(rows) ? rows.length : 0,
            fields: fields?.map((f) => f.name),
          },
        };
      } finally {
        await connection.end();
      }
    });

    await step.realtime.publish(
      `mysql-success-${nodeId}`,
      mysqlChannel.status,
      {
        nodeId,
        status: "success",
      },
    );

    return result;
  } catch (error) {
    await step.realtime.publish(
      `mysql-error-${nodeId}`,
      mysqlChannel.status,
      {
        nodeId,
        status: "error",
      },
    );

    throw error;
  }
};
