import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoType } from "../App";
import { useState } from "react";

const TodoInput = () => {
  const [inputText, setInputText] = useState<string>("");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newTodo: TodoType) => {
      return fetch("http://localhost:8787/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
    },
    onSuccess: () => {
      setInputText("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div className="flex items-center mb-4">
      <input
        className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        placeholder="Add a new task"
        type="text"
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <button
        onClick={() => {
          mutation.mutate({ title: inputText });
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg"
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
