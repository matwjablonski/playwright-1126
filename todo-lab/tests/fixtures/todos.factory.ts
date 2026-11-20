import type { Todo } from '../../src/types';

export function dateOffset(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function filterTodos(): Todo[] {
  return [
    {
      id: 101, task: 'Aktywny niski', description: 'Plan dnia', done: false,
      priority: 1, due_date: dateOffset(5), created_at: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 102, task: 'Ukończony wysoki', description: 'Raport gotowy', done: true,
      priority: 3, due_date: dateOffset(5), created_at: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 103, task: 'Przeterminowany wysoki', description: 'Raport zaległy', done: false,
      priority: 3, due_date: dateOffset(-5), created_at: '2026-01-01T00:00:00.000Z',
    },
  ];
}
