import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { DEFAULT_ROUTE } from '../global-utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public msal: MsalService) {}

  loginWithHint(loginHint: string) {
    localStorage.setItem('URL_HISTORY', this.getRedirectBeforeLogin());
    localStorage.setItem('LOGIN_PENDING', 'IN_PROGRESS');
    const hint: any = { loginHint };
    this.msal.loginRedirect(hint);
  }

  getRedirectBeforeLogin(): string {
    return decodeURIComponent(window.location.href.indexOf('redirectURL=') > -1 ? window.location.href.split('redirectURL=')[1] : DEFAULT_ROUTE);
  }

  getRedirectAfterLogin(): string {
    var savedlink = localStorage.getItem('URL_HISTORY');
    if (!savedlink) return decodeURIComponent(DEFAULT_ROUTE);
    return savedlink;
  }

  clearRedirectAfterLogin(): void {
    localStorage.removeItem('URL_HISTORY');
  }

  logoutPostRedirect() {
    this.clearStorage();
    this.msal.logoutRedirect();
  }

  clearStorage() {
    localStorage.clear();
  }
}
