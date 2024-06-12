import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoApp from "../../components/TodoApp";

// //https://zenn.dev/seratch/articles/b0c1eca61b60e5
// //https://www.geekfeed.co.jp/geekblog/react-vitest

// QueryClientを作成
const queryClient = new QueryClient();

// コンポーネントをQueryClientProviderで囲むヘルパー関数
const renderWithClient = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe(TodoApp, () => {
  test("データフェッチ中のローディング状態が出力される", async () => {
    renderWithClient(<TodoApp />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("Todoアプリが表示されている", async () => {
    renderWithClient(<TodoApp />);

    expect(await screen.findByText(/Todo App/i)).toBeInTheDocument();
    expect(await screen.findByText(/Add/i)).toBeInTheDocument();

    expect(
      await screen.findByPlaceholderText("Add a new task")
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: "Add" })
    ).toBeInTheDocument();
    expect(
      (await screen.findAllByRole("button", { name: "編集" })).length
    ).toBeGreaterThan(0);
    expect(
      (await screen.findAllByRole("button", { name: "削除" })).length
    ).toBeGreaterThan(0);
  });

  test("Todo一覧が表示されている。", async () => {
    renderWithClient(<TodoApp />);

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByText("散歩")).toBeInTheDocument();
  });

  test("新しいTodoを追加する", async () => {
    renderWithClient(<TodoApp />);

    const input = screen.getByPlaceholderText("Add a new task");
    await userEvent.type(input, "新しいタスク");

    const addButton = screen.getByRole("button", { name: "Add" });
    await userEvent.click(addButton);

    // // findByTextを使って、非同期処理の完了を待つ
    const addedTodo = await screen.findByText("新しいタスク");

    expect(addedTodo).toBeInTheDocument();
  });
});
