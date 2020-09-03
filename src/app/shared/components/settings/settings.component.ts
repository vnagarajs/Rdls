import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";
import { Cart, CartResponse } from '../../classes/cartGraphQl';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public cart: Cart = { };
  public languages = [{ 
    name: 'English',
    code: 'en'
  }, {
    name: 'French',
    code: 'fr'
  }];

  public currencies = [{
    name: 'Euro',
    currency: 'EUR',
    price: 0.90 // price of euro
  }, {
    name: 'Rupees',
    currency: 'INR',
    price: 70.93 // price of inr
  }, {
    name: 'Pound',
    currency: 'GBP',
    price: 0.78 // price of euro
  }, {
    name: 'Dollar',
    currency: 'USD',
    price: 1 // price of usd
  }]

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public productService: ProductService) {      
    this.productService.cartItems.subscribe(response => { 
      this.cart = response.data.cart;
    });
  }

  ngOnInit(): void {
    
  }

  get userLoggedIn() {
    if(localStorage["customerToken"]) {
      return true;
    }
    return false;
  }

  logOut() {
    localStorage.removeItem("customerToken");
  }
  
  changeLanguage(code){
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.updateCartItemQuantity(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }
  
  addToggleClass() {
    document.querySelector('.toggle-nav').classList.add('lowzindex');
  }
  removeToggleClass() {
    document.querySelector('.toggle-nav').classList.remove('lowzindex');
  }
  public openSearch() {
    document.getElementById('topsearch').classList.add('open');
    this.addToggleClass();
  }

  public closeSearch() {
    document.getElementById('topsearch').classList.remove('open');
    this.removeToggleClass();
  }
  public openAccount() {
    document.getElementById('topaccount').classList.add('open');
    this.addToggleClass();
  }
   public closeAccount() {
    document.getElementById('topaccount').classList.remove('open');
    this.removeToggleClass();
  }

  opencart() {
    this.addToggleClass();
    document.getElementById('topcart').classList.add('open');
  }

 closeCart() {
  document.getElementById('topcart').classList.remove('open');
  this.removeToggleClass();
}
}
