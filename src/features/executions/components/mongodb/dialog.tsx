"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  variableName: z
    .string()
    .min(1, { message: "Variable name is required" })
    .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
      message: "Variable name must start with a letter or underscore and contain only letters, numbers, and underscores",
    }),
  connectionString: z
    .string()
    .min(1, "Connection string is required"),
  collection: z
    .string()
    .min(1, "Collection name is required"),
  operation: z.enum(["find", "insertOne", "updateOne", "deleteOne"]),
  query: z
    .string()
    .min(1, "Query/filter JSON is required"),
});

export type MongoDBFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<MongoDBFormValues>;
};

export const MongoDBDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "",
      connectionString: defaultValues.connectionString || "",
      collection: defaultValues.collection || "",
      operation: defaultValues.operation || "find",
      query: defaultValues.query || "",
    },
  });

  // Reset form values when dialog opens with new defaults
  useEffect(() => {
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "",
        connectionString: defaultValues.connectionString || "",
        collection: defaultValues.collection || "",
        operation: defaultValues.operation || "find",
        query: defaultValues.query || "",
      });
    }
  }, [open, defaultValues, form]);

  const watchVariableName = form.watch("variableName") || "myMongo";
  const watchOperation = form.watch("operation") || "find";

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    onOpenChange(false);
  };

  const getQueryPlaceholder = () => {
    switch (watchOperation) {
      case "find":
        return '{ "status": "active" }';
      case "insertOne":
        return '{ "name": "John", "email": "john@example.com" }';
      case "updateOne":
        return '{ "filter": { "_id": "{{myId}}" }, "update": { "$set": { "status": "done" } } }';
      case "deleteOne":
        return '{ "_id": "{{myId}}" }';
      default:
        return "{}";
    }
  };

  const getQueryDescription = () => {
    switch (watchOperation) {
      case "find":
        return "The filter query to find documents.";
      case "insertOne":
        return "The document to insert.";
      case "updateOne":
        return 'JSON with "filter" and "update" fields.';
      case "deleteOne":
        return "The filter to match the document to delete.";
      default:
        return "The query/filter JSON.";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>MongoDB Configuration</DialogTitle>
          <DialogDescription>
            Configure the MongoDB connection and operation for this node.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-4"
          >
            <FormField
              control={form.control}
              name="variableName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variable Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="myMongo"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Use this name to reference the result in other nodes:{" "}
                    {`{{${watchVariableName}.documents}}`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="connectionString"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Connection String</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="mongodb+srv://user:password@cluster.mongodb.net/database"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    MongoDB connection string. Supports {"{{variables}}"} for dynamic values.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="users"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The MongoDB collection to operate on.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="operation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operation</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an operation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="find">Find</SelectItem>
                      <SelectItem value="insertOne">Insert One</SelectItem>
                      <SelectItem value="updateOne">Update One</SelectItem>
                      <SelectItem value="deleteOne">Delete One</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The MongoDB operation to perform on the collection.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Query / Filter</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={getQueryPlaceholder()}
                      className="min-h-[120px] font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {getQueryDescription()} Use {"{{variables}}"} for dynamic values
                    or {"{{json variable}}"} to stringify objects.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
