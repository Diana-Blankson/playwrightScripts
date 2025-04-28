import { Page } from "@playwright/test";

export class AddToCart {
    constructor(private page : Page) {}
  
    async addToCart() {

      await this.page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
      await this.page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

    }

    async removeFromCart(){
      await this.page.click('[data-test="remove-sauce-labs-backpack"]');
      await this.page.click('[data-test="remove-sauce-labs-bolt-t-shirt"]');
    }

  }