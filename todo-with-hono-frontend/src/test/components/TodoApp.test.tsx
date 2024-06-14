import { describe, expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoApp from "../../components/TodoApp";

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

  test("Todoアイテムを削除する", async () => {
    renderWithClient(<TodoApp />);

    // 新しいTodoを追加
    const input = screen.getByPlaceholderText("Add a new task");
    await userEvent.type(input, "削除するタスク");
    const addButton = screen.getByRole("button", { name: "Add" });
    await userEvent.click(addButton);

    // 追加されたTodoを確認
    expect(await screen.findByText("削除するタスク")).toBeInTheDocument();

    // screen.debug();
    // 全ての削除ボタンを取得し、最初のTodoの削除ボタンをクリックする
    const deleteButtons = screen.getAllByRole("button", { name: "削除" });
    await userEvent.click(deleteButtons[3]);

    // 削除されたTodoが画面から消えることを確認
    await waitFor(() => {
      expect(screen.queryByText("削除するタスク")).not.toBeInTheDocument();
    });
  });

  test("Todoアイテムを編集する", async () => {
    renderWithClient(<TodoApp />);

    // 新しいTodoを追加
    const input = screen.getByPlaceholderText("Add a new task");
    await userEvent.type(input, "編集前のタスク");
    const addButton = screen.getByRole("button", { name: "Add" });
    await userEvent.click(addButton);

    // 編集ボタンをクリック
    const editButtons = await screen.findAllByRole("button", { name: "編集" });
    await userEvent.click(editButtons[editButtons.length - 1]); // 最新のTodoの編集ボタンを選択

    // 編集フィールドに新しいテキストを入力
    const editInput = screen.getByDisplayValue("編集前のタスク");
    await userEvent.clear(editInput);
    await userEvent.type(editInput, "編集後のタスク");

    // 保存ボタンをクリック
    const saveButton = screen.getByText("保存");
    await userEvent.click(saveButton);

    // 編集が反映されたか確認
    expect(await screen.findByText("編集後のタスク")).toBeInTheDocument();
  });
});
