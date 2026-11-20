import { expect, test } from '@playwright/test';

// Zadanie 4: podstawowy test uruchamiany w każdym projekcie przeglądarkowym.
test('pokazuje formularz logowania', async ({ page }) => {
  await page.goto('/#/login');
  await expect(page.getByTestId('login-form')).toBeVisible();
  await expect(page.getByLabel('Hasło')).toBeVisible();
});
