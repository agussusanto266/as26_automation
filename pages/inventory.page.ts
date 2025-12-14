import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class inventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectOnInventoryPage() {
    await this.expectUrl(/\/inventory\.html$/);
  }
}
