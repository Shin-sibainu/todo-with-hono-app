import { useQuery } from "@tanstack/react-query";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TodoApp = () => {
  const {
    isLoading,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8787/todos");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) return "Loading...";

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Todo App
        </h1>
        <TodoInput />
        <TodoList todos={todos} />
      </div>
    </main>
  );
};

export default TodoApp;
