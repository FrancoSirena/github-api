import { Input, Component } from '@angular/core';
import { IRepository } from 'app/interfaces/repository';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent {
  @Input() item: IRepository;
}
