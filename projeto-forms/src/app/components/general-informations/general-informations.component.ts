import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/user/user-interface';


@Component({
  selector: 'app-general-informations',
  templateUrl: './general-informations.component.html',
  styleUrls: ['./general-informations.component.scss']
})

export class GeneralInformationsComponent {
  @Input() user: IUser | undefined = {} as IUser;
}
