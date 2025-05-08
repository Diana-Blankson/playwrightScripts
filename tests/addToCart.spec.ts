import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AddToCart } from '../pages/addToCart.page';
import { data } from '../utils/testData';

test.describe('Add to Cart', () => {
  let login: LoginPage;
  let cart: AddToCart;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    cart = new AddToCart(page);
    
    await login.visitPage();
    await login.loginPage(data.validUser.userName, data.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('Add two items to Cart', async ({ page }) => {
    await cart.addToCart();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    await cart.removeFromCart();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });
 
});
 

 