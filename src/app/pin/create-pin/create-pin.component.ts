import {Component, inject, OnInit} from '@angular/core';
import {NgbActiveModal, NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {customer, PinData} from "../../utils/interface";
import {ApiHelperService} from "../../service/api-helper.service";
import {IDropdownSettings, NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";

@Component({
  selector: 'app-create-pin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgbTypeahead,
    NgMultiSelectDropDownModule
  ],
  templateUrl: './create-pin.component.html',
  styleUrl: './create-pin.component.scss'
})
export class CreatePinComponent implements OnInit{
  modal = inject(NgbActiveModal);
  pinForm!:FormGroup<{
    title: FormControl<string | null>,
    customers: FormControl<customer[] | null>,
    privacy: FormControl<string | null>,
    image: FormControl<any|null>
  }>
  customers!:customer[];
  settings!:IDropdownSettings
  selectedCollaborators!: customer[];

  constructor(private apiHelper: ApiHelperService) {
  }

  ngOnInit() {
    this.setMultiselect();
    setTimeout(()=>{
      this.customers = this.apiHelper.getCustomersData();
    },)

    this.setLayout();
  }

  setMultiselect() {
    this.settings= {
      textField: 'name',
      idField:'email',
      singleSelection: false,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
      noDataAvailablePlaceholderText: "Please add customer first",
      enableCheckAll: true,
      allowSearchFilter: true,
      limitSelection: -1,
      closeDropDownOnSelection: false,
      
    };
  }

  setLayout() {
    this.pinForm = new FormGroup({
      title: new FormControl("", Validators.required),
      customers: new FormControl(this.selectedCollaborators, Validators.required),
      privacy: new FormControl("", Validators.required),
      image: new FormControl("", Validators.required),
    });
  }

  resetForm() {
    this.setLayout();
  }

  onSubmit(ev:SubmitEvent) {
    ev.preventDefault();
    this.pinForm.markAsTouched();
    if(this.pinForm.valid){
      this.apiHelper.savePinData(this.pinForm.getRawValue() as PinData);
      this.modal.close()
    }
  }

  async onImagePicked(ev: Event) {
    const element = ev.currentTarget as HTMLInputElement;
    if (element.files){
      const file = element.files[0];
      const toBase64 = (file:File) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
      let dataUrl = await toBase64(file);
      if(dataUrl)
        this.pinForm.patchValue({image: dataUrl})
    }
  }
}
