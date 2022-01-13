import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { App_Config, APP_CONFIG } from 'src/app/app.config';

@Injectable()
export class InterceptService implements HttpInterceptor {
  constructor(@Inject(APP_CONFIG) private config: App_Config) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.getToken(req);
    if (!token) return next.handle(req);

    localStorage['accessToken'] = token.split('Bearer ')[1];

    const isToBeCached = this.config.linksToCache.some((link) => req.url.toLowerCase().indexOf(link.toLowerCase()) > -1);
    if (isToBeCached)
      return next.handle(
        req.clone({
          setHeaders: {
            Authorization: token.split('Bearer ')[1],
            'Cache-Control': 'public, immutable'
          }
        })
      );

    return next.handle(
      req.clone({
        setHeaders: {
          Authorization: token.split('Bearer ')[1],
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      })
    );
  }

  getToken(req: HttpRequest<any>): null | string {
    return req.headers.get('Authorization');
  }
}
