import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.page';
import { TodosPage } from './pages/TodosPage.page';

test.beforeAll(() => {})

test.describe('grupa 1', () => {

  test.beforeAll(() => {})

  test.use({
    viewport: { width: 1280, height: 800 },
  });

  test('api test', async ({ page, request }) => {
    const response = await request.get('/data.json');
    expect(response.ok()).toBe(true);

    await page.goto('http://localhost:5173/');

    const loginPage = new LoginPage(page);
    await loginPage.login('admin123');
  })

  test('empty tasks list', async ({ page }) => {
    await page.route('**/data.json', async (route) => {
      const json = {
        body: [],
      };
      return await route.fulfill({ json });
    })

    await page.goto('http://localhost:5173/');

    const loginPage = new LoginPage(page);
    await loginPage.login('admin123');

    const tasksPage = new TodosPage(page);

    const numberOfTasks = await tasksPage.getTodoCount();

    expect(numberOfTasks).toBe(0);
    
  })

  test('lokalizuje nawigację i zadania różnymi strategiami', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await test.step('logowanie', async () => {
      const loginPage = new LoginPage(page);
        await loginPage.login('admin123');
        // await expect(page).toHaveScreenshot('todo-page.png', {
        // });
    })

    

    // await page.getByRole('textbox', { name: 'Hasło' }).fill('admin123');
    // await page.getByRole('button', { name: 'Zaloguj' }).click();

    const todosLink = page.getByRole('link', { name: 'Lista zadań' });
    const aboutLink = page.getByRole('link', { name: 'O aplikacji' });

    await expect(todosLink).toHaveScreenshot('todolink.png')

    await test.step('o aplikacji', async () => {
      await expect(todosLink).toBeVisible();
      await expect(aboutLink).toBeVisible();
      await aboutLink.click();
      await expect(page.getByRole('heading', { name: 'O aplikacji' })).toBeVisible();
    })
    await todosLink.click();

    const todoList = page.getByTestId('todo-list');
    await expect(todoList).toBeVisible();

    const highPriorityTodos = todoList.locator('[data-priority="3"]');
    await expect(highPriorityTodos).toHaveCount(2);

    const completedTodos = todoList.locator('[data-done="true"]');
    await expect(completedTodos).toHaveCount(1);

    const todoByDescription = todoList.locator(
      'xpath=.//li[contains(., "Opisać kroki dla dodawania zadania")]',
    );
    await expect(todoByDescription).toHaveCount(1);
    await expect(todoByDescription.getByTestId('todo-title')).toHaveText(
      'Przygotować scenariusz testowy',
    );
  });
})

test.describe('grupa 2', () => {});


