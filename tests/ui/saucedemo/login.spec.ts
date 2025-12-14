import { test } from '@playwright/test';
import { LoginJourney } from '../../../journeys/login.journey';

test.describe('Sauce Demo Login - Positive Cases=', () => {
  test('TEST-P001 | @Agus | Should successfully login account', async ({
    page,
  }) => {
    const journeyLogin = new LoginJourney(page);
    await journeyLogin.run({
      username: 'standard_user',
      password: 'secret_sauce',
    });
  });
});
