import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AddToCart } from '../pages/addToCart.page';
import { Checkout } from '../pages/checkout.page';
import { data } from '../utils/testData';

test.describe('Sauce Demo Tests', () => {
  let login: LoginPage;
  let cart: AddToCart;
  let checkout : Checkout;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    cart = new AddToCart(page);
    checkout = new Checkout(page);
    
    await login.visitPage();
    await login.loginPage(data.validUser.userName, data.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('checkout items', async ({ page }) => {

    await cart.addToCart();
    await checkout.checkoutPage();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });
 
});
 