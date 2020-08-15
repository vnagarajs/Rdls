import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { Cart, Item, CartResponse } from '../../shared/classes/cartGraphQl';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  isShippingAddrEditVisible = false;
  isShippingMethodEditVisible = false;
  isPaymentEditVisible = false;

  isShippingAddrContentVisible = true;
  isShippingMethodContentVisible = false;
  isPaymentContentVisible = false;

  isShippingAddressChecked = false;
  isShippingMethodChecked = false;
  isPaymentLinkVisible = false;

  public checkoutForm:  FormGroup;
  public cart: Cart = {};
  public payPalConfig ? : IPayPalConfig;
  public payment: string = 'Stripe';
  public amount:  any;

  constructor(private fb: FormBuilder,
    public productService: ProductService,
    private orderService: OrderService) { 
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      town: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.productService.cartItems.subscribe(response => {
      this.cart = response.data.cart;
    });   
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  // Stripe Payment Gateway
  stripeCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripe_token, // publishble key
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        //this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
      }
    });
    handler.open({
      name: 'Multikart',
      description: 'Online Fashion Store',
      amount: this.amount * 100
    }) 
  }

  // Paypal Payment Gateway
  private initConfig(): void {
    this.payPalConfig = {
        currency: this.productService.Currency.currency,
        clientId: environment.paypal_token,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                currency_code: this.productService.Currency.currency,
                value: this.amount,
                breakdown: {
                    item_total: {
                        currency_code: this.productService.Currency.currency,
                        value: this.amount
                    }
                }
              }
          }]
      },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            size:  'small', // small | medium | large | responsive
            shape: 'rect', // pill | rect
        },
        onApprove: (data, actions) => {
            //this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
  }

  // Increament
  increment(product, qty = 1) {
    this.productService.updateCartQuantity(product, qty);
  }

  // Decrement
  decrement(product, qty = -1) {
    this.productService.updateCartQuantity(product, qty);
  }

  public removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  shippingAddressEditClick() {
    this.isPaymentLinkVisible = false;
    this.isShippingAddrEditVisible = false;
    this.isShippingAddrContentVisible = true;
    
    this.isShippingMethodContentVisible = false;
    this.isPaymentContentVisible = false;

    if (this.isShippingAddressChecked) { 
      this.isShippingMethodEditVisible = true;
    }

    if (this.isShippingMethodChecked) { 
      this.isPaymentEditVisible = true;
    }
  }

  shippingMethodEditClick() {
    this.isPaymentLinkVisible = false;
    this.isShippingMethodEditVisible = false;
    this.isShippingMethodContentVisible = true;
    
    this.isShippingAddrEditVisible = true;
    this.isShippingAddrContentVisible = false;
    this.isPaymentContentVisible = false;

    if (this.isShippingMethodChecked) { 
      this.isPaymentEditVisible = true;
    }
  }

  paymentEditClick() {
    this.isPaymentEditVisible = false;
    this.isPaymentLinkVisible = true;
    this.isPaymentContentVisible = true;

    this.isShippingAddrEditVisible = true;
    this.isShippingAddrContentVisible = false;
    this.isShippingMethodContentVisible = false;
  }

  shippingAddressNextClick() {
    this.isPaymentLinkVisible = false;
    this.isShippingAddrEditVisible = true;
    this.isShippingAddrContentVisible = false;
    this.isShippingAddressChecked = true;

    this.isShippingMethodEditVisible = false;
    this.isShippingMethodContentVisible = true;
  }

  shippingMethodNextClick() {
    this.isPaymentLinkVisible = true;
    this.isShippingAddrEditVisible = true;
    this.isShippingMethodEditVisible = true;
    this.isShippingAddrContentVisible = false;
    this.isShippingMethodChecked = true;

    this.isShippingMethodContentVisible = false;

    this.isPaymentEditVisible = false;
    this.isPaymentContentVisible = true;
  }

}
