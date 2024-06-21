//https://tech.revcomm.co.jp/e2e-test-practice-with-playwright

import test, { expect } from "@playwright/test";

test.describe("Todo Application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://todo-fronend.pages.dev/");
  });

  test("Todoを追加", async ({ page }) => {
    // // 新しいTodoを入力して追加
    // await page.fill('input[placeholder="Add a new task"]', "Learn Playwright");
    // await page.click("text=Add");
    // // Todoリストに入力した内容が表示されているか確認
    // await expect(page.locator("text=Learn Playwright").last()).toBeVisible();
  });

  test("Todoの削除", async ({ page }) => {
    // await page.fill('input[placeholder="Add a new task"]', "Delete this Task");
    // await page.click("text=Add");
    // await expect(page.locator("text=Delete this Task").last()).toBeVisible();
    // await page.locator('button[aria-label="削除"]').last().click(); //ここでplaywrightが削除されている。
    // await expect(
    //   page.locator('text="Delete this Task"').last()
    // ).not.toBeVisible();
  });

  test("Todoの編集", async ({ page }) => {
    // 新しいTodoを追加
    await page.fill('input[placeholder="Add a new task"]', "Edit Task");
    await page.click("text=Add");

    await expect(page.locator("text=Edit Task").last()).toBeVisible();

    // 編集するTodoを特定して編集ボタンをクリック
    await page.locator('button[aria-label="編集"]').last().click(); //ここでplaywrightが削除されている。

    // 編集フィールドに新しい内容を入力
    const editInput = page.locator('input[placeholder="Edit"]');
    await editInput.fill("Edited Task");
    // 保存ボタンをクリック
    await page.locator("button", { hasText: "保存" }).last().click();
    // 編集が反映されたことを確認
    await expect(page.locator('text="Edited Task"')).toBeVisible();
  });
});
