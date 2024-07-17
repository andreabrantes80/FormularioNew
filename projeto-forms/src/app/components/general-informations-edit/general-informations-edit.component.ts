import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesList } from '../../types/countries-list';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { StatesList } from '../../types/states-list';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrls: ['./general-informations-edit.component.scss'],
})
export class GeneralInformationsEditComponent implements OnInit, OnChanges {
  countriesListFiltered: CountriesList = [];
  statesListFiltered: StatesList = [];

  @Input() userForm!: FormGroup;
  @Input() countriesList: CountriesList = [];
  @Input() statesList: StatesList = [];

  @Output('onCountrySelected') onCountrySelectedEmitt = new EventEmitter<string>();

  ngOnInit() {
    this.watchCountryFormChangesAndFilter();

    this.watchStatesFormChangesAndFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.countriesListFiltered = this.countriesList;
    this.statesListFiltered = this.statesList;
  }

  get emailControl(): FormControl {
    return this.userForm.get('generalInformations.email') as FormControl;
  }
  get countryControl(): FormControl {
    return this.userForm.get('generalInformations.country') as FormControl;
  }
  get stateControl(): FormControl {
    return this.userForm.get('generalInformations.state') as FormControl;
  }

  onCountrySelected(event: MatAutocompleteSelectedEvent) {
    this.onCountrySelectedEmitt.emit(event.option.value);
  }

  //método bind recebe a classe como parametro e faz a referencia com a classe
  private watchCountryFormChangesAndFilter() {
    // this.countryControl.valueChanges.subscribe((value: string) => this.filterCountriesList(value));
    this.countryControl.valueChanges.subscribe(
      this.filterCountriesList.bind(this)
    );
  }

  private watchStatesFormChangesAndFilter() {
    this.stateControl.valueChanges.subscribe(this.filterStatesList.bind(this));
  }

  private filterStatesList(searchTerm: string) {
      this.statesListFiltered = this.statesList.filter((state) =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
  }

  //Resultado do filtro vou guardar em uma nova lista filtrada
  private filterCountriesList(searchTerm: string) {
    this.countriesListFiltered = this.countriesList.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }
}
