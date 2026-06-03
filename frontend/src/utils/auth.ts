const AUTH_TOKEN_KEY = 'inoxferro-token';

const REMEMBER_EMAIL_KEY = 'inoxferro-remember-email';
const REMEMBER_ME_KEY = 'inoxferro-remember-me';
const USER_EMAIL_KEY = 'inoxferro-user-email';

function getTokenFromStorage() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY) || window.sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function saveAuthToken(token: string, rememberMe: boolean) {
  if (typeof window === 'undefined') return;
  if (rememberMe) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
  } else {
    window.sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export function getAuthToken() {
  return getTokenFromStorage();
}

export function logoutUser() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(USER_EMAIL_KEY);
  window.localStorage.removeItem(REMEMBER_EMAIL_KEY);
  window.localStorage.removeItem(REMEMBER_ME_KEY);
}

export function isUserLoggedIn() {
  if (typeof window === 'undefined') return false;
  return Boolean(getTokenFromStorage());
}

export function getLoggedUserEmail() {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(USER_EMAIL_KEY) || '';
}

export function getRememberedEmail() {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(REMEMBER_EMAIL_KEY) || '';
}

export function saveRememberedEmail(email: string, rememberMe: boolean) {
  if (typeof window === 'undefined') return;
  if (rememberMe) {
    window.localStorage.setItem(REMEMBER_EMAIL_KEY, email);
    window.localStorage.setItem(REMEMBER_ME_KEY, 'true');
  } else {
    window.localStorage.removeItem(REMEMBER_EMAIL_KEY);
    window.localStorage.setItem(REMEMBER_ME_KEY, 'false');
  }
}
