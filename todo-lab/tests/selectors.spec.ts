import { expect, test } from './fixtures/authenticated-test';
import { TodosPage } from './pages/TodosPage.page';

test('lokalizuje nawigację i zadania różnymi strategiami', async ({ authenticatedPage: page }) => {
  await new TodosPage(page).goto();
  const todosLink = page.getByRole('link', { name: 'Lista zadań' });
  const aboutLink = page.getByRole('link', { name: 'O aplikacji' });
  await expect(todosLink).toBeVisible();
  await aboutLink.click();
  await expect(page.getByRole('heading', { name: 'O aplikacji' })).toBeVisible();
  await todosLink.click();

  const list = page.getByTestId('todo-list');
  await expect(list).toBeVisible();
  await expect(list.locator('[data-priority="3"]')).toHaveCount(2);
  await expect(list.locator('[data-done="true"]')).toHaveCount(1);
  const byDescription = list.locator('xpath=.//li[contains(., "Opisać kroki dla dodawania zadania")]');
  await expect(byDescription.getByTestId('todo-title')).toHaveText('Przygotować scenariusz testowy');
});
