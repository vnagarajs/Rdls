import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
//import { Cart, CartItem } from '../../shared/classes/cart';
import { Cart, Item, CartResponse } from '../../shared/classes/cartGraphQl';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { cartRestApi } from '../../shared/classes/cartRestApi';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cart: Cart = {};
  cartFormGroup: FormGroup;
  constructor(public productService: ProductService, public fb: FormBuilder) {
  }

  private getCartItems() {
    this.productService.cartItems.subscribe(response => {
      this.cart = response.data.cart;
      this.cartFormGroup = this.fb.group({
        cartItems: this.fb.array([])
      });
      this.cart.items.forEach(i => {
        let cartItemFormGroup = {};
        i.product.options.forEach(control => {
          let selectedVal = '';
          if(i.customizable_options.filter(c => c.id == control.option_id).length > 0){
            selectedVal = i.customizable_options.filter(c => c.id == control.option_id)[0].values[0].value;
          }
          
          cartItemFormGroup[control.option_id] = new FormControl(selectedVal, control.required ? [Validators.required] : []);
        });
        cartItemFormGroup['quantity'] = new FormControl(i.quantity);
        const control =  this.cartFormGroup.get('cartItems') as FormArray;
        control.push(new FormGroup(cartItemFormGroup));
      });
    });
  }

  ngOnInit(): void {
    this.getCartItems();        
  }  
 
  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  // Increament
  increment(formArrayIndex: number, cartItem: Item) {
    let cartItemFormGroup = (this.cartFormGroup.get('cartItems') as FormArray).get(formArrayIndex.toString());
    let currentQuantity = parseInt(cartItemFormGroup.get('quantity').value);
    cartItemFormGroup.get('quantity').setValue(currentQuantity + 1);
    cartItem.quantity = currentQuantity + 1;
    this.productService.updateCartItemQuantity(cartItem).subscribe(response => {
    this.getCartItems();
    });    
  }

  // Decrement
  decrement(formArrayIndex: number, cartItem: Item) {
    let cartItemFormGroup = (this.cartFormGroup.get('cartItems') as FormArray).get(formArrayIndex.toString());
    let currentQuantity = parseInt(cartItemFormGroup.get('quantity').value);
    if(currentQuantity >= 2) {
      cartItemFormGroup.get('quantity').setValue(currentQuantity - 1);
      cartItem.quantity = currentQuantity - 1;
      this.productService.updateCartItemQuantity(cartItem).subscribe(response => {
      this.getCartItems();
    });      
    }
  }

  public removeItem(cartItem: Item) {
    cartItem.quantity = 0;
    this.productService.updateCartItemQuantity(cartItem).subscribe(response => {
      this.getCartItems();
    });  
  }

  updateItem(formArrayIndex: number, cartItem: Item) {
    let cartItemFormGroup = (this.cartFormGroup.get('cartItems') as FormArray).get(formArrayIndex.toString());
    let cart: cartRestApi.Cart = {};
    cart.cartItem = {};
    cart.cartItem.productOption = {};
    cart.cartItem.productOption.extensionAttributes = {};
    cart.cartItem.productOption.extensionAttributes.customOptions = [];

    cart.cartItem.sku = cartItem.product.sku;
    cart.cartItem.quote_id = this.productService.getQuoteId();    
    cart.cartItem.qty = parseInt(cartItemFormGroup.get('quantity').value);

    cartItem.product.options.forEach(option => {
      switch(option.title) {
        case 'Warranty':
          if(cartItemFormGroup.get(option.option_id.toString()).value) {
            cart.cartItem.productOption.extensionAttributes.customOptions.push({
              optionId: option.option_id.toString(),
              optionValue: option.value[0].option_type_id.toString()
            });
          }
          break;
        case 'Ring Size':
          if(cartItemFormGroup.get(option.option_id.toString()).value) {
            cart.cartItem.productOption.extensionAttributes.customOptions.push({
              optionId: option.option_id.toString(),
              optionValue: cartItemFormGroup.get(option.option_id.toString()).value
            });
          }
          break;
        case 'Encraving':
          if(cartItemFormGroup.get(option.option_id.toString()).value) {
            cart.cartItem.productOption.extensionAttributes.customOptions.push({
              optionId: option.option_id.toString(),
              optionValue: cartItemFormGroup.get(option.option_id.toString()).value
            });
          }
          break;
      }
    });
    this.productService.updateCartItem(cartItem, cart).subscribe((response) => {
      this.getCartItems();        
    });
  }
}
