import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from '@serv/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: CacheService) { }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq = req.clone();
    const cachable = req.headers.has('X-Cachable');
    if (cachable) {
      newReq = newReq.clone({ headers: newReq.headers.delete('X-Cachable') });
      const cache = this.cacheService.get(req);
      if (cache) {
        return of(cache.response);
      }
    }
    return next.handle(newReq).pipe(
      tap((response) => cachable ? this.cacheService.set(req, response) : null)
    );
  }
}
