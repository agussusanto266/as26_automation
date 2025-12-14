import { Page, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async expectTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async expectUrl(pathOrRegex: string | RegExp) {
    await expect(this.page).toHaveURL(pathOrRegex);
  }
}
