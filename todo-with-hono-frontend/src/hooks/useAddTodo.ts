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
      }).then((res) => res.json()); // レスポンスボディをJSONとして解析
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["todos"] });
    // },
    onSuccess: (data) => {
      // レスポンスデータを使用してToDoリストを更新
      queryClient.setQueryData(
        ["todos"],
        (oldTodos: TodoType[] | undefined) => {
          return [...(oldTodos || []), data]; // 確認: `data` が正しいオブジェクト形式であること
        }
      );
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
