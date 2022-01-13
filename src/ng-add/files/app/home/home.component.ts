import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { clearRedirectAfterLogin } from '../shared/global-utils/functions';
import { DataService } from '../shared/services/data.service';
import { User_Model } from '../shared/store/user/user.model';

@Component({
  selector: 'home',
  template: `
    <ng-container *ngIf="currentUser$ | async as currentUser">
      <mat-spinner *ngIf="isLoading"></mat-spinner>
      <error-user *ngIf="isError" [error]="currentUser"></error-user>
      <navigation [ngClass]="{ 'has-navbar': _dataService.isHandset$ | async }" *ngIf="!isLoading && !isError" [user]="currentUser">
        <main class="overlay">
          <router-outlet class="route"></router-outlet>
        </main>
      </navigation>
    </ng-container>
  `
})
export class HomeComponent implements AfterViewInit {
  isLoading = true;
  isError = false;
  currentUser$: Observable<User_Model>;

  constructor(private store: Store<{ user: User_Model }>, public _dataService: DataService, private changeRef: ChangeDetectorRef) {
    clearRedirectAfterLogin();

    this.currentUser$ = store.select('user').pipe(
      tap((res: User_Model) => {
        // console.log(res);
        if (res.error) this.isError = true;
        this.isLoading = false;
      })
    );
  }

  ngAfterViewInit(): void {
    this.changeRef.detectChanges();
  }
}
