import { inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/user/user-interface';
import { PhoneList } from '../../types/phone-list';
import { AddressList } from '../../types/address-list';
import { state } from '@angular/animations';
import { DependentsList } from '../../types/dependents-list';
import { convertPtBrDateToDateObj } from '../../utils/convert-pt-br-date-to-date-obj';
import { preparePhoneList } from '../../utils/prepare-phone-list';
import { PhoneTypeEnum } from '../../enums/phone-type.enum';
import { prepareAddressList } from '../../utils/prepare-address-list';

export class UserFormController {
  userForm!: FormGroup;

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  private _fb = inject(FormBuilder);

  constructor() {
    this.createUserForm();
  }

  //criados este Alias para melhorar o código
  get generalInformations(): FormGroup {
    return this.userForm.get('generalInformations') as FormGroup;
  }

  get phoneList(): FormArray {
    return this.userForm.get('contactInformations.phoneList') as FormArray;
  }
  get addressList(): FormArray {
    return this.userForm.get('contactInformations.addressList') as FormArray;
  }
  get dependentsList(): FormArray {
    return this.userForm.get('dependentsList') as FormArray;
  }

  fullFillUserForm(user: IUser) {
    this.resetUserForm();

    this.fullFillGeneralInformations(user);

    this.fullFillPhoneList(user.phoneList);

    this.fullFillAddressList(user.addressList);

    this.fullFillDependentsList(user.dependentsList);

    console.log(this.userForm);
  }
  private resetUserForm() {
    this.userForm.reset();

    this.generalInformations.reset();
    this.phoneList.reset();
    this.phoneList.clear();

    this.addressList.reset();
    this.addressList.clear();

    this.dependentsList.reset();
    this.dependentsList.clear();
  }

  private fullFillDependentsList(userDependentsList: DependentsList) {
    userDependentsList.forEach((dependent) => {
      this.dependentsList.push(
        this._fb.group({
          name: [dependent.name, Validators.required],
          age: [dependent.age, Validators.required],
          document: [dependent.document, Validators.required],
        })
      );
    });
  }

  private fullFillAddressList(userAddressList: AddressList) {
    prepareAddressList(userAddressList, false, (address) => {
      this.addressList.push(
        this._fb.group({
          type: [address.type],
          typeDescription: [{ value: address.typeDescription, disabled: true }],
          street: [address.street],
          complement: [address.complement],
          country: [address.country],
          state: [address.state],
          city: [address.city],
        })
      );
    });

    console.log(' this.addressList', this.addressList);


  }

  private fullFillPhoneList(userPhoneList: PhoneList) {
    preparePhoneList(userPhoneList, false, (phone) => {
      const phoneValidators =
        phone.type === PhoneTypeEnum.EMERGENCY ? [] : [Validators.required];
      this.phoneList.push(
        this._fb.group({
          type: [phone.type],
          typeDescription: [phone.typeDescription],
          number: [phone.phoneNumber, phoneValidators],
        })
      );
    });
    console.log('this.phoneList', this.phoneList);

    // userPhoneList.forEach((phone) => {
    //   this.phoneList.push(
    //     this._fb.group({
    //       type: [phone.type, Validators.required],
    //       areaCode: [phone.areaCode, Validators.required],
    //       internationalCode: [phone.internationalCode, Validators.required],
    //       number: [phone.number, Validators.required],
    //     })
    //   );
    // });
  }

  private fullFillGeneralInformations(user: IUser) {
    const newUser = {
      ...user,
      birthDate: convertPtBrDateToDateObj(user.birthDate),
    };
    this.generalInformations.patchValue(newUser);
  }

  private createUserForm() {
    this.userForm = this._fb.group({
      generalInformations: this._fb.group({
        name: ['', Validators.required],
        email: [
          '',
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
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
