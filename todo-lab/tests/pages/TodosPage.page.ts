import { expect, type Page } from '@playwright/test';

export class TodosPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('http://localhost:5173/#/todos');
    await expect(this.page.getByTestId('todo-stats')).toBeVisible();
  }

  async addTodo(task: string, priority: '1' | '2' | '3'): Promise<void> {
    const form = this.page.getByTestId('todo-form');
    await form.getByRole('textbox', { name: 'Tytuł' }).fill(task);
    await form.getByRole('combobox', { name: 'Priorytet' }).selectOption(priority);
    await form.getByRole('button', { name: 'Dodaj zadanie' }).click();
    await expect(this.todoByName(task)).toHaveCount(1);
  }

  async getTodoCount(): Promise<number> {
    return this.page.getByTestId('todo-list').getByRole('listitem').count();
  }

  async removeTodoByName(task: string): Promise<void> {
    const todo = this.todoByName(task);
    await expect(todo).toHaveCount(1);
    await todo.getByRole('button', { name: 'Usuń' }).click();
    await expect(todo).toHaveCount(0);
  }

  private todoByName(task: string) {
    return this.page.getByTestId('todo-list').getByRole('listitem').filter({
      has: this.page.getByRole('heading', { name: task, exact: true }),
    });
  }
}
