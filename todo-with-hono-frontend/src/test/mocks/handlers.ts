import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:8787/todos", async () => {
    return HttpResponse.json(
      [
        { id: 1, title: "Test Todo", status: "todo" },
        { id: 2, title: "散歩", status: "done" },
      ],
      { status: 200 }
    );
  }),

  http.delete("http://localhost:8787/todos/:id", async (req) => {
    const { id } = req.params;

    if (id === "999") {
      return HttpResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return HttpResponse.json(
      {
        message: `Todo with id ${id} has been deleted`,
      },
      { status: 200 }
    );
  }),
];
