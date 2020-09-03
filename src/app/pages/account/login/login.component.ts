import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router,
    public productService: ProductService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.email, this.password).subscribe(response => {
      localStorage.setItem("customerToken", response.data.generateCustomerToken.token);
      var guest_cart_id = localStorage["quoteId"];
      var customer_cart_id = this.productService.getQuoteId();
      if (guest_cart_id) {
         this.accountService.mergeCarts(guest_cart_id, customer_cart_id).subscribe( response => {

         });
      }
      if(this.route.snapshot.paramMap.get('source') == 'checkout') {
        this.router.navigate(['/shop/checkout']);
      }
      else {
        this.router.navigate(['/pages/dashboard']);        
      }
    });
  }
}
