import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { inventory_url, productTitle } from "../data/constants";

let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
});

test("user can login with valid credentials @smoke", async ({ page }) => {
  await loginPage.login();
  await expect(page).toHaveURL(inventory_url);
  await expect(page.locator(".title")).toHaveText(productTitle);
});
