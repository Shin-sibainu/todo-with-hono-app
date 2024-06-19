import test, { expect } from "@playwright/test";

// 各テストの開始前に todos 配列を初期状態にリセット
const todos = [
  { id: 1, title: "Test Todo", status: "todo" },
  { id: 2, title: "散歩", status: "done" },
];

test.describe("Todo Application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://todo-fronend.pages.dev/");
  });

  test("Todoを追加", async ({ page }) => {
    // 新しいTodoを入力して追加
    await page.fill('input[placeholder="Add a new task"]', "Learn Playwright");
    await page.click("text=Add");

    // Todoリストに入力した内容が表示されているか確認
    await expect(page.locator("text=Learn Playwright")).toBeVisible();
  });
});
