import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from 'app/services/loading.service';
import { tap, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private _requestCount = 0;
  constructor(private loadingService: LoadingService) { }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    this._requestCount++;
    return next.handle(req).pipe(
      finalize(() => {
        this._requestCount--;
        if (this._requestCount <= 0) this.loadingService.hide();
      })
    );
  }
}
