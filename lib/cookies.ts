import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'auth_token';

export function setAuthCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
}

export function getAuthCookie(): string | null {
  const cookieStore = cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value || null;
}

export function deleteAuthCookie() {
  const cookieStore = cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
