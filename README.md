# Automation (UI & API)

Project ini berisi **automation UI dan API** menggunakan **Playwright Test**.
Setup dibuat **multi-project** supaya bisa jalan di **Multi Project** dan memisahkan **UI test** dan **API test**.

---

## Struktur Folder

```
.
├─ playwright.config.ts
├─ pages/          # Page Object UI
├─ journeys/       # Flow / journey UI
├─ tests/
│  ├─ ui/          # UI tests
│  └─ api/         # API tests
└─ fixtures/       # Test data (optional)
```

---

## Konsep Singkat

- **BasePage** → helper umum (goto, expect URL, dll)
- **Page Object** → locator & aksi per halaman
- **Journey** → alur bisnis (login, transfer, dll)
- **Test** → skenario & assertion

URL **tidak di-hardcode**, semua diatur lewat `project`.

---

## Konfigurasi Project (UI & API)

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    trace: 'on-first-retry',
    extraHTTPHeaders: { 'Content-Type': 'application/json' },
  },
  projects: [
    {
      name: 'api-chromium',
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        baseURL: 'https://uat.app.com',
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'ui-chromium',
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        baseURL: 'https://uat.app.com',
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
```

---

## Cara Menjalankan Test

### UI

```bash
npx playwright test --project=ui-sit-chromium
npx playwright test tests/ui/saucedemo/login.spec.ts --project=ui-sit-chromium
npx playwright test --project=ui-sit-chromium --headed
```

### API

```bash
npx playwright test --project=api-sit
npx playwright test tests/api/dummyjson/auth.spec.ts --project=api-sit
```

### Semua test

```bash
npx playwright test
```

---

## Contoh Test UI

```ts
test('Should login', async ({ page }) => {
  await new LoginJourney(page).run('standard_user', 'secret_sauce');
});
```

## Contoh Test API

```ts
test('Login API', async ({ request }) => {
  const res = await request.post('/auth/login', {
    data: { username: 'kminchelle', password: '0lelplR' },
  });
  expect(res.ok()).toBeTruthy();
});
```

---

## Catatan Penting

- Jangan hardcode URL di test atau page
- UI test pakai `page.goto('/')`
- API test pakai endpoint relatif (`/auth/login`)
- Pilih environment lewat `--project`
