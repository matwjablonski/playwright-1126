import { expect, test } from './fixtures/authenticated-test';
import { TodosPage } from './pages/TodosPage.page';
import type { Todo } from '../src/types';

const visualTodos: Todo[] = [
  { id: 1, task: 'Przygotować scenariusz', description: 'Opis zadania do testów.', done: false, priority: 3, created_at: '2026-01-01T00:00:00.000Z' },
  { id: 2, task: 'Zaktualizować dokumentację', description: 'Uzupełnić instrukcję.', done: true, priority: 1, created_at: '2026-01-01T00:00:00.000Z' },
];

test.use({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
test.beforeEach(() => {
  // Obrazy referencyjne pochodzą z Chromium na macOS.
  test.skip(test.info().project.name !== 'chromium' || process.platform !== 'darwin', 'Snapshoty dla Chromium na macOS');
});

test('strona logowania', async ({ page }) => {
  await page.goto('/#/login');
  await expect(page.getByTestId('login-form')).toBeVisible();
  await expect(page).toHaveScreenshot('login.png', { animations: 'disabled', fullPage: true, maxDiffPixelRatio: 0.01 });
});

test('lista zadań', async ({ authenticatedPage: page }) => {
  await page.route('**/data.json', route => route.fulfill({ json: visualTodos }));
  await new TodosPage(page).goto();
  await expect(page.getByTestId('todo-list').getByRole('listitem')).toHaveCount(2);
  await expect(page).toHaveScreenshot('todos.png', { animations: 'disabled', fullPage: true, maxDiffPixelRatio: 0.01 });
});

test('formularz edycji zadania', async ({ authenticatedPage: page }) => {
  await page.route('**/data.json', route => route.fulfill({ json: visualTodos }));
  const todos = new TodosPage(page);
  await todos.goto();
  await todos.todoByName('Przygotować scenariusz').getByRole('button', { name: 'Edytuj' }).click();
  await expect(page.getByRole('heading', { name: 'Edycja zadania' })).toBeVisible();
  await expect(page).toHaveScreenshot('edit.png', { animations: 'disabled', fullPage: true, maxDiffPixelRatio: 0.01 });
});
