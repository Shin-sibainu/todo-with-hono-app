import { describe, expect, test } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFetchTodos } from "../../hooks/query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useFetchTodos", () => {
  test("should handle error when fetch fails", async () => {
    const { result } = renderHook(() => useFetchTodos(), {
      wrapper,
      initialProps: {
        queryKey: ["todos", { error: "true" }], // エラーパラメータを含むクエリキー
      },
    });

    await waitFor(() => result.current.isError);

    expect(result.current.error).toBeDefined();
  });
});
