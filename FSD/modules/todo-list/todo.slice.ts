import { createAppAsyncThunk } from "@/FSD/shared/types";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TodoType, todosSchema, todoSchema } from "./types";
import { z } from "zod";

const initialState = {
    todos: [] as Todos,
    isLoading: false,
    error: null as string | null,
}

type Todos = TodoType[];

export const fetchTodosThunk = createAppAsyncThunk("todo/fetchTodos", async (_, { dispatch }): Promise<Todos> => {
    try {
        const response = await axios.get("http://localhost:3001/todos");
        const result = todosSchema.safeParse(response.data);
        
        if (!result.success) {
            throw new Error(`Ошибка валидации данных: ${result.error.message}`);
        }
        
        return result.data;
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(`Ошибка валидации: ${error.message}`);
        }
        if (axios.isAxiosError(error)) {
            throw new Error(`Ошибка сети: ${error.message}`);
        }
        throw error;
    }
});

export const addTodoThunk = createAppAsyncThunk("todo/addTodo", async (todo: TodoType, { dispatch }): Promise<TodoType> => {
    try {
        const response = await axios.post("http://localhost:3001/todos", todo);
        const result = todoSchema.safeParse(response.data);
        
        if (!result.success) {
            throw new Error(`Ошибка валидации данных: ${result.error.message}`);
        }
        
        dispatch(fetchTodosThunk());
        return result.data;
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(`Ошибка валидации: ${error.message}`);
        }
        if (axios.isAxiosError(error)) {
            throw new Error(`Ошибка сети: ${error.message}`);
        }
        throw error;
    }
});

const todoSlice = createSlice({
    name: "todo",
    initialState,
    selectors: {
        getTodos: (state) => state.todos,
        getIsLoading: (state) => state.isLoading,
        getError: (state) => state.error,
    },
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload;
        },
        addTodo: (state, action) => {
            state.todos = [...state.todos, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodosThunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchTodosThunk.fulfilled, (state, action) => {
            state.todos = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchTodosThunk.rejected, (state, action) => {
            state.error = action.error.message ?? 'Произошла ошибка';
            state.isLoading = false;
        });
        builder.addCase(addTodoThunk.pending, (state, action) => {
            state.todos = [...state.todos, action.meta.arg];
        });
        builder.addCase(addTodoThunk.fulfilled, (state, action) => {
            state.todos = [...state.todos, action.meta.arg];
        });
    },
});

export const { setTodos } = todoSlice.actions;
export const { selectors:todoSelectors } = todoSlice;
export default todoSlice.reducer;