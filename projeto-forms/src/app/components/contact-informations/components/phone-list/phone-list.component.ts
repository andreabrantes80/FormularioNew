import { IPhoneToDisplay } from '../../../../interfaces/phone-to-display.interface';
import { IPhone } from '../../../../interfaces/user/phone.interface';
import { PhoneList } from '../../../../types/phone-list';
import { phoneTypeDescriptionMap } from '../../../../utils/phone-type-description-map';
import { PhoneTypeEnum } from './../../../../enums/phone-type.enum';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss'],
})
export class PhoneListComponent implements OnChanges {
  phoneListToDisplay: IPhoneToDisplay[] = [];
  @Input() userPhoneList: PhoneList | undefined = [];

  ngOnChanges(changes: SimpleChanges) {
    const PHONE_LIST_LOADED = Array.isArray(
      changes['userPhoneList'].currentValue
    );

    if (PHONE_LIST_LOADED) {
      this.preparePhoneListToDisplay();
    }
  }

  preparePhoneListToDisplay() {
    this.phoneListToDisplay = [];

    Object.keys(phoneTypeDescriptionMap)
      .map(Number)
      .forEach((phoneType) => {
        const phoneFound = this.userPhoneList?.find(
          (userPhone: IPhone) => userPhone.type === phoneType
        );

        this.phoneListToDisplay.push({
          type: phoneTypeDescriptionMap[phoneType as PhoneTypeEnum],
          phoneNumber: phoneFound ? this.formatPhoneNumber(phoneFound) : '-',
        });
      });
  }

  //Função que formata o num de tel
  formatPhoneNumber(phoneFound: IPhone) {
    return `${phoneFound.internationalCode} ${phoneFound.areaCode} ${phoneFound.number}`;
  }
}
