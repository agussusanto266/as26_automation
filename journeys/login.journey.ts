import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { inventoryPage } from '../pages/inventory.page';

type LoginInput = {
  username: string;
  password: string;
};

export class LoginJourney {
  private readonly loginPage: LoginPage;
  private readonly inventoryPage: inventoryPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.inventoryPage = new inventoryPage(page);
  }

  async run(input: LoginInput) {
    await this.loginPage.open();
    await this.loginPage.login(input.username, input.password);
    await this.inventoryPage.expectOnInventoryPage();
  }
}
