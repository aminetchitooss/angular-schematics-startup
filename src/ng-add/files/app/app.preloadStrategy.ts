import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { preloadOption, PreloadService } from './shared/services/preload.service';

function isGoodNetwork(): boolean {
  const browsernavigator: any = navigator;
  const conn: any = browsernavigator.connection;
  if (conn) {
    if (conn.saveData) return false;
    const connectionsToAvoid = ['slow-2g', '2g', 'slow-3g', '3g'];
    const effectiveType = conn.effectiveType || '';
    if (connectionsToAvoid.some((c) => c == effectiveType)) return false;
  }
  return true;
}

@Injectable({
  providedIn: 'root',
  deps: [PreloadService]
})
export class PredictivePreloadingStrategy implements PreloadingStrategy {
  preloadOnDemand$: Observable<preloadOption>;
  constructor(private preloadService: PreloadService) {
    this.preloadOnDemand$ = this.preloadService.state$;
  }
  preload(route: Route, load: Function): Observable<any> {
    if (!route?.data || route?.data?.['preload']) return isGoodNetwork() ? load() : EMPTY;

    return this.preloadOnDemand$.pipe(
      mergeMap((preloadOptions) => {
        const shouldPreload = this.preloadCheck(route, preloadOptions);
        return shouldPreload ? load() : EMPTY;
      })
    );
  }
  preloadCheck(route: Route, preloadOptions: preloadOption): boolean {
    return preloadOptions.preload && [route.path].some((p) => p == preloadOptions.routerPath);
  }
}
