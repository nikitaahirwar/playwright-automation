class Inventory {
  constructor(page) {
    this.page = page;

    this.inventoryItems = page.locator("[data-test='inventory-item']");

    this.inventoryName = page.locator("[data-test='inventory-item-name']");

    this.cartBadge = page.locator(".shopping_cart_badge");

    // Fixed CSS selectors
    this.sortDropDown = page.locator("[data-test='product-sort-container']");

    this.itemPrices = page.locator("[data-test='inventory-item-price']");
  }

  getProductCard(productName) {
    return this.inventoryItems.filter({
      has: this.page.locator("[data-test='inventory-item-name']", {
        hasText: productName,
      }),
    });
  }

  async addProductToCart(productName) {
    const product = this.getProductCard(productName);
    await product.getByRole("button", { name: "Add to cart" }).click();
  }

  async getCardCount() {
    const hasBadge = await this.cartBadge.count();
    if (hasBadge === 0) return 0;
    return parseInt(await this.cartBadge.textContent(), 10);
  }

  async sortBy(optionValue) {
    await this.sortDropDown.selectOption(optionValue);
  }

  async getAllProductPrices() {
    const priceTexts = await this.itemPrices.allTextContents();

    return priceTexts.map((price) => parseFloat(price.replace("$", "")));
  }
}

export { Inventory };
