import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// //https://zenn.dev/seratch/articles/b0c1eca61b60e5
// //https://www.geekfeed.co.jp/geekblog/react-vitest

describe(App, () => {
  test("データフェッチ中のローディング状態が出力される", async () => {
    render(<App />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("Todoアプリが表示されている", async () => {
    render(<App />);
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
    render(<App />);
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByText("散歩")).toBeInTheDocument();
  });

  test("新しいTodoを追加する", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    // render(<App />);
    const input = screen.getByPlaceholderText("Add a new task");
    await userEvent.type(input, "新しいタスク");

    const addButton = screen.getByRole("button", { name: "Add" });
    await userEvent.click(addButton);

    // // findByTextを使って、非同期処理の完了を待つ
    const addedTodo = await screen.findByText("新しいタスク");

    expect(addedTodo).toBeInTheDocument();
  });
});
