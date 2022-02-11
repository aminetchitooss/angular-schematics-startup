import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SETTINGS_ALLOWED_USER } from '@globalUtils/constants';
import { hasAccess } from '@globalUtils/functions';
import { Store } from '@ngrx/store';
import { User_Model } from '@store/user/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsGuard implements CanActivate {
  constructor(private store: Store<{ user: User_Model }>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('user').pipe(map((res) => hasAccess(res, SETTINGS_ALLOWED_USER)));
  }
}
