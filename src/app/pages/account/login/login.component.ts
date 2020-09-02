import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.email, this.password).subscribe(response => {
      localStorage.setItem("customerToken", response.data.generateCustomerToken.token);
      if(this.route.snapshot.paramMap.get('source') == 'checkout') {
        this.router.navigate(['/shop/checkout']);
      }
      else {
        this.router.navigate(['/pages/dashboard']);        
      }
    });
  }
}
