import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment';

@Injectable()
export class ServerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    let url: string;
    if (req.url.startsWith('http')) {
      url = req.url;
    } else {
      url = `${environment.endpointUrl}${req.url}`;
    }
    const newReq = req.clone({ url: url });
    return next.handle(newReq);
  }
}
