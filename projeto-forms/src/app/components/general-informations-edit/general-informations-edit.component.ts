import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesList } from '../../types/countries-list';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrls: ['./general-informations-edit.component.scss'],
})
export class GeneralInformationsEditComponent implements OnInit, OnChanges {
  countriesListFiltered: CountriesList = [];
  @Input() userForm!: FormGroup;
  @Input() countriesList: CountriesList = [];

  ngOnInit() {
    this.watchCountryFormChangesAndFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.countriesListFiltered = this.countriesList;
  }

  get emailControl(): FormControl {
    return this.userForm.get('generalInformations.email') as FormControl;
  }
  get countryControl(): FormControl {
    return this.userForm.get('generalInformations.country') as FormControl;
  }

  onCountrySelected(event: MatAutocompleteSelectedEvent) {
    console.log(event);
  }

  //método bind recebe a classe como parametro e faz a referencia com a classe
  private watchCountryFormChangesAndFilter() {
    // this.countryControl.valueChanges.subscribe((value: string) => this.filterCountriesList(value));
    this.countryControl.valueChanges.subscribe(
      this.filterCountriesList.bind(this)
    );
  }
  //Resultado do filtro vou guardar em uma nova lista filtrada
  private filterCountriesList(searchTerm: string) {
    this.countriesListFiltered = this.countriesList.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }
}
