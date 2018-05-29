import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '@interfaces/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRepository } from '@interfaces/repository';

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

  getUsers(): Observable<IGitHubUserResponse> {
    let date = new Date();
    date = new Date(date.setMonth(-12));
    let httpParams = new HttpParams();
    httpParams = httpParams.append('q', `created:>=${this.fGetDate(date)}+type:user`);
    httpParams = httpParams.append('sort', `followers`);
    return this.http.get<IGitHubUserResponse>(`/search/users`, { params: httpParams });
  }

  getUser(userID: string) {
    let headers = new HttpHeaders();
    headers = headers.set('X-Cachable', 'true');
    return this.http.get<Array<any>>(`/users/${userID}`, { headers: headers });
  }

  getRepositories(): Observable<IGitHubRepoResponse> {
    let date = new Date();
    date = new Date(date.setMonth(-1));
    let httpParams = new HttpParams();
    httpParams = httpParams.append('q', `created:>=${this.fGetDate(date)}`);
    httpParams = httpParams.append('sort', `stars`);
    return this.http.get<IGitHubRepoResponse>(`/search/repositories`, { params: httpParams });
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
