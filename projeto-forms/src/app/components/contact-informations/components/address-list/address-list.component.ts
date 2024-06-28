import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddressTypeEnum } from '../../../../enums/address-type.enum';
import { IAddressToDisplay } from '../../../../interfaces/address-to-display.interface';
import { IAddress } from '../../../../interfaces/user/address.interface';
import { AddressList } from '../../../../types/address-list';
import { addressTypeDescriptionMap } from '../../../../utils/address-type-description-map';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
})
export class AddressListComponent implements OnChanges {
  addressListToDisplay: IAddressToDisplay[] = [];
  @Input() userAddressList: AddressList | undefined = [];

  ngOnChanges(changes: SimpleChanges) {
    const ADDRESS_LIST_LOADED = Array.isArray(
      changes['userAddressList'].currentValue
    );

    if (ADDRESS_LIST_LOADED) {
      this.prepareAddressListToDisplay();
    }
  }
  prepareAddressListToDisplay() {
    this.addressListToDisplay = [];

    Object.keys(addressTypeDescriptionMap)
      .map(Number)
      .forEach((addressType: number) => {
        const addressFound = this.userAddressList?.find(
          (userAddress) => userAddress.type === addressType
        );

        this.addressListToDisplay.push(
          this.returnAddressToDisplay(addressFound, addressType)
        );
      });
  }
  returnAddressToDisplay(
    address: IAddress | undefined,
    addressType: number
  ): IAddressToDisplay {
    if (!address) {
      return {
        typeDescription:
          addressTypeDescriptionMap[addressType as AddressTypeEnum],
        type: addressType,
        street: '-',
        complement: '-',
        country: '-',
        state: '-',
        city: '-',
      };
    }

    return {
      typeDescription:
        addressTypeDescriptionMap[addressType as AddressTypeEnum],
      ...address,
    };
  }
}
