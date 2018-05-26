import { Component, OnInit } from '@angular/core';
import { GitHubService } from 'app/services/github.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {

  repositories: Array<any>;
  constructor(private gitHubService: GitHubService) {
    this.repositories = new Array<any>();
  }

  ngOnInit() {
    this.getRepo();
  }

  getRepo() {
    this.gitHubService.getUsers()
      .subscribe((response) => console.log(response));
  }

}
