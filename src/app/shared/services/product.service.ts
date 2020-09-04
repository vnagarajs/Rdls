import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../classes/product';
import { cartRestApi } from '../classes/cartRestApi';
import { environment } from '../../../environments/environment';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CartResponse, Data, Item } from '../classes/cartGraphQl';
import { ApolloQueryResult, ApolloCurrentQueryResult } from 'apollo-client';
import { HttpLink } from 'apollo-angular-link-http';
import { GiftMessage } from '../classes/giftMessage';
import { PaymentDetails } from '../classes/order';
import 'rxjs/add/observable/of';
import { InMemoryCache } from "apollo-cache-inmemory";

const state = {
  products: JSON.parse(localStorage['products'] || '[]'),
  wishlist: JSON.parse(localStorage['wishlistItems'] || '[]'),
  compare: JSON.parse(localStorage['compareItems'] || '[]'),
  cart: JSON.parse(localStorage['cartItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public Currency = { name: 'Dollar', currency: 'USD', price: 1 } // Default Currency
  public OpenCart: boolean = false;
  public Products

  constructor(private http: HttpClient,
    private toastrService: ToastrService, private apollo: Apollo, private httpLink: HttpLink) {
  }

  /*
    ---------------------------------------------
    ---------------  Product  -------------------
    ---------------------------------------------
  */

  // Product
  private get products(): Observable<Product[]> {
    this.Products = this.http.get<Product[]>('assets/data/products.json').pipe(map(data => data));
    this.Products.subscribe(next => { localStorage['products'] = JSON.stringify(next) });
    return this.Products = this.Products.pipe(startWith(JSON.parse(localStorage['products'] || '[]')));
  }

  // Get Products
  public get getProducts(): Observable<Product[]> {
    return this.products;
  }

  // Get Products By Slug
  public getProductBySku(sku: string): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders()
    }
    return this.http.get<Product>(environment.product_base_url + environment.get_product_url + sku);
  }

  public reCreateApolloAfterLoginLogOut() {
    this.apollo.removeClient();

    let headers = new HttpHeaders();
    const token = localStorage.getItem('customerToken');
    if(token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    this.apollo.create({
      link: this.httpLink.create({uri: environment.api_host + environment.graphql_url, headers: headers}),
      cache: new InMemoryCache()
    });
  }

  public  getQuoteId() {
    return localStorage["quoteId"];
  }

  public async getOrCreateQuoteId() {
    let quoteId: string = localStorage["quoteId"];

    if (quoteId) {
      let response = {
        data: {
          createEmptyCart: quoteId
        }
      }
      return await Observable.of(response).toPromise();
    }

    return await this.apollo
      .mutate<any>({
        mutation: gql`mutation {
          createEmptyCart
        }`
      }).toPromise();
      
      // .subscribe(
      //   (response) => {
      //     quoteId = response.data.createEmptyCart;
      //     if (quoteId) {
      //       localStorage.setItem("quoteId", quoteId);
      //     }
      //     console.log('3');
      //     console.log(response);
          
      //     return Observable.of(quoteId);
      //   }
      // );
  }

  /*
    ---------------------------------------------
    ---------------  Wish List  -----------------
    ---------------------------------------------
  */

  // Get Wishlist Items
  public get wishlistItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.wishlist);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Wishlist
  public addToWishlist(product): any {
    const wishlistItem = state.wishlist.find(item => item.id === product.id)
    if (!wishlistItem) {
      state.wishlist.push({
        ...product
      })
    }
    this.toastrService.success('Product has been added in wishlist.');
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  // Remove Wishlist items
  public removeWishlistItem(product: Product): any {
    const index = state.wishlist.indexOf(product);
    state.wishlist.splice(index, 1);
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  /*
    ---------------------------------------------
    -------------  Compare Product  -------------
    ---------------------------------------------
  */

  // Get Compare Items
  public get compareItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.compare);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Compare
  public addToCompare(product): any {
    const compareItem = state.compare.find(item => item.id === product.id)
    if (!compareItem) {
      state.compare.push({
        ...product
      })
    }
    this.toastrService.success('Product has been added in compare.');
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  // Remove Compare items
  public removeCompareItem(product: Product): any {
    const index = state.compare.indexOf(product);
    state.compare.splice(index, 1);
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  /*
    ---------------------------------------------
    -----------------  Cart  --------------------
    ---------------------------------------------
  */

  // Get Cart Items
  public get cartItems(): Observable<any> {
    var cart_id = localStorage["quoteId"];
    if (!cart_id) {
      cart_id = this.getQuoteId();
    }
    if (cart_id) {
      cart_id = cart_id.split('|')[0];
    }

    return this.http.get<any>(environment.api_host + `graphql?query={
      cart(cart_id: "`+ cart_id + `") {
        items {
          id
          product {
            name
            sku
        image{
        url
        }
        ... on CustomizableProductInterface {
          options {
            title
            required
            sort_order
            option_id
            type
            ... on CustomizableDropDownOption{
              value{
                option_type_id
                price
                title
                sort_order          
              }
            }
            ... on CustomizableCheckboxOption{
              value{
                option_type_id
                price
                title
                sort_order
              }
            }
          }
        }
          }
        ... on SimpleCartItem {
              customizable_options {
                label
          id
                values {
                  id
            label
            value
            price{
            value
            }
                }
              }
            }
        ... on ConfigurableCartItem {
              configurable_options {
            id
                option_label
          value_id
          value_label
              }
            }
          quantity
          price
        }
      email
      billing_address {
          city
          country {
            code
            label
          }
          firstname
          lastname
          postcode
          region {
            code
            label
          }
          street
          telephone
        }
      shipping_addresses {
        firstname
          lastname
          postcode
          street
          city
          region {
            code
            label
          }
          country {
            code
            label
          }
          telephone
        available_shipping_methods {
            amount {
              currency
              value
            }
            available
            carrier_code
            carrier_title
            error_message
            method_code
            method_title
            price_excl_tax {
              value
              currency
            }
            price_incl_tax {
              value
              currency
            }
          }
          selected_shipping_method {
            amount {
              value
              currency
            }
            carrier_code
            carrier_title
            method_code
            method_title
          }
        }
      selected_payment_method{
       code
       title
      }
      applied_coupon {
          code
        }
      available_payment_methods {
          code
          title
        }
      prices {
          grand_total {
            value
          }
        subtotal_excluding_tax{
        value
        }
        applied_taxes{
         amount{
          value
         }
         label
        }
        }
      }
    }
    `);
  }

  // Add to Cart
  public addToCart(cart: cartRestApi.Cart): any {
    
    cart.cartItem.quote_id = localStorage["quoteId"].split('|')[0];    

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    const token = localStorage.getItem('customerToken');
    let url = environment.add_to_cart_guest_url.replace('{0}', cart.cartItem.quote_id)
    if (token) {
      cart.cartItem.quote_id = localStorage["quoteId"].split('|')[1];  
      
      headers = headers.set('Authorization', 'Bearer ' + token);
      url = environment.add_to_cart_customer_url;
    }
    console.log(cart);
    
    return this.http.post(environment.product_base_url + url, cart, { headers: headers });
  }

  // Update Cart Quantity
  public updateCartQuantity(product: Product, quantity: number): Product | boolean {
    return state.cart.find((items, index) => {
      if (items.id === product.id) {
        const qty = state.cart[index].quantity + quantity
        const stock = this.calculateStockCounts(state.cart[index], quantity)
        if (qty !== 0 && stock) {
          state.cart[index].quantity = qty
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        return true
      }
    })
  }

  public updateCartItem(cartItem: Item, cart: cartRestApi.Cart) {
    let addItemToCart = this.addToCart(cart);
    cartItem.quantity = 0;
    let removeCartItem = this.updateCartItemQuantity(cartItem);
    return forkJoin([removeCartItem, addItemToCart]);
  }

  // Calculate Stock Counts
  public calculateStockCounts(product, quantity) {
    const qty = product.quantity + quantity
    const stock = product.stock
    if (stock < qty || stock == 0) {
      this.toastrService.error('You can not add more items than available. In stock ' + stock + ' items.');
      return false
    }
    return true
  }

  // Remove Cart items
  public updateCartItemQuantity(cartItem: Item): any {
    var cart_id = localStorage["quoteId"];
    if (!cart_id) {
      cart_id = this.getQuoteId();
    }
    if (cart_id) {
      cart_id = cart_id.split('|')[0];
    }  

    return this.apollo
      .mutate<any>({
        mutation: gql`mutation($cart_id: String!, $cart_item_id: Int!, $quantity: Float!) {
          updateCartItems(
            input: {
              cart_id: $cart_id,
              cart_items: [
                {
                  cart_item_id: $cart_item_id
                  quantity: $quantity
                }
              ]
              }
            ){
              cart {
                items {
                  id
                  product {
                    name
                  }
                  quantity
                }
                prices {
                  grand_total{
                    value
                    currency
                  }
                }
              }
            }
          }          
        `,
        variables: {
          cart_id: cart_id,
          cart_item_id: cartItem.id,
          quantity: cartItem.quantity
        }
      });
  }

  // Total amount 
  cartTotalAmount(): Observable<number> {
    // return this.cartItems.pipe(map((product: Product[]) => {
    //   return product.reduce((prev, curr: Product) => {
    //     let price = curr.price;
    //     if(curr.discount) {
    //       price = curr.price - (curr.price * curr.discount / 100)
    //     }
    //     return (prev + price * curr.quantity) * this.Currency.price;
    //   }, 0);
    // }));
    return null;
  }

  checkIfEmailAddressRegistered(email: string): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .query<any>({
        query: gql`
        query($email: String!) {
          isEmailAvailable(email: $email) {
          is_email_available
          }
          }`,
        variables: {
          email: email
        }
      });
  }

  public setGuestEmailOnCart(email: string): Observable<any> {
    var cart_id = localStorage["quoteId"];
    if (!cart_id) {
      cart_id = this.getQuoteId();
    }

    if (cart_id) {
      cart_id = cart_id.split('|')[0];
    }

    return this.apollo
      .mutate<any>({
        mutation: gql`mutation($email: String!, $cart_id: String!) {
          setGuestEmailOnCart(input: {
            cart_id: $cart_id
            email: $email
          }) {
            cart {
              email
            }
          }
        }`,
        variables: {
          email: email,
          cart_id: cart_id
        }
      });
  }

  public setShippingAddressesOnCart(shippingAddress: any): Observable<any> {
    var cart_id = localStorage["quoteId"];
    if (!cart_id) {
      cart_id = this.getQuoteId();
    }
    if (cart_id) {
      cart_id = cart_id.split('|')[0];
    }

    return this.apollo
      .mutate<any>({
        mutation: gql`mutation($cart_id: String!, $firstname: String!, $lastname: String!, $street: [String]!, $city: String!,
          $region: String!, $postcode: String!, $country_code: String!, $telephone: String!, $save_in_address_book: Boolean!) {
          setShippingAddressesOnCart(
            input: {
              cart_id: $cart_id
              shipping_addresses: [
                {
                  address: {
                    firstname: $firstname
                    lastname: $lastname
                    street: $street
                    city:  $city
                    region: $region
                    postcode: $postcode
                    country_code: $country_code
                    telephone: $telephone
                    save_in_address_book: $save_in_address_book
                  },
                }
              ]
            }
          ) {
            cart {
              shipping_addresses {
                firstname
                  lastname
                  postcode
                  street
                  city
                  region {
                    code
                    label
                  }
                  country {
                    code
                    label
                  }
                  telephone
                available_shipping_methods {
                    amount {
                      currency
                      value
                    }
                    available
                    carrier_code
                    carrier_title
                    error_message
                    method_code
                    method_title
                    price_excl_tax {
                      value
                      currency
                    }
                    price_incl_tax {
                      value
                      currency
                    }
                  }
                  selected_shipping_method {
                    amount {
                      value
                      currency
                    }
                    carrier_code
                    carrier_title
                    method_code
                    method_title
                  }
                }
            }
          }
        }
        `,
        variables: {
          cart_id: cart_id,
          firstname: shippingAddress.firstname,
          lastname: shippingAddress.lastname,
          street: shippingAddress.street,
          city: shippingAddress.city,
          region: 'TX',
          postcode: shippingAddress.postcode,
          telephone: shippingAddress.telephone,
          country_code: 'US',
          save_in_address_book: false,
        }
      });
  }

  public setBillingAddressOnCart(shippingAddress: any): Observable<any> {
    var cart_id = localStorage["quoteId"];
    if (!cart_id) {
      cart_id = this.getQuoteId();
    }
    if (cart_id) {
      cart_id = cart_id.split('|')[0];
    }

    return this.apollo
      .mutate<any>({
        mutation: gql`mutation($cart_id: String!, $firstname: String!, $lastname: String!, $street: [String]!, $city: String!,
          $region: String!, $postcode: String!, $country_code: String!, $telephone: String!, $save_in_address_book: Boolean!) {
            setBillingAddressOnCart(
            input: {
              cart_id: $cart_id
              billing_address: {
                address: {
                  firstname: $firstname
                  lastname: $lastname
                  street: $street
                  city:  $city
                  region: $region
                  postcode: $postcode
                  country_code: $country_code
                  telephone: $telephone
                  save_in_address_book: $save_in_address_book
                },
              }              
            }
          ) {
            cart {
              billing_address {
                firstname
                lastname
                street
                city
                region {
                  code
                  label
                }
                postcode
                telephone
                country {
                  code
                  label
                }
              }
            }
          }
        }
        `,
        variables: {
          cart_id: cart_id,
          firstname: shippingAddress.firstname,
          lastname: shippingAddress.lastname,
          street: shippingAddress.street,
          city: shippingAddress.city,
          region: 'TX',
          postcode: shippingAddress.postcode,
          telephone: shippingAddress.telephone,
          country_code: 'US',
          save_in_address_book: false,
        }
      });
  }

  public setShippingMethodsOnCart(carrier_code: any, method_code: any): Observable<any> {
    var cart_id = localStorage["quoteId"];
    if (!cart_id) {
      cart_id = this.getQuoteId();
    }
    if (cart_id) {
      cart_id = cart_id.split('|')[0];
    }
    return this.apollo
      .mutate<any>({
        mutation: gql`mutation($cart_id: String!, $carrier_code: String!, $method_code: String!) {
            setShippingMethodsOnCart(input: {
              cart_id: $cart_id
              shipping_methods: [
                {
                  carrier_code: $carrier_code
                  method_code: $method_code
                }
              ]
            }) {
              cart {
                shipping_addresses {
                  selected_shipping_method {
                    carrier_code
                    method_code
                    carrier_title
                    method_title
                  }
                }
              }
            }
          
        }
        `,
        variables: {
          cart_id: cart_id,
          carrier_code: carrier_code,
          method_code: method_code
        }
      });
  }

  public setPaymentMethodOnCart(code: string): Observable<any> {
    var cart_id = localStorage["quoteId"];
    if (!cart_id) {
      cart_id = this.getQuoteId();
    }
    if (cart_id) {
      cart_id = cart_id.split('|')[0];
    }
    return this.apollo
      .mutate<any>({
        mutation: gql`mutation($cart_id: String!, $code: String!) {
          setPaymentMethodOnCart(input: {
              cart_id: $cart_id
              payment_method: {
                code: $code
            }
            }) {
              cart {
                selected_payment_method {
                  code
                  title
                }
              }
            }
          } 
        `,
        variables: {
          cart_id: cart_id,
          code: code
        }
      });
  }

  public applyCouponToCart(couponCode: string): Observable<any> {
    var cart_id = localStorage["quoteId"];
    if (!cart_id) {
      cart_id = this.getQuoteId();
    }
    if (cart_id) {
      cart_id = cart_id.split('|')[0];
    }
    return this.apollo
      .mutate<any>({
        mutation: gql`mutation($cart_id: String!, $coupon_code: String!) {
          applyCouponToCart(
            input: {
              cart_id: $cart_id
              coupon_code: $coupon_code
            }
          ) {
            cart {
              applied_coupon {
                code
              }
            }
          }
        
          } 
        `,
        variables: {
          cart_id: cart_id,
          coupon_code: couponCode
        }
      });
  }

  public removeCouponFromCart(): Observable<any> {
    var cart_id = localStorage["quoteId"];
    if (!cart_id) {
      cart_id = this.getQuoteId();
    }
    if (cart_id) {
      cart_id = cart_id.split('|')[0];
    }
    return this.apollo
      .mutate<any>({
        mutation: gql`mutation($cart_id: String!) {
          removeCouponFromCart(input: { cart_id: $cart_id }) {
            cart {
              applied_coupon {
                code
              }
            }
          }
        } 
        `,
        variables: {
          cart_id: cart_id
        }
      });
  }

  public addGiftMessageToOrder(giftMessage: GiftMessage): any {
    var cart_id = localStorage["quoteId"];
    if (!cart_id) {
      cart_id = this.getQuoteId();
    }
    if (cart_id) {
      cart_id = cart_id.split('|')[0];
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + environment.adminBearerToken).set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(environment.product_base_url + environment.addGiftMessageUrl.replace('{0}', cart_id), giftMessage, { headers: headers });
  }

  public placeOrder(): Observable<any> {
    var cart_id = localStorage["quoteId"];
    if (!cart_id) {
      cart_id = this.getQuoteId();
    }
    if (cart_id) {
      cart_id = cart_id.split('|')[0];
    }
    return this.apollo
      .mutate<any>({
        mutation: gql`mutation($cart_id: String!) {
          placeOrder(input: { cart_id: $cart_id }) {
            order {
              order_id
            }
          }        
        }       
    `,
        variables: {
          cart_id: cart_id
        }
      });
  }

  public placeAuthorizeNetOrder(authorizeNetOrderDetails: any): Observable<any> {
    authorizeNetOrderDetails.quote_details.quote_id = this.getQuoteId().split('|')[0];

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + environment.adminBearerToken).set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(environment.product_base_url + environment.authorize_net_order_url, authorizeNetOrderDetails, { headers: headers });
  }

  public savePaymentDetails(paymentDetails: PaymentDetails): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + environment.adminBearerToken).set('Content-Type', 'application/json; charset=utf-8');;

    return this.http.post(environment.product_base_url + environment.savePaymentDetails, paymentDetails, { headers: headers });
  }

  /*
    ---------------------------------------------
    ------------  Filter Product  ---------------
    ---------------------------------------------
  */

  // Get Product Filter
  public filterProducts(filter: any): Observable<Product[]> {
    return this.products.pipe(map(product =>
      product.filter((item: Product) => {
        if (!filter.length) return true
        const Tags = filter.some((prev) => { // Match Tags
          if (item.tags) {
            if (item.tags.includes(prev)) {
              return prev
            }
          }
        })
        return Tags
      })
    ));
  }

  // Sorting Filter
  public sortProducts(products: Product[], payload: string): any {

    if (payload === 'ascending') {
      return products.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'a-z') {
      return products.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'z-a') {
      return products.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        } else if (a.title < b.title) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'low') {
      return products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'high') {
      return products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        }
        return 0;
      })
    }
  }

  /*
    ---------------------------------------------
    ------------- Product Pagination  -----------
    ---------------------------------------------
  */
  public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 16) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage < paginateRange - 1) {
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

}
