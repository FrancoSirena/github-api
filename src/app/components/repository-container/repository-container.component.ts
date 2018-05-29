import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { IRepository } from '@interfaces/repository';
import { RepositoryService } from '@serv/respository.service';
import { map, takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-repository-container',
  templateUrl: './repository-container.component.html',
  styleUrls: ['./repository-container.component.scss']
})
export class RepositoryContainerComponent implements OnInit, OnDestroy {
  timeUntil$: Observable<string>;
  repositories: Array<any>;
  lastTry: string;
  private alive: boolean;
  private interval: number;
  constructor(private repositoryService: RepositoryService) {
    this.alive = true;
    this.repositories = new Array<any>();
    this.timeUntil$ = this.repositoryService.time$.pipe(
      map((time: Date) => time ? time.toLocaleTimeString() : null),
      takeWhile(() => this.alive)
    );
  }

  ngOnDestroy() {
    this.alive = false;
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
