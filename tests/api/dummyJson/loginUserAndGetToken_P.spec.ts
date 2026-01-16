import { test, expect } from '@playwright/test';
import { DummyJsonLoginEndpoint } from '../../../api/endpoint/dummyJson.api';
import { DummyJsonPayloads } from '../../../api/payloads/dummyJson.payloads';

test.describe('Dummy JSON - Positive Case', () => {
  test('TEST-P001 | @Agus | Should successfully login and get access token', async ({
    request,
  }) => {
    const endpoint = new DummyJsonLoginEndpoint(request);
    const response = await endpoint.login(DummyJsonPayloads.validUsersCreds);
    // 1. STATUS CODE
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    // 1. PROPERTIES
    expect(responseBody).toHaveProperty('accessToken');
    expect(responseBody).toHaveProperty('refreshToken');
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('username');
    expect(responseBody).toHaveProperty('email');
    expect(responseBody).toHaveProperty('firstName');
    expect(responseBody).toHaveProperty('lastName');
    expect(responseBody).toHaveProperty('gender');
    expect(responseBody).toHaveProperty('image');

    // 2. VALUE - SESUAI PAYLOAD
    expect(responseBody.username).toBe(
      DummyJsonPayloads.validUsersCreds.username
    );

    // 3. DATA TYPE
    expect(typeof responseBody.accessToken).toBe('string');
    expect(typeof responseBody.refreshToken).toBe('string');
    expect(typeof responseBody.id).toBe('number');
    expect(typeof responseBody.username).toBe('string');
    expect(typeof responseBody.email).toBe('string');
    expect(typeof responseBody.gender).toBe('string');

    // 4. FORMAT - DINAMIS
    expect(responseBody.accessToken).toMatch(
      /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/
    );
    expect(responseBody.refreshToken).toMatch(
      /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/
    );
    expect(responseBody.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(responseBody.image).toMatch(/^https?:\/\/.+/);

    // 5. VALUE - DINAMIS
    expect(responseBody.id).toBeGreaterThan(0);
    expect(responseBody.firstName.length).toBeGreaterThan(0);
    expect(responseBody.lastName.length).toBeGreaterThan(0);
    expect(responseBody.gender).toMatch(/^(male|female|other)$/i);
  });
});
