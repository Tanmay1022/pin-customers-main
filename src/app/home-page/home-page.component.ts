import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { CreatePinComponent } from '../pin/create-pin/create-pin.component';
import { PinListComponent } from '../pin/pin-list/pin-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PinListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  constructor(
    private modal: NgbModal,
  ) {
  }
  openModal(type: 'customer'|'pin') {
    switch (type) {
      case 'customer':
        this.modal.open(CreateCustomerComponent, {
          centered: true,
          size: 'md'
        })
        break;
      case "pin":
        this.modal.open(CreatePinComponent, {
          centered: true,
          size: 'md',
        })
        break;
    }
  }
}
