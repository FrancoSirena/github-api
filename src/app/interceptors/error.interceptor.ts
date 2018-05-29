import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse, caught: Observable<any>) => {
        if (err.status === 403) {
          const date = new Date(parseFloat(err.headers.get('X-RateLimit-Reset')) * 1000);
          this.snackBar.open(`You exceeded the request limit, you'll need to wait until ${date.toLocaleTimeString()}`, 'Close', {
            duration: 10000,
            politeness: 'assertive',
            verticalPosition: 'bottom',
            panelClass: 'error-snack-bar'
          });
        }
        return throwError(err);
      })
    );
  }
}
