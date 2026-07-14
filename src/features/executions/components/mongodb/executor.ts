import Handlebars from "handlebars";
import { decode } from "html-entities";
import { NonRetriableError } from "inngest";
import type { NodeExecutor } from "@/features/executions/types";
import { mongodbChannel } from "@/inngest/channel/mongodb";
import { MongoClient } from "mongodb";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  return new Handlebars.SafeString(jsonString);
});

Handlebars.registerHelper("get", (obj: any, key: string) => {
  if (!obj) return "";
  return obj[key];
});

type MongoDBData = {
  variableName?: string;
  connectionString?: string;
  collection?: string;
  operation?: "find" | "insertOne" | "updateOne" | "deleteOne";
  query?: string;
};

export const mongodbExecutor: NodeExecutor<MongoDBData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  await step.realtime.publish(
    `mongodb-loading-${nodeId}`,
    mongodbChannel.status,
    {
      nodeId,
      status: "loading",
    },
  );

  if (!data.connectionString) {
    await step.realtime.publish(
      `mongodb-error-conn-${nodeId}`,
      mongodbChannel.status,
      {
        nodeId,
        status: "error",
      },
    );
    throw new NonRetriableError("MongoDB node: Connection string is required");
  }

  if (!data.collection) {
    await step.realtime.publish(
      `mongodb-error-collection-${nodeId}`,
      mongodbChannel.status,
      {
        nodeId,
        status: "error",
      },
    );
    throw new NonRetriableError("MongoDB node: Collection name is required");
  }

  if (!data.query) {
    await step.realtime.publish(
      `mongodb-error-query-${nodeId}`,
      mongodbChannel.status,
      {
        nodeId,
        status: "error",
      },
    );
    throw new NonRetriableError("MongoDB node: Query/filter is required");
  }

  const rawConnectionString = Handlebars.compile(data.connectionString)(context);
  const connectionString = decode(rawConnectionString);

  const rawQuery = Handlebars.compile(data.query)(context);
  const queryString = decode(rawQuery);

  const rawCollection = Handlebars.compile(data.collection)(context);
  const collectionName = decode(rawCollection);

  const operation = data.operation || "find";

  try {
    const result = await step.run("mongodb-operation", async () => {
      let queryObj: any;
      try {
        queryObj = JSON.parse(queryString);
      } catch {
        throw new NonRetriableError(
          "MongoDB node: Invalid JSON in query/filter field",
        );
      }

      const client = new MongoClient(connectionString);

      try {
        await client.connect();
        const db = client.db();
        const collection = db.collection(collectionName);

        let operationResult: any;

        switch (operation) {
          case "find": {
            const documents = await collection.find(queryObj).toArray();
            operationResult = { documents, count: documents.length };
            break;
          }
          case "insertOne": {
            const insertResult = await collection.insertOne(queryObj);
            operationResult = {
              insertedId: insertResult.insertedId.toString(),
              acknowledged: insertResult.acknowledged,
            };
            break;
          }
          case "updateOne": {
            const filter = queryObj.filter || {};
            const update = queryObj.update || {};
            const updateResult = await collection.updateOne(filter, update);
            operationResult = {
              matchedCount: updateResult.matchedCount,
              modifiedCount: updateResult.modifiedCount,
              acknowledged: updateResult.acknowledged,
            };
            break;
          }
          case "deleteOne": {
            const deleteResult = await collection.deleteOne(queryObj);
            operationResult = {
              deletedCount: deleteResult.deletedCount,
              acknowledged: deleteResult.acknowledged,
            };
            break;
          }
          default:
            throw new NonRetriableError(
              `MongoDB node: Unsupported operation: ${operation}`,
            );
        }

        if (!data.variableName) {
          throw new NonRetriableError(
            "MongoDB node: Variable name is missing",
          );
        }

        return {
          ...context,
          [data.variableName]: operationResult,
        };
      } finally {
        await client.close();
      }
    });

    await step.realtime.publish(
      `mongodb-success-${nodeId}`,
      mongodbChannel.status,
      {
        nodeId,
        status: "success",
      },
    );

    return result;
  } catch (error) {
    await step.realtime.publish(
      `mongodb-error-${nodeId}`,
      mongodbChannel.status,
      {
        nodeId,
        status: "error",
      },
    );

    throw error;
  }
};
