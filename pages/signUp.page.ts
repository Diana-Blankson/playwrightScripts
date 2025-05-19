import { Page } from "@playwright/test";
import { generateRandomEmail } from '../utils/helper';
import { data } from "../utils/testData";

export class SignUpPage {
    constructor(private page : Page) {}
  
    async signUp() {
      const email = generateRandomEmail()
        
      await this.page.goto ('https://automationexercise.com/signup')
      await this.page.fill('[data-qa="signup-name"]', data.other.name)
      await this.page.fill('[data-qa="signup-email"]',email)
      await this.page.locator('[type="submit"]').nth(1).click()
      await this.page.fill('[type="password"]', data.other.password)
      await this.page.fill('[name="first_name"]', data.other.firstName)
      await this.page.fill('[name="last_name"]', data.other.lastName)
      await this.page.fill('[name="address1"]', data.other.address)
      await this.page.fill('[name="state"]', data.other.state)
      await this.page.fill('[name="city"]', data.other.city)
      await this.page.fill('[ name="zipcode"]', data.other.zipCode)
      await this.page.fill('[name="mobile_number"]', data.other.mobileNumber)
      await this.page.click('[type="submit"]')
      await this.page.pause()
      
    }

  }