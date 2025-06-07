import z from "zod";

export const todoSchema = z.object({
    id: z.string(),
    title: z.string(),
    completed: z.boolean(),
});

export const todosSchema = z.array(todoSchema);

export type TodoType = z.infer<typeof todoSchema>;