import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { data } from '../utils/testData';

test.describe('Login Scenarios', {
    tag: '@smoke-tests',
  }, () => {

  let login : LoginPage

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.visitPage();
  });

  test('Valid Users', async ({ page }) => {
    
    await login.loginPage(data.validUser.userName, data.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('Locked out users', async ({ page }) => {

    await login.loginPage(data.lockedOutUser.userName, data.password);
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
  
  test('wrong username and password', {
    tag: '@wrong-credentials'
  },async ({ page }) => {

    await login.loginPage(data.wrongCredentials.userName, data.wrongCredentials.password);
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });


});