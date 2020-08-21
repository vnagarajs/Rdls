import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.email, this.password).subscribe(response => {
      localStorage.setItem("customerToken", response.data.generateCustomerToken.token);
      this.router.navigate(['/home/riddles']);      
    });    
  }
}
