import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrls: ['./general-informations-edit.component.scss']
})
export class GeneralInformationsEditComponent {
  @Input() userForm!: FormGroup;

  get emailControl(): FormControl{
    return this.userForm.get('generalInformations.email') as FormControl;
  }
}
