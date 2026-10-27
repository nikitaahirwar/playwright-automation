import { firstName, lastName, postalCode } from "../data/constants";

class Cart {
  constructor(page) {
    this.cartLink = page.locator("[data-test='shopping-cart-link']");
    this.itemNames = page.locator("[data-test='inventory-item-name']");
    this.items = page.locator("[data-test='inventory-item']");
    this.checkoutButton = page.locator("[data-test='checkout']");
    this.firstNameInput = page.locator("[data-test='firstName']");
    this.lastNameInput = page.locator("[data-test='lastName']");
    this.postalCodeInput = page.locator("[data-test='postalCode']");
    this.continueButton = page.locator("[data-test='continue']");
    this.tax = page.locator("[data-test='tax-label']");
    this.totalPrice = page.locator('[data-test="total-label"]');
    this.subtotalPrice = page.locator('[data-test="subtotal-label"]');
    this.finishButton = page.locator("[data-test='finish']");
    this.completeHeaderButton = page.locator("[data-test='complete-header']");
  }

  async gotoCart() {
    await this.cartLink.click();
  }
  async getAllCartNames() {
    return await this.itemNames.allTextContents();
  }

  async removeProduct(productName) {
    const item = await this.getCartItem(productName);
    await item.getByRole("button", { name: "Remove" }).click();
  }

  getCartItem(productName) {
    return this.items.filter({
      has: this.itemNames.filter({ hasText: productName }),
    });
  }

  async getCartItemCount() {
    return await this.items.count();
  }

  async clickOncheckout() {
    await this.checkoutButton.click();
  }

  async fillInformation() {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async getSubtotal() {
    const text = await this.subtotalPrice.textContent();
    return parseFloat(text.replace("Item total: $", ""));
  }

  async getTax() {
    const text = await this.tax.textContent();
    return parseFloat(text.replace("Tax: $", ""));
  }

  async getTotal() {
    const text = await this.totalPrice.textContent();
    return parseFloat(text.replace("Total: $", ""));
  }

  async clickFinishButton() {
    await this.finishButton.click();
  }
}

export { Cart };
