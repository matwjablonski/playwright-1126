import { expect, type Locator, type Page } from '@playwright/test';

export class TodosPage {
  private readonly form: Locator;
  private readonly list: Locator;

  constructor(private readonly page: Page) {
    this.form = page.getByTestId('todo-form');
    this.list = page.getByTestId('todo-list');
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/todos');
    await expect(this.page.getByTestId('todo-stats')).toBeVisible();
  }

  async addTodo(task: string, priority: '1' | '2' | '3'): Promise<void> {
    await this.form.getByRole('textbox', { name: 'Tytuł' }).fill(task);
    await this.form.getByRole('combobox', { name: 'Priorytet' }).selectOption(priority);
    await this.form.getByRole('button', { name: 'Dodaj zadanie' }).click();
    await expect(this.todoByName(task)).toHaveCount(1);
  }

  async getTodoCount(): Promise<number> {
    return this.list.getByRole('listitem').count();
  }

  async removeTodoByName(task: string): Promise<void> {
    const todo = this.todoByName(task);
    await expect(todo).toHaveCount(1);
    await todo.getByRole('button', { name: 'Usuń' }).click();
    await expect(todo).toHaveCount(0);
  }

  todoByName(task: string) {
    return this.list.getByRole('listitem').filter({
      has: this.page.getByRole('heading', { name: task, exact: true }),
    });
  }
}
