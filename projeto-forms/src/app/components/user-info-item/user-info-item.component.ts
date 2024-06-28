import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-info-item',
  templateUrl: './user-info-item.component.html',
  styleUrls: ['./user-info-item.component.scss']
})
export class UserInfoItemComponent {

  @Input() title: string | undefined | null= '';
  @Input() text: string | undefined | null= '';

}
