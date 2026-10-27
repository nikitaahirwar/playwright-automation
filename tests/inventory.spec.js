import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Inventory } from "../pages/Inventory";
import {
  priceLowtoHigh,
  sauceLabsBackPackText,
  SauceLabsBikeLight,
} from "../data/constants";

let loginPage;
let inventory;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventory = new Inventory(page);
  await loginPage.open();
  await loginPage.login();
});

test("cart badge updates when adding products", async ({ page }) => {
  await inventory.addProductToCart(sauceLabsBackPackText);
  await inventory.addProductToCart(SauceLabsBikeLight);
  const cartCount = await inventory.getCardCount();
  expect(cartCount).toBe(2);
});

test("products can be sorted by price low to high", async ({ page }) => {
  await inventory.sortBy(priceLowtoHigh);
  const prices = await inventory.getAllProductPrices();
  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);
});
