import { inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/user/user-interface";
import { PhoneList } from "../../types/phone-list";
import { AddressList } from "../../types/address-list";
import { state } from "@angular/animations";
import { DependentsList } from "../../types/dependents-list";

export class UserFormController{
  userForm!: FormGroup;

  private _fb = inject(FormBuilder);

  constructor() {
    this.createUserForm();
  }

  //criados este Alias para melhorar o código
  get generalInformations(): FormGroup{
     return this.userForm.get('generalInformations') as FormGroup;
  }

  get phoneList(): FormArray{
    return this.userForm.get('contactInformations.phoneList') as FormArray;
  }
  get addressList(): FormArray{
    return this.userForm.get('contactInformations.addressList') as FormArray;
  }
  get dependentsList(): FormArray{
    return this.userForm.get('dependentsList') as FormArray;
  }

  fullFillUserForm(user:IUser) {
    this.fullFillGeneralInformations(user);

    this.fullFillPhoneList(user.phoneList);

    this.fullFillAddressList(user.addressList);

    this.fullFillDependentsList(user.dependentsList);

    console.log(this.userForm);
  }


  private fullFillDependentsList(userDependentsList: DependentsList) {
    userDependentsList.forEach((dependent) => {
      this.dependentsList.push(this._fb.group({
        name: [dependent.name, Validators.required],
        age: [dependent.age, Validators.required],
        document: [dependent.document, Validators.required],
      }));
    });
  }


  private fullFillAddressList(userAddressList: AddressList) {
    userAddressList.forEach((address) => {
      this.addressList.push(this._fb.group({
        type: [address.type, Validators.required],
        street: [address.street, Validators.required],
        complement: [address.complement, Validators.required],
        country: [address.country, Validators.required],
        state: [address.state, Validators.required],
        city: [address.city, Validators.required],
      }));
    });
  }


  private fullFillPhoneList(userPhoneList: PhoneList) {
    userPhoneList.forEach((phone) => {
      this.phoneList.push(
        this._fb.group({
          type: [phone.type, Validators.required],
          areaCode: [phone.areaCode, Validators.required],
          internationalCode: [phone.internationalCode, Validators.required],
          number: [phone.number, Validators.required],
        })
      );
    });
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
