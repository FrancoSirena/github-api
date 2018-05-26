import { Input, Component } from '@angular/core';
import { IRepository } from 'app/interfaces/repository';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() item: IRepository;
}
