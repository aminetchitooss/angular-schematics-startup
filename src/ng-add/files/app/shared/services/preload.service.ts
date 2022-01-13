import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {
  private stateSubject = new Subject<preloadOption>();
  readonly state$ = this.stateSubject.asObservable();

  startpreload(path: string) {
    this.stateSubject.next(new preloadOption(path, true));
  }
}

export class preloadOption {
  constructor(public routerPath: string, public preload = true) {}
}
