import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/user/user-interface';


@Component({
  selector: 'app-contact-informations',
  templateUrl: './contact-informations.component.html',
  styleUrls: ['./contact-informations.component.scss']
})
export class ContactInformationsComponent {
  @Input() user: IUser | undefined = {} as IUser;
}
