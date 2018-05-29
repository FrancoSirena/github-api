import { Input, Component } from '@angular/core';
import { IUser } from '@interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() item: IUser;
}
