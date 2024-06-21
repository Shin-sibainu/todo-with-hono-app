//https://tech.revcomm.co.jp/e2e-test-practice-with-playwright

import test, { expect } from "@playwright/test";

test.describe("Todo Application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://todo-fronend.pages.dev/", {
      waitUntil: "networkidle",
    });
  });

  test("Todoを追加", async ({ page }) => {
    // 新しいTodoを入力して追加
    await page.fill('input[placeholder="Add a new task"]', "Learn Playwright");
    await page.click("text=Add");
    // Todoリストに入力した内容が表示されているか確認
    await expect(page.locator("text=Learn Playwright").last()).toBeVisible();
  });

  test("Todoを追加して削除", async ({ page }) => {
    await page.fill('input[placeholder="Add a new task"]', "Delete Task");
    await page.click("text=Add");

    const todoListArea = page.locator('[aria-label="todo-list"]');
    await todoListArea.last().locator("role=button", { hasText: "Delete Task" })
      .click;

    await expect(page.locator('text="Delete Task"').last()).not.toBeVisible();
  });
});
