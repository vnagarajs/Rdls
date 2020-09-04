import { Component, OnInit, ɵConsole } from '@angular/core';
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

  async login() {
    this.accountService.login(this.email, this.password).subscribe(async response => {

      localStorage.setItem("customerToken", response.data.generateCustomerToken.token);      
      this.productService.reCreateApolloAfterLoginLogOut();

      let guest_cart_id = localStorage["quoteId"];
      localStorage.removeItem('quoteId');

      if (guest_cart_id) {
        let customer_cart = await this.productService.getOrCreateQuoteId();
        localStorage.setItem('quoteId', customer_cart.data.createEmptyCart);        
        this.accountService.mergeCarts(guest_cart_id, customer_cart.data.createEmptyCart).subscribe(response => {
        }); 
      }

      if (this.route.snapshot.paramMap.get('source') == 'checkout') {
        this.router.navigate(['/shop/checkout']);
      }
      else {
        this.router.navigate(['/pages/dashboard']);
      }
    });
  }
}
