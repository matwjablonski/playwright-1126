import { resolve } from 'node:path';

export const appOrigin = new URL(process.env.TEST_BASE_URL || 'http://localhost:5173').origin;
export const authFile = resolve(import.meta.dirname, '../../playwright/.auth/user.json');
export const sessionKey = 'todolab.authenticated';
