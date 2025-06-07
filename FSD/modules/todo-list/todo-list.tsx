"use client";
import { useAppDispatch, useAppSelector } from "@/FSD/shared/store";
import { useEffect } from "react";
import { fetchTodosThunk } from "./todo.slice";
import { todoSelectors } from "./todo.slice";
import { TodoType } from "./types";

const TodoList = () => {
    const todos = useAppSelector(todoSelectors.getTodos);
    const isLoading = useAppSelector(todoSelectors.getIsLoading);
    const error = useAppSelector(todoSelectors.getError);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodosThunk());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-5 p-5 bg-gray-100 rounded-md border border-gray-200 mt-5 w-75">
                <div className="text-center text-gray-600">Загрузка...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col gap-5 p-5 bg-red-50 rounded-md border border-red-200 mt-5 w-75">
                <div className="text-center text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 p-5 bg-gray-100 rounded-md border border-gray-200 mt-5 w-75">
            {todos.length === 0 ? (
                <div className="text-center text-gray-600">Список пуст</div>
            ) : (
                todos.map((todo: TodoType) => (
                    <div className="border-b border-gray-200 py-2" key={todo.id}>
                        {todo.title}
                    </div>
                ))
            )}
        </div>
    );
}

export default TodoList;