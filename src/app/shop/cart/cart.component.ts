import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
//import { Cart, CartItem } from '../../shared/classes/cart';
import { Cart, Item, CartResponse } from '../../shared/classes/cartGraphQl';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cart: Cart = {};

  constructor(public productService: ProductService) {
    this.productService.cartItems.subscribe(response => {
      console.log(response);
      this.cart = response.data.cart;
    });    
  }

  ngOnInit(): void {
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  // Increament
  increment(product, qty = 1) {
    this.productService.updateCartQuantity(product, qty);
  }

  // Decrement
  decrement(product, qty = -1) {
    this.productService.updateCartQuantity(product, qty);
  }

  public removeItem(cartItem: Item) {
    this.productService.removeCartItem(cartItem).subscribe(response => {
      this.cart = response.data.updateCartItems.cart;
    });  
  }

}
