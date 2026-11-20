import { expect, test } from './fixtures/authenticated-test';
import { dateOffset } from './fixtures/todos.factory';
import { TodosPage } from './pages/TodosPage.page';

test('dodaje zadanie z kompletem pól', async ({ authenticatedPage: page }) => {
  const todos = new TodosPage(page);
  const dueDate = dateOffset(5);
  await test.step('Otwórz listę', async () => {
    await todos.goto();
  });

  await test.step('Dodaj zadanie', async () => {
    const form = page.getByTestId('todo-form');
    await form.getByLabel('Tytuł').fill('Przygotować test formularza');
    await form.getByLabel('Opis').fill('Scenariusz E2E dla nowego zadania');
    await form.getByLabel('Priorytet').selectOption('3');
    await form.getByLabel('Data wykonania').fill(dueDate);
    await form.getByRole('button', { name: 'Dodaj zadanie' }).click();
  });

  await test.step('Sprawdź rezultat', async () => {
    await expect(page.getByRole('status')).toHaveText('Zadanie dodane.');
    const card = todos.todoByName('Przygotować test formularza');
    await expect(card).toHaveCount(1);
    await expect(card).toHaveAttribute('data-testid', /^todo-card-\d+$/);
    await expect(card).toHaveAttribute('data-done', 'false');
    await expect(card).toHaveAttribute('data-priority', '3');
    await expect(card).toContainText('Scenariusz E2E dla nowego zadania');
    await expect(card).toContainText(dueDate);
  });
});

test('waliduje wymagany tytuł, priorytet i datę', async ({ authenticatedPage: page }) => {
  await new TodosPage(page).goto();
  const form = page.getByTestId('todo-form');
  await form.getByLabel('Data wykonania').fill('2000-01-01');
  await form.getByRole('button', { name: 'Dodaj zadanie' }).click();

  await expect(form.getByText('Tytuł jest wymagany.')).toBeVisible();
  await expect(form.getByText('Priorytet jest wymagany.')).toBeVisible();
  await expect(form.getByText('Data wykonania nie może być z przeszłości.')).toBeVisible();
});

test('Page Object dodaje i usuwa zadanie po nazwie', async ({ authenticatedPage: page }) => {
  const todos = new TodosPage(page);
  await todos.goto();
  const initialCount = await todos.getTodoCount();
  await todos.addTodo('Zadanie z Page Object', '2');
  await expect(todos.todoByName('Zadanie z Page Object')).toHaveCount(1);
  await todos.removeTodoByName('Zadanie z Page Object');
  await expect(page.getByTestId('todo-list').getByRole('listitem')).toHaveCount(initialCount);
});
