import { CountriesServices } from './../../services/countries.service';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IUser } from '../../interfaces/user/user-interface';
import { UserFormController } from './user-form-controller';
import { take } from 'rxjs';
import { CountriesList } from '../../types/countries-list';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrls: ['./user-informations-container.component.scss'],
})
export class UserInformationsContainerComponent
  extends UserFormController
  implements OnInit, OnChanges
{
  currentTabIndex: number = 0;

  countriesList: CountriesList = [];

  private readonly _countriesService = inject(CountriesServices);

  @Input() userSelected: IUser = {} as IUser;
  @Input() isInEditMode: boolean = false;

  ngOnInit() {
    this.getCountriesList();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.currentTabIndex = 0;

    const HAS_USER_SELECTED =
      changes['userSelected'] &&
      Object.keys(changes['userSelected'].currentValue).length > 0;

    if (HAS_USER_SELECTED) {
      this.fullFillUserForm(this.userSelected);
    }
  }

 private getCountriesList() {
    this._countriesService.getCountries().pipe(take(1)).subscribe((countriesList: CountriesList) => {
      this.countriesList = countriesList;
    });
  }
}
