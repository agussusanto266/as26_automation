import { APIRequestContext } from '@playwright/test';
import { LoginPayload } from '../payloads/dummyJson.payloads';

export class DummyJsonLoginEndpoint {
  constructor(private request: APIRequestContext) {}
  async login(payload: LoginPayload) {
    return this.request.post('/auth/login', {
      headers: { 'Content-Type': 'application/json' },
      data: payload,
    });
  }
}
