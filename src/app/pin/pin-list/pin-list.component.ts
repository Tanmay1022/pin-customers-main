import {Component, OnInit} from '@angular/core';
import {customer, PinData} from "../../utils/interface";
import {ApiHelperService} from "../../service/api-helper.service";
import {CommonModule} from "@angular/common";
import {PrivacyOptions} from "../../utils/enum";

@Component({
  selector: 'app-pin-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pin-list.component.html',
  styleUrl: './pin-list.component.scss'
})
export class PinListComponent implements OnInit{
  pins!: PinData[];
  loading: boolean = true;
  customers!: customer[];

  constructor(private apiHelper: ApiHelperService) {
  }

  ngOnInit() {
    this.apiHelper.getPinData().subscribe({
      next: data => {
        this.pins = [...data];
        this.loading = false;
      },
      error: error => console.log(error),
    });

    this.apiHelper.customer$.subscribe((data: customer[]) => {
      this.customers = [...data];
    })
  }

  clearData(ev:MouseEvent) {
    ev.stopPropagation();
    this.apiHelper.clearData();
  }

  protected readonly PrivacyOptions = PrivacyOptions;
}
