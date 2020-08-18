import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public birthMonthOptions: string[];
  public anniversatyMonthOptions: string[];

  constructor(private accountService: AccountService) { }
  

  ngOnInit(): void {

    this.accountService.GetBirthMonthOptions().subscribe(response => {
      this.birthMonthOptions = response.Values;
    }); 

    this.accountService.GetAnniversaryMonthOptions().subscribe(response => {
      this.anniversatyMonthOptions = response.Values;
    }); 
  }

}
