// hooks/useAddTodo.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoType } from "../App";

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
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
      // queryClient.setQueryData(["todos"], (oldTodos) => [...oldTodos, data]);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
