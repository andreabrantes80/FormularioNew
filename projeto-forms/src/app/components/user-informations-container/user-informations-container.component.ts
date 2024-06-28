import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user-interface';


@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrls: ['./user-informations-container.component.scss']
})
export class UserInformationsContainerComponent implements OnChanges{
  currentTabIndex: number = 0;

  @Input() userSelected: IUser = {} as IUser;
  @Input() isInEditMode: boolean = false;

  ngOnChanges(_: SimpleChanges) {
    this.currentTabIndex = 0;
  }
}
