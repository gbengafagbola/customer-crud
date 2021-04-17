import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})


export class EditCustomerComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('resetCustomerForm', { static: true }) myNgForm;
  customerForm: FormGroup;

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private studentApi: ApiService
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.customerForm = this.fb.group({
      student_name: ['', [Validators.required]],
      customer_address: ['', [Validators.required]],
      order_number: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      house_number: ['', [Validators.required]],
      order_amount: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['Male']
    })
  }


  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.customerForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.customerForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitCustomerForm() {
    if (this.customerForm.valid) {
      this.studentApi.AddStudent(this.customerForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
      });
    }
  }

}