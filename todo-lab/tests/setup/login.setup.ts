import { expect, test as setup } from '@playwright/test';
import { appOrigin, authFile, sessionKey } from '../fixtures/auth-files';
import { LoginPage } from '../pages/LoginPage.page';

setup('zapisuje stan TodoLab do ponownego użycia', async ({ page }) => {
  await page.goto(appOrigin);
  await new LoginPage(page).login('admin123');
  await expect(page.getByTestId('todo-list')).toBeVisible();

  expect(await page.evaluate((key) => sessionStorage.getItem(key), sessionKey)).toBe('true');

  await page.context().storageState({ path: authFile });
});
