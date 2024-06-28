import { Component, OnInit } from '@angular/core';
import { CountriesServices } from './services/countries.service';
import { StatesService } from './services/states.service';
import { CitiesService } from './services/cities.service';
import { UsersService } from './services/users.service';
import { UsersListResponse } from './types/users-list-response';
import { take } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IUser } from './interfaces/user/user-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userSelectedIndex: number | undefined;
  userSelected: IUser = {} as IUser;
  usersList: UsersListResponse = [];
  isInEditMode: boolean = false;

  constructor(
    private readonly _contriesService: CountriesServices,
    private readonly _statesService: StatesService,
    private readonly _citiesService: CitiesService,
    private readonly _usersService: UsersService
  ) {}

  ngOnInit() {
    // this._contriesService.getCountries().subscribe((countriesResponse) => {
    //   console.log('countriesResponse', countriesResponse);
    // });

    // this._statesService.getStates('Brazil').subscribe((statesResponse) => {
    //   console.log('statesResponse', statesResponse);
    // });

    // this._citiesService.getCities('Brazil', 'São Paulo').subscribe((citiesResponse) => {
    //   console.log('citiesResponse', citiesResponse);
    // })
    //Take serve para matar o subscribe e chamar uma única vez
    this._usersService
      .getUsers()
      .pipe(take(1))
      .subscribe((usersListResponse) => {
        this.usersList = usersListResponse;
      });
  }

  onUserSelected(userIndex: number) {
    const userFound = this.usersList[userIndex];

    if (userFound) {
      this.userSelectedIndex = userIndex;
      this.userSelected = structuredClone(userFound);
    }
  }

  onCancelButton() {
    this.isInEditMode = false;
  }
  onEditButton() {
    this.isInEditMode = true;
  }
}
