import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, { Options as KyOptions } from "ky";
import Handlebars from "handlebars";
import { httpRequestChannel } from "@/inngest/channel/http-request";

Handlebars.registerHelper("json", (context) => {
    const jsonString = JSON.stringify(context, null, 2);
    const safeString = new Handlebars.SafeString(jsonString);
    return safeString;
});

type HttpRequestData = {
    variableName: string;
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
}

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
    data,
    nodeId,
    context,
    step,
    publish,
}) => {

    if(!data.endpoint) {
        throw new NonRetriableError("No endpoint provided for HTTP request");
    }

    if(!data.variableName) {
        throw new NonRetriableError("No variable name provided for HTTP request");
    }

    if(!data.method) {
        throw new NonRetriableError("method not provided for HTTP request");
    }

    const ch = httpRequestChannel({ nodeId });

    // Publish loading state (non-durable, fine for transient progress)
    await publish(ch.status, {
        state: "loading" as const,
        message: `Sending ${data.method} request to ${data.endpoint}...`,
    });

    try {
        const result = await step.run("http-request", async () => {
            const endpoint = Handlebars.compile(data.endpoint)(context);
            const method = data.method;

            const options: KyOptions = { method}

            if(["POST", "PUT", "PATCH"].includes(method)){
                const resolved = Handlebars.compile(data.body || "{}")(context);
                JSON.parse(resolved) 
                options.body = resolved;
                options.headers = {
                    "Content-Type": "application/json"
                }
            }

            const response = await ky(endpoint, options);
            const contentType = response.headers.get("content-type");
            const responseData = contentType?.includes("application/json")
                ? await response.json()
                : await response.text();

                const responsePayload = {
                    httpResponse: {
                    status: response.status,
                    statusText: response.statusText,
                    data: responseData,
                },
                }

                
            return {
                ...context,
               [data.variableName!]: responsePayload
            }
        });

        // Publish success state (durable, won't re-fire on retry)
        await step.realtime.publish("http-request-success", ch.status, {
            state: "success" as const,
            message: "Request completed successfully",
        });

        return result;
    } catch (error) {
        // Publish error state (non-durable, acceptable for error reporting)
        await publish(ch.status, {
            state: "error" as const,
            message: error instanceof Error ? error.message : "Unknown error occurred",
        });
        throw error;
    }
}