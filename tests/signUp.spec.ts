import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/signUp.page';

test.describe('Sign Up', () => {

  test('User sign up', async ({ page }) => {
    const signup = new SignUpPage(page);

    await signup.signUp()
    await expect(page).toHaveURL(/account_created/);
   
  });
  
});