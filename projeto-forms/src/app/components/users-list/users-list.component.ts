import { UsersListResponse } from './../../types/users-list-response';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent{
  userSelectedIndex: number | undefined;

  @Input() usersList: UsersListResponse = [];
  @Output('onUserSelected') onUserSelectedEmitt = new EventEmitter<number>();

  onUserSelected(userIndex: number) {
    this.userSelectedIndex = userIndex;
    this.onUserSelectedEmitt.emit(userIndex);
  }


}
