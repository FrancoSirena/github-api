import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRepository } from '@interfaces/repository';
import { RepositoryService } from '@serv/respository.service';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';


@Component({
  selector: 'app-repository-container',
  templateUrl: './repository-container.component.html',
  styleUrls: ['./repository-container.component.scss']
})
export class RepositoryContainerComponent implements OnInit, OnDestroy {
  repositories: Array<any>;
  lastTry: string;
  private interval: number;
  constructor(private repositoryService: RepositoryService) {
    this.repositories = new Array<any>();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  ngOnInit() {
    this.getRepo();
    this.interval = window.setInterval(() => this.getRepo(), 120000);
  }

  getRepo() {
    this.repositories = [];
    this.lastTry = (new Date()).toLocaleTimeString();
    this.repositoryService.getRepositories()
      .subscribe((response: Array<IRepository>) => this.repositories = response.slice(0, 5));
  }

}
