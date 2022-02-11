import { User_Model } from '@store/user/user.model';
import { USER_ROLE } from './enums';

export function validateEmail(email: string): boolean {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export function rememberLoggedIn(): void {
  localStorage['save'] = 'true';
}
export function isLoggedIn(): boolean {
  return localStorage['save'] == 'true';
}
export function clearRedirectAfterLogin(): void {
  localStorage.removeItem('URL_HISTORY');
}
export function setInitials(user: User_Model) {
  return [user.FIRSTNAME?.charAt(0)?.toUpperCase(), user.LASTNAME?.charAt(0)?.toUpperCase()].join(' ');
}

export function getFullName(user: User_Model) {
  return [user.FIRSTNAME, user.LASTNAME].join(' ');
}

export function hasAccess(user: User_Model, roles: USER_ROLE[]) {
  return true; //roles.some((role) => user.ROLES?.some((r) => r.id == role));
}
