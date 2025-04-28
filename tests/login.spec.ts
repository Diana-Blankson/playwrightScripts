import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { data } from '../utils/testData';

test.describe('Login Scenarios', () => {
  let login : LoginPage

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.visitPage();
  });

  test('Valid Users', async ({ page }) => {
    
    await login.loginPage(data.validUser.username, data.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('Locked out users', async ({ page }) => {

    await login.loginPage(data.lockedOutUser.username, data.password);
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
  
});
