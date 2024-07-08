import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesList } from '../../types/countries-list';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrls: ['./general-informations-edit.component.scss']
})
export class GeneralInformationsEditComponent implements OnChanges {
  @Input() userForm!: FormGroup;
  @Input() countriesList: CountriesList = [];

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
  }

  get emailControl(): FormControl{
    return this.userForm.get('generalInformations.email') as FormControl;
  }
}
