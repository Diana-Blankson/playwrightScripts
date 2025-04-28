import { expect, Page } from "@playwright/test";
import { data } from "../utils/testData";

export class Checkout {
    constructor(private page : Page) {}
  
    async checkoutPage() {

        await this.page.click('[data-test="shopping-cart-link"]');
        await this.page.click('[data-test="checkout"]');

        await this.page.fill('[data-test="firstName"]', data.firstName);
        await this.page.fill('[data-test="lastName"]', data.lastName);
        await this.page.fill('[data-test="postalCode"]', data.postalCode);
        await this.page.click('[data-test="continue"]');

        // Assertion on checkout overview page
        const prices = await this.page.$$eval('[data-test="inventory-item-price"]', elements =>
        elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0'))
         );
  
         let expectedTotal = 0;
         for (let i = 0; i < prices.length; i++) {
           expectedTotal += prices[i];
         }
  
       const itemTotalText = await this.page.locator('[data-test="subtotal-label"]').textContent();
       const actualTotal = parseFloat(itemTotalText?.replace('Item total: $', '') || '0');

       expect(actualTotal).toBe(expectedTotal);
        
       await this.page.click('[data-test="finish"]')
        

    }

   
  }