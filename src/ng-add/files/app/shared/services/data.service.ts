import { Injectable } from '@angular/core';
import { MIN_LARGE_SCREEN, MIN_MID_SCREEN } from '@globalUtils/constants';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private isMobile = new BehaviorSubject<boolean>(document.body.clientWidth < MIN_MID_SCREEN);
  readonly isMobile$ = this.isMobile.asObservable().pipe(shareReplay());

  private navBar = new BehaviorSubject<boolean>(document.body.clientWidth < MIN_LARGE_SCREEN);
  readonly isHandset$ = this.navBar.asObservable().pipe(shareReplay());

  updateLayout(isMobile: boolean) {
    this.isMobile.next(isMobile);
  }

  updateNavbarLayout(isMobile: boolean) {
    this.navBar.next(isMobile);
  }

  constructor() {}
}
