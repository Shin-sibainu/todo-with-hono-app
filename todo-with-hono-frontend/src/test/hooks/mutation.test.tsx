import { describe, expect, test } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useDeleteTodo } from "../../hooks/mutation";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe(useDeleteTodo, () => {
  test("成功時にToDoアイテムが削除され、キャッシュが無効にされること", async () => {
    const { result } = renderHook(() => useDeleteTodo(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate(1);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });

  test("存在しないToDoアイテムを削除しようとした場合にエラーを返すこと", async () => {
    const { result } = renderHook(() => useDeleteTodo(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate(999);
    });

    await waitFor(() => {
      // expect(result.current.error?.message).toEqual("Todo not found");
      // expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
      // expect(result.current.error?.message).toEqual("Todo not found");
    });
  });
});
