import { Injectable } from '@angular/core';
import { IRepository } from '@interfaces/repository';
import { GitHubService } from '@serv/github.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RepositoryService {
  constructor(private gitHubService: GitHubService) { }

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
        })
      );
  }
}
