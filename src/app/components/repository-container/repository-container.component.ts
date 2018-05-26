import { Component, OnInit } from '@angular/core';
import { GitHubService } from 'app/services/github.service';
import { Observable } from 'rxjs';
import { IRepository } from '@interfaces/repository';


@Component({
  selector: 'app-repository-container',
  templateUrl: './repository-container.component.html',
  styleUrls: ['./repository-container.component.scss']
})
export class RepositoryContainerComponent implements OnInit {

  repositories: Array<any>;
  constructor(private gitHubService: GitHubService) {
    this.repositories = new Array<any>();
  }

  ngOnInit() {
    this.getRepo();
  }

  getRepo() {
    this.gitHubService.getRepositories()
      .subscribe((response: Array<IRepository>) => this.repositories = response.slice(0, 5));
  }

}
