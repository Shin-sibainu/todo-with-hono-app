// hooks/useEditTodo.js
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEditTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      title,
      isCompleted,
    }: {
      id: number;
      title: string;
      isCompleted: boolean;
    }) => {
      const response = await fetch(`http://localhost:8787/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title, isCompleted }),
      });
      if (!response.ok) {
        throw new Error("Failed to edit todo");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export default useEditTodo;