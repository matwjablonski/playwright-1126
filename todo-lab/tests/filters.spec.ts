import { expect, test } from './fixtures/authenticated-test';
import { filterTodos } from './fixtures/todos.factory';
import { TodosPage } from './pages/TodosPage.page';

// Każdy test przechwytuje pobranie danych przed pierwszą nawigacją.
test.beforeEach(async ({ authenticatedPage: page }) => {
  await page.route('**/data.json', route => route.fulfill({ json: filterTodos() }));
  await new TodosPage(page).goto();
});

for (const { status, title } of [
  { status: 'active', title: 'Aktywny niski' },
  { status: 'completed', title: 'Ukończony wysoki' },
  { status: 'overdue', title: 'Przeterminowany wysoki' },
]) {
  test(`filtr statusu ${status} pokazuje właściwe zadanie`, async ({ authenticatedPage: page }) => {
    await page.getByTestId('status-filter').selectOption(status);
    const cards = page.getByTestId('todo-list').getByRole('listitem');
    await expect(cards).toHaveCount(1);
    await expect(cards).toContainText([title]);
  });
}

test('filtr wysokiego priorytetu pokazuje dwa zadania', async ({ authenticatedPage: page }) => {
  await page.getByTestId('priority-filter').selectOption('3');
  const cards = page.getByTestId('todo-list').getByRole('listitem');
  await expect(cards).toHaveCount(2);
  await expect(cards).toContainText(['Ukończony wysoki', 'Przeterminowany wysoki']);
});

test('wyszukuje po opisie i pokazuje brak wyników', async ({ authenticatedPage: page }) => {
  const search = page.getByTestId('search-input');
  await search.fill('Plan dnia');
  await expect(page.getByTestId('todo-list').getByRole('listitem')).toHaveCount(1);
  await expect(page.getByTestId('todo-list')).toContainText('Aktywny niski');
  await search.fill('nieistniejące zadanie');
  await expect(page.getByTestId('empty-state')).toHaveText('Brak zadań dla wybranych filtrów.');
});

test('liczniki opisują stan wszystkich zadań', async ({ authenticatedPage: page }) => {
  const stats = page.getByTestId('todo-stats');
  await expect(stats).toContainText('3Wszystkie');
  await expect(stats).toContainText('2Aktywne');
  await expect(stats).toContainText('1Ukończone');
  await expect(stats).toContainText('1Przeterminowane');
});
