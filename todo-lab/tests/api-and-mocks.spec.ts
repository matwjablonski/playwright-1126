import { expect, test } from './fixtures/authenticated-test';
import { filterTodos } from './fixtures/todos.factory';
import { TodosPage } from './pages/TodosPage.page';
import type { Todo } from '../src/types';

test('API zwraca dane początkowe z poprawną strukturą', async ({ request }) => {
  const response = await request.get('/data.json');
  expect(response.status()).toBe(200);
  const todos = await response.json() as Todo[];
  expect(todos.length).toBeGreaterThan(0);
  expect(todos[0]).toEqual(expect.objectContaining({
    id: expect.any(Number),
    task: expect.any(String),
    description: expect.any(String),
    done: expect.any(Boolean),
    priority: expect.any(Number),
  }));
  expect([1, 2, 3]).toContain(todos[0].priority);
});

test('pusta odpowiedź pokazuje stan pusty', async ({ authenticatedPage: page }) => {
  await page.route('**/data.json', route => route.fulfill({ json: [] }));
  await new TodosPage(page).goto();
  await expect(page.getByTestId('empty-state')).toHaveText('Brak zadań dla wybranych filtrów.');
});

test('błąd HTTP 500 pokazuje komunikat', async ({ authenticatedPage: page }) => {
  await page.route('**/data.json', route => route.fulfill({ status: 500, body: '' }));
  await new TodosPage(page).goto();
  await expect(page.getByRole('alert')).toHaveText('Nie udało się pobrać danych: 500');
});

test('mock jednej karty o wysokim priorytecie', async ({ authenticatedPage: page }) => {
  await page.route('**/data.json', route => route.fulfill({ json: [filterTodos()[2]] }));
  await new TodosPage(page).goto();
  const card = page.getByTestId('todo-list').getByRole('listitem');
  await expect(card).toHaveCount(1);
  await expect(card).toHaveAttribute('data-priority', '3');
  await expect(card).toContainText('Przeterminowany wysoki');
});
