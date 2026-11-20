import { expect, test } from './fixtures/authenticated-test';
import { TodosPage } from './pages/TodosPage.page';

test('dodaje zadanie i pozwala je usunąć po nazwie', async ({ authenticatedPage }) => {
  const todosPage = new TodosPage(authenticatedPage);
  await todosPage.goto();

  const initialCount = await todosPage.getTodoCount();
  const task = 'Zadanie dodane przez Page Object';

  await todosPage.addTodo(task, '3');
  expect(await todosPage.getTodoCount()).toBe(initialCount + 1);

  await todosPage.removeTodoByName(task);
  expect(await todosPage.getTodoCount()).toBe(initialCount);
});
