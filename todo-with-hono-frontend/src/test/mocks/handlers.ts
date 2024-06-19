import { http, HttpResponse } from "msw";
import { beforeEach } from "vitest";
import { Todo } from "../../types/types";

// todos をグローバルに定義
let todos: Todo[];

beforeEach(() => {
  // 各テストの開始前に todos 配列を初期状態にリセット
  todos = [
    { id: 1, title: "Test Todo", status: "todo" },
    { id: 2, title: "散歩", status: "done" },
  ];
});

export const handlers = [
  http.get("http://localhost:8787/todos", async (req) => {
    const url = new URL(req.request.url);

    const error = url.searchParams.get("error");

    if (error) {
      return HttpResponse.json(null, { status: 500 });
    }

    return HttpResponse.json(todos, { status: 200 });
  }),

  http.delete("http://localhost:8787/todos/:id", async (req) => {
    const { id } = req.params;
    // まずはIDが存在するかチェック
    if (!todos.find((todo) => todo.id === Number(id))) {
      return HttpResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // 存在する場合、そのTodoを配列から削除
    todos = todos.filter((todo) => todo.id !== Number(id));
    return HttpResponse.json(
      { message: `Todo with id ${id} has been deleted` },
      { status: 200 }
    );
  }),

  http.post("http://localhost:8787/todos", async (req) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newTodo = (await req.request.json()) as any;
    const newTodoWithId = { id: Date.now(), ...newTodo }; // 一意のIDを付与
    todos.push(newTodoWithId); // テスト用のデータ配列に追加
    return HttpResponse.json(newTodoWithId, { status: 201 });
  }),

  http.put("http://localhost:8787/todos/:id", async (req) => {
    const { id } = req.params;
    const updateInfo = (await req.request.json()) as Partial<Todo>;
    const todoIndex = todos.findIndex((todo) => todo.id === Number(id));
    if (todoIndex === -1) {
      return HttpResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // Update the todo
    const updatedTodo = { ...todos[todoIndex], ...updateInfo };
    todos[todoIndex] = updatedTodo;
    return HttpResponse.json(updatedTodo, { status: 200 });
  }),
];
