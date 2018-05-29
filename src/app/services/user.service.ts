import { GitHubService } from '@serv/github.service';
import { Injectable } from '@angular/core';
import { concatMap, map, catchError } from 'rxjs/operators';
import { Observable, forkJoin, throwError, Subject, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class UserService {
  time$: Observable<Date>;
  private _time: Subject<Date>;
  constructor(private gitHubService: GitHubService,
    private sanitizer: DomSanitizer) {
    this._time = new Subject<Date>();
    this.time$ = this._time.asObservable();
  }
  getUsers() {
    return this.gitHubService.getUsers()
      .pipe(
        concatMap(response => {
          let requests: Observable<any>[];
          requests = response.items.slice(0, 5).map(item => this.gitHubService.getUser(item.login));
          return forkJoin(requests).pipe(
            map(users => {
              this._time.next(null);
              return users.map(user => Object.assign(user, { avatar_url: this.sanitizer.bypassSecurityTrustUrl(user.avatar_url) }));
            }),
            catchError((err, caught) => {
              const date = new Date(parseFloat(err.headers.get('X-RateLimit-Reset')) * 1000);
              this._time.next(date);
              return response ? of(response.items.slice(0, 5)) : throwError(err);
            }));
        }),
        catchError((err, caught) => {
          const date = new Date(parseFloat(err.headers.get('X-RateLimit-Reset')) * 1000);
          this._time.next(date);
          return throwError(err);
        })
      );
  }
}
