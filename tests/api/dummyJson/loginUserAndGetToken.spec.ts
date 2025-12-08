import { test, expect } from '@playwright/test';

const requestBody = {
  username: 'emilys',
  password: 'emilyspass',
  expiresInMins: 30,
};

test.describe('Dummy JSON - Positive Case', () => {
  test('TEST-P001 | @Agus | Should successfully login and get access token', async ({
    request,
  }) => {
    const response = await request.post(`/auth/login`, {
      data: requestBody,
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('accessToken');
    expect(responseBody).toHaveProperty('refreshToken');
    console.log(responseBody);
  });
});
