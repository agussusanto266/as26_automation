import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.getByPlaceholder('username');
    this.password = page.getByPlaceholder('password');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
  }

  async open() {
    await this.goto('/');
    await this.expectTitle('Swag Labs');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}
