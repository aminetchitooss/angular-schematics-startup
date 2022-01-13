import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from '../api/user.service';
import { setUser } from '../store/user/user.actions';
import { User_Model } from '../store/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private userService: UserService, private store: Store<{ user: User_Model }>) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userInfo();
  }

  userInfo(): Promise<boolean> {
    return new Promise((resolve) => {
      this.userService.getProfil().subscribe((res) => {
        if (!res.error && !res.errorCode) {
          this.store.dispatch(setUser({ user: res }));
          resolve(true);
        } else {
          const response: any = res;
          const err: any = response.status;
          this.store.dispatch(setUser({ user: err }));
          resolve(true);
        }
      });
    });
  }
}
