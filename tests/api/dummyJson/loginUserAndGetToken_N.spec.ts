import { test, expect } from '@playwright/test';
import { DummyJsonLoginEndpoint } from '../../../api/endpoint/dummyJson.api';
import { DummyJsonPayloads } from '../../../api/payloads/dummyJson.payloads';

test.describe('Dummy JSON - Negative Case', () => {
  test('TEST-N001 | @Agus | Should fail login and get error message', async ({
    request,
  }) => {
    const endpoint = new DummyJsonLoginEndpoint(request);
    const response = await endpoint.login(DummyJsonPayloads.invalidUserCreds);

    // 1. STATUS CODE
    expect(response.status()).toBe(400);
    const responseBody = await response.json();

    // 2. PROPERTIES
    expect(responseBody).toHaveProperty('message');

    // 3. DATA TYPE
    expect(typeof responseBody.message).toBe('string');

    // 4. STATIS VALUE
    expect(responseBody.message).toBe('Invalid credentials');
  });
});
