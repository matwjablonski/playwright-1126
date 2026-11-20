import { appOrigin, sessionKey } from './fixtures/auth-files';
import { expect, test } from './fixtures/authenticated-test';
import { LoginPage } from './pages/LoginPage.page';

const todosUrl = `${appOrigin}/#/todos`;

// Każdy test zaczyna z pustym stanem, niezależnie od konfiguracji innych projektów.
test.use({ storageState: { cookies: [], origins: [] } });

test('sam storageState nie przenosi logowania zapisanego w sessionStorage', async ({ browser, page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('admin123');
  await expect(page).toHaveURL(/#\/todos$/);
  expect(await page.evaluate((key) => sessionStorage.getItem(key), sessionKey)).toBe('true');

  const storageState = await page.context().storageState();
  const restoredContext = await browser.newContext({ storageState });
  try {
    const restoredPage = await restoredContext.newPage();
    await restoredPage.goto(todosUrl);

    await expect(restoredPage).toHaveURL(/#\/login$/);
    await expect(restoredPage.getByTestId('login-form')).toBeVisible();
    expect(await restoredPage.evaluate((key) => sessionStorage.getItem(key), sessionKey)).toBeNull();
  } finally {
    await restoredContext.close();
  }
});

test('otwiera listę z sesją przygotowaną przez fixture', async ({ authenticatedPage }) => {
  await authenticatedPage.goto(todosUrl);

  await expect(authenticatedPage).toHaveURL(/#\/todos$/);
  await expect(authenticatedPage.getByTestId('todo-list')).toBeVisible();
});

test('bez inicjalizacji sessionStorage przekierowuje na logowanie', async ({ page }) => {
  await page.goto(todosUrl);

  await expect(page).toHaveURL(/#\/login$/);
  await expect(page.getByTestId('login-form')).toBeVisible();
});
