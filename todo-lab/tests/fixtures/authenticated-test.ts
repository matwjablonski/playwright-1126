import { test as base, type Page } from '@playwright/test';
import { appOrigin, sessionKey } from './auth-files';

export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await page.addInitScript(({ origin, key }) => {
      if (window.location.origin === new URL(origin).origin) {
        sessionStorage.setItem(key, 'true');
      }
    }, { origin: appOrigin, key: sessionKey });

    await use(page);
  },
});

export { expect } from '@playwright/test';
