"use client";
import { useAppDispatch } from "@/FSD/shared/store";
import { addTodoThunk } from "./todo.slice";
import { nanoid } from "nanoid";
import { TodoType } from "./types";

const TodoCreate = () => {
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const title = (form.elements.namedItem('title') as HTMLInputElement).value;
        
        const newTodo: TodoType = { 
            id: nanoid(), 
            title, 
            completed: false 
        };
        
        // Асинхронное обновление
        dispatch(addTodoThunk(newTodo));
        
        form.reset();
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 border border-gray-200 rounded-md p-2 w-75">
            <input className="border border-gray-200 rounded-md p-2 flex-1" type="text" placeholder="Todo" name="title" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-150 cursor-pointer">Add</button>
        </form>
    )
}

export default TodoCreate;