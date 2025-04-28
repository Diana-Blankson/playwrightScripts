import { Page } from "@playwright/test";

export class LoginPage {
    constructor(private page : Page) {}
  
    async visitPage() { 
      await this.page.goto('/');
    }
  
    async loginPage(username: string, password: string) {

      await this.page.fill('[data-test="username"]', username);
      await this.page.fill('[data-test="password"]', password);
      await this.page.click('[data-test="login-button"]');
    }

  }