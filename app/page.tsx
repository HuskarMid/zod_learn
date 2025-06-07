import TodoCreate from "@/FSD/modules/todo-list/todo-create";
import TodoList from "@/FSD/modules/todo-list/todo-list";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TodoCreate />
      <TodoList />
    </div>
  );
}
