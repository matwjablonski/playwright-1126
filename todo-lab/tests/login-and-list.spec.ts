import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.page';

test('po zalogowaniu pokazuje listę zadań', async ({ page }) => {
  await new LoginPage(page).goto();
  await new LoginPage(page).login('admin123');

  await expect(page).toHaveURL(/#\/todos$/);
  await expect(page.getByRole('heading', { name: 'Lista wszystkich zadań' })).toBeVisible();
  const list = page.getByTestId('todo-list');
  await expect(list).toBeVisible();
  await expect(list.getByRole('listitem').nth(2)).toBeVisible();
});
