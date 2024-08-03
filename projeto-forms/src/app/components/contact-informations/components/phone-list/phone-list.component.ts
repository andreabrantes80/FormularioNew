import { IPhoneToDisplay } from '../../../../interfaces/phone-to-display.interface';
import { IPhone } from '../../../../interfaces/user/phone.interface';
import { PhoneList } from '../../../../types/phone-list';
import { preparePhoneList } from '../../../../utils/prepare-phone-list';
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

    const originalUserPhoneList = this.userPhoneList && this.userPhoneList.length > 0 ? this.userPhoneList : [];

    preparePhoneList(originalUserPhoneList, (phone) => {
      this.phoneListToDisplay.push(phone);
    });

  }

  //Função que formata o num de tel
  formatPhoneNumber(phone: IPhone) {
    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`;
  }
}
