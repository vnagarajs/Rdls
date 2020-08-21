import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { Cart, Item, CartResponse, ShippingAddress } from '../../shared/classes/cartGraphQl';
import { GiftMessage } from '../../shared/classes/giftMessage';

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
  public shippingAddress: ShippingAddress = {};
  public email: string;
  public selectedShippingMethod: string;
  public selectedPaymentMethod: string;
  public isCouponApplied: boolean = false;
  public couponCode: string;
  public sender: string;
  public recipient: string;
  public message: string;

  constructor(private fb: FormBuilder,
    public productService: ProductService,
    private orderService: OrderService) { 
      this.checkoutForm = this.fb.group({
        firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
        lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
        telephone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        email: ['', [Validators.required, Validators.email]],
        streetAddress1: ['', [Validators.required, Validators.maxLength(50)]],
        streetAddress2: ['', [Validators.maxLength(50)]],
        country: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postcode: ['', Validators.required]
      })
  }

  ngOnInit(): void {
    this.productService.cartItems.subscribe(response => {
      this.cart = response.data.cart;

      if(this.cart.shipping_addresses && this.cart.shipping_addresses[0] && this.cart.shipping_addresses[0].selected_shipping_method) {
         this.selectedShippingMethod = this.cart.shipping_addresses[0].selected_shipping_method.carrier_code;      
      }

      this.selectedPaymentMethod = this.cart.selected_payment_method.code; 

      if(this.cart.shipping_addresses && this.cart.shipping_addresses[0]) {
        let shippingAddress = this.cart.shipping_addresses[0];
        this.checkoutForm = this.fb.group({
          firstname: [shippingAddress.firstname, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          lastname: [shippingAddress.lastname, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          telephone: [shippingAddress.telephone, [Validators.required, Validators.pattern('[0-9]+')]],
          email: [this.cart.email, [Validators.required, Validators.email]],
          streetAddress1: [shippingAddress.street[0] ? shippingAddress.street[0] : '', [Validators.required, Validators.maxLength(50)]],
          streetAddress2: [shippingAddress.street[1] ? shippingAddress.street[1] : '', [Validators.required, Validators.maxLength(50)]],
          country: [shippingAddress.country.code, Validators.required],
          city: [shippingAddress.city, Validators.required],
          state: ['', Validators.required],
          postcode: [shippingAddress.postcode, Validators.required]
        })
      }  

      if(this.cart.applied_coupon){
        this.isCouponApplied = true;
        this.couponCode = this.cart.applied_coupon.code;
      }
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
    product.quantity = 0;
    this.productService.updateCartItemQuantity(product);
  }


  setGuestEmailOnCart() {
    this.productService.setGuestEmailOnCart(this.checkoutForm.controls["email"].value).subscribe(response => {
      console.log(response);
      this.email = response.data.setGuestEmailOnCart.cart.email;
    }); 
  }

  setShippingAddressesOnCart() {
    this.shippingAddress.firstname = this.checkoutForm.controls["firstname"].value;
    this.shippingAddress.lastname = this.checkoutForm.controls["lastname"].value;
    this.shippingAddress.city = this.checkoutForm.controls["city"].value;
    this.shippingAddress.postcode = this.checkoutForm.controls["postcode"].value;
    this.shippingAddress.street = [];
    this.shippingAddress.street[0] = [this.checkoutForm.controls["streetAddress1"].value].toString();
    this.shippingAddress.street[1] = [this.checkoutForm.controls["streetAddress2"].value].toString();
    this.shippingAddress.country = {};
    this.shippingAddress.country.label = this.checkoutForm.controls["country"].value;
    this.shippingAddress.telephone = this.checkoutForm.controls["telephone"].value;

    this.productService.setShippingAddressesOnCart(this.shippingAddress).subscribe(response => {
      this.shippingAddress = response.data.setShippingAddressesOnCart.cart.shipping_addresses;
    }); 
    this.productService.setBillingAddressOnCart(this.shippingAddress).subscribe(response => {
      this.shippingAddress = response.data.setBillingAddressOnCart.cart.billing_address ;
    });
  }

  setShippingMethodsOnCart() {
    let shippingMethod = this.cart.shipping_addresses[0].available_shipping_methods.filter(t => t.carrier_code == this.selectedShippingMethod)[0];
    this.productService.setShippingMethodsOnCart(shippingMethod.carrier_code, shippingMethod.method_code).subscribe(response => {      
      this.selectedShippingMethod = response.data.setShippingMethodsOnCart.cart.shipping_addresses[0].selected_shipping_method.method_code;
    }); 
  }

  setPaymentMethodOnCart() {
    this.productService.setPaymentMethodOnCart(this.selectedPaymentMethod).subscribe(response => {
      this.selectedPaymentMethod = response.data.setPaymentMethodOnCart.cart.selected_payment_method.code;
    }); 
  }

  applyCouponToCart() {
    this.productService.applyCouponToCart(this.couponCode).subscribe(response => {
      this.cart.applied_coupon = response.data.applyCouponToCart.cart.applied_coupon.code;
      this.isCouponApplied = true;
    });
  }

  removeCouponFromCart() {
    this.productService.removeCouponFromCart().subscribe(response => {
      this.couponCode = "";
      this.isCouponApplied = false;
    });
  }

  addGiftMessageToOrder() {
    let giftMessage: GiftMessage = {
      giftMessage: { sender: this.sender, recipient: this.recipient, message: this.message }
    }
    this.productService.addGiftMessageToOrder(giftMessage).subscribe(response => {      
    });
  }

  placeOrder() {
    this.productService.placeOrder().subscribe(response => { 
      console.log(response);
    });
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
    this.setGuestEmailOnCart();
    this.setShippingAddressesOnCart();

    this.isPaymentLinkVisible = false;
    this.isShippingAddrEditVisible = true;
    this.isShippingAddrContentVisible = false;
    this.isShippingAddressChecked = true;

    this.isShippingMethodEditVisible = false;
    this.isShippingMethodContentVisible = true;
  }

  shippingMethodNextClick() {    
    this.setShippingMethodsOnCart();
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
