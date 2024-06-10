import { http, HttpResponse } from "msw";

let todos = [
  { id: 1, title: "Test Todo", status: "todo" },
  { id: 2, title: "散歩", status: "done" },
];

export const handlers = [
  http.get("http://localhost:8787/todos", async () => {
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
];
