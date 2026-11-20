import { appOrigin, authFile } from './fixtures/auth-files';
import { expect, test } from './fixtures/authenticated-test';

const todosUrl = `${appOrigin}/#/todos`;

// Każdy test zaczyna z pustym stanem, niezależnie od konfiguracji innych projektów.
test.use({ storageState: { cookies: [], origins: [] } });

test('sam storageState nie przenosi logowania zapisanego w sessionStorage', async ({ browser }) => {
  const restoredContext = await browser.newContext({ storageState: authFile });
  try {
    const restoredPage = await restoredContext.newPage();
    await restoredPage.goto(todosUrl);

    await expect(restoredPage).toHaveURL(/#\/login$/);
    await expect(restoredPage.getByTestId('login-form')).toBeVisible();
    expect(await restoredPage.evaluate(() => sessionStorage.getItem('todolab.authenticated'))).toBeNull();
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
