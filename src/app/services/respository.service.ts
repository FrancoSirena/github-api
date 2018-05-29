import { GitHubService } from '@serv/github.service';
import { Observable, throwError, Subject } from 'rxjs';
import { IRepository } from '@interfaces/repository';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class RepositoryService {
  time$: Observable<Date>;
  private _time: Subject<Date>;

  constructor(private gitHubService: GitHubService) {
    this._time = new Subject<Date>();
    this.time$ = this._time.asObservable();
  }

  getRepositories(): Observable<IRepository[]> {
    return this.gitHubService.getRepositories()
      .pipe(
        map(response => {
          return response.items.map(item => {
            return {
              id: item.id,
              name: item.name,
              url: item.url,
              created: item.created_at,
              updated_at: item.updated_at,
              description: item.description,
              stars: item.stargazers_count
            };
          });
        }),
        catchError((err, caught) => {
          const date = new Date(parseFloat(err.headers.get('X-RateLimit-Reset')) * 1000);
          this._time.next(date);
          return throwError(err);
        })
      );
  }
}
