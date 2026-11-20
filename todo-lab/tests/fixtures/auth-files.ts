export const appOrigin = 'http://localhost:5173';
export const authFile = decodeURIComponent(
  new URL('../../playwright/.auth/user.json', import.meta.url).pathname,
);
export const sessionKey = 'todolab.authenticated';
