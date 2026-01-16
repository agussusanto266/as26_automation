// Payload Creds

export type LoginPayload = {
  username: string;
  password: string;
  expiresInMins: number;
};

export class DummyJsonPayloads {
  // Positive Case
  static readonly validUsersCreds: LoginPayload = {
    username: 'emilys',
    password: 'emilyspass',
    expiresInMins: 30,
  };

  // Negative Case
  static readonly invalidUserCreds: LoginPayload = {
    username: 'emilys',
    password: 'wrongpassword',
    expiresInMins: 111,
  };
}
