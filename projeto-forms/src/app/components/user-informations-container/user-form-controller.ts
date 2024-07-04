import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/user/user-interface";

export class UserFormController{
  userForm!: FormGroup;

  private _fb = inject(FormBuilder);

  constructor() {
    this.createUserForm();
  }

  //criado este Alias para melhorar o código
  get generalInformations(): FormGroup{
     return this.userForm.get('generalInformations') as FormGroup;
  }

  fullFillUserForm(user:IUser) {
    this.fullFillGeneralInformations(user);
  }

  private fullFillGeneralInformations(user: IUser) {
    this.generalInformations.patchValue(user);

    console.log(this.userForm);
  }

  private createUserForm() {
    this.userForm = this._fb.group({
      generalInformations: this._fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        country: ['', Validators.required],
        state: ['', Validators.required],
        maritalStatus: [null, Validators.required],
        monthlyIncome: [null, Validators.required],
        birthDate: [null, Validators.required],
      }),
      contactInformations: this._fb.group({
        phoneList: this._fb.array([]),
        addressList: this._fb.array([]),
      }),
      dependentsList: this._fb.array([]),
    });
  }
}
