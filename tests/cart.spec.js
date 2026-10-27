import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Inventory } from "../pages/Inventory";
import { Cart } from "../pages/CartPage";

import {
  sauceLabsBackPackText,
  SauceLabsBikeLight,
  cartUrl,
  checkoutUrl,
  thankYouPageUrl,
} from "../data/constants";

let loginPage;
let inventory;
let cart;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventory = new Inventory(page);
  cart = new Cart(page);
  await loginPage.open();
  await loginPage.login();
});

test("added products appear correctly in cart", async ({ page }) => {
  await inventory.addProductToCart(sauceLabsBackPackText);
  await inventory.addProductToCart(SauceLabsBikeLight);
  await cart.gotoCart();
  await expect(page).toHaveURL(cartUrl);
  const itemNames = await cart.getAllCartNames();
  expect(itemNames).toEqual([sauceLabsBackPackText, SauceLabsBikeLight]);
});

test("product can be removed from the cart", async ({ page }) => {
  await inventory.addProductToCart(sauceLabsBackPackText);
  await inventory.addProductToCart(SauceLabsBikeLight);
  await cart.gotoCart();

  await cart.removeProduct(sauceLabsBackPackText);
  const count = await cart.getCartItemCount();
  expect(count).toBe(1);
  const remainingNames = await cart.getAllCartNames();
  expect(remainingNames[0]).toEqual(SauceLabsBikeLight);
});

test("add a product to cart and head to checkout and user can proceed with right info", async ({
  page,
}) => {
  await inventory.addProductToCart(sauceLabsBackPackText);
  await inventory.addProductToCart(SauceLabsBikeLight);
  await cart.gotoCart();

  await cart.clickOncheckout();
  await cart.fillInformation();
  await cart.continueToOverview();
  await expect(page).toHaveURL(checkoutUrl);

  const subtotal = await cart.getSubtotal();
  const tax = await cart.getTax();
  const total = await cart.getTotal();
  expect(total).toBeCloseTo(subtotal + tax, 2);

  cart.clickFinishButton();

  await expect(page).toHaveURL(thankYouPageUrl);
  await expect(cart.completeHeaderButton).toHaveText(
    "Thank you for your order!",
  );
});
