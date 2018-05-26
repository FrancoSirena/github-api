import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, concatMap } from 'rxjs/operators';
import { IRepository } from '../interfaces/repository';
import { Observable, forkJoin } from 'rxjs';
import { IUser } from '@interfaces/user';

interface IGitHubRepoResponse {
  items: Array<any>;
  total_count: number;
}

interface IGitHubUserResponse {
  total_count: number;
  items: Array<IUser>;
}

@Injectable()
export class GitHubService {
  constructor(private http: HttpClient) { }

  getUsers() {
    let date = new Date();
    date = new Date(date.setMonth(-12));
    let httpParams = new HttpParams();
    httpParams = httpParams.append('q', `created:>=${this.fGetDate(date)}`);
    httpParams = httpParams.append('sort', `followers`);
    return this.http.get<IGitHubUserResponse>(`/search/users`, { params: httpParams })
      .pipe(
        concatMap(response => {
          let requests: Observable<any>[];
          requests = response.items.slice(0, 5).map(item => this.http.get<Array<any>>(`/users/${item.login}`)
            .pipe(
              map(followers => ({ user: item, followersCount: followers }))
            ));
          return forkJoin(requests);
        }),
    );
  }

  getRepositories(): Observable<Array<IRepository>> {
    let date = new Date();
    date = new Date(date.setMonth(-1));
    let httpParams = new HttpParams();
    httpParams = httpParams.append('q', `created:>=${this.fGetDate(date)}`);
    httpParams = httpParams.append('sort', `stars`);
    return this.http.get<IGitHubRepoResponse>(`/search/repositories`, { params: httpParams })
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
        })
      );
  }

  private fGetDate(date: Date) {
    const lPad = (value: string, padding: string, size: number) => {
      return `${padding.repeat(size)}${value}`.slice(-size);
    };
    const month = lPad(String(date.getMonth() + 1), '0', 2);
    const day = lPad(date.getDate().toString(), '0', 2);
    const hours = lPad(date.getHours().toString(), '0', 2);
    const min = lPad(date.getMinutes().toString(), '0', 2);
    const sec = lPad(date.getSeconds().toString(), '0', 2);
    return `${date.getFullYear()}-${month}-${day}T${hours}:${min}:${sec}Z`;
  }

}
