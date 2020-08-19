import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { customerRegistration } from '../../../shared/classes/customerRegistration';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public birthMonthOptions: string[];
  public anniversatyMonthOptions: string[];
  public registrationForm: FormGroup;
  public formSubmitted: boolean = false;

  constructor(private accountService: AccountService, private fb: FormBuilder) { 
    this.registrationForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      birthMonth: ['', [Validators.required]],
      anniversaryMonth: ['', [Validators.required]]      
    });
  }
  

  ngOnInit(): void {

    this.accountService.GetBirthMonthOptions().subscribe(response => {
      this.birthMonthOptions = response.Values;
    }); 

    this.accountService.GetAnniversaryMonthOptions().subscribe(response => {
      this.anniversatyMonthOptions = response.Values;
    }); 
  }

  registerCustomer() {
    this.formSubmitted = true;

    if(!this.registrationForm.invalid) {
      let customerRegistration: customerRegistration = {};
      customerRegistration.customer = {};
      customerRegistration.customer.email = this.registrationForm.controls["email"].value;
      customerRegistration.customer.firstname = this.registrationForm.controls["firstname"].value;
      customerRegistration.customer.lastname = this.registrationForm.controls["lastname"].value;
      customerRegistration.password = this.registrationForm.controls["password"].value;
      customerRegistration.customer.custom_attributes = [
        {
          attribute_code: "customer_birth_month",
          value: this.registrationForm.controls["birthMonth"].value
        },
        {
          attribute_code: "customer_anniversary_month",
          value: this.registrationForm.controls["anniversaryMonth"].value
        }
      ]
      customerRegistration.customer.storeId = 1;
      customerRegistration.customer.websiteId = 1;
      
      this.accountService.registerCustomer(customerRegistration).subscribe(response => {
        console.log(response);
      });
    }
  }
}
