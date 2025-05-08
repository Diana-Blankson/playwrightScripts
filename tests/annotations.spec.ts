import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { data } from '../utils/testData';

test.describe('Login Scenarios', () => {
  let login : LoginPage

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.visitPage();
  });

  test.skip('Valid Users', async ({ page }) => {
    
    await login.loginPage(data.validUser.userName, data.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test.fixme('Locked out users', async ({ page }) => {

    await login.loginPage(data.lockedOutUser.userName, data.password);
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  test('error users', {
    annotation:{
        type: 'Bug',
        description: 'https://jira.com/browse/QA-001',
    }}
    ,async ({ page }) => {

    await login.loginPage(data.errorUser.userName, data.password);
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Sorry, there was an error with this user'
    );
  });

  test.slow()
  test('Slow tests', async ({ page }) => {

    await login.loginPage(data.performanceGlitchUser.userName, data.password);
    await expect(page).toHaveURL(/inventory/);
  });

  
});
