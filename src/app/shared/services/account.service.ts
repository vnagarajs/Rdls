import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { customerRegistration } from '../classes/customerRegistration';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private apollo: Apollo) {

  }

  public login(email: string, password): Observable<any> {
    return this.apollo
      .mutate<any>({
        mutation: gql`mutation($email: String!, $password: String!) {
                generateCustomerToken(email: $email, password: $password) {
                    token
                  }
              } 
            `,
        variables: {
          email: email,
          password: password
        }
      });
  }

  public GetBirthMonthOptions(): Observable<any> {
    return this.http.get<any>(environment.product_base_url + environment.getBirthMonthOptionsUrl);
  }

  public GetAnniversaryMonthOptions(): Observable<any> {
    return this.http.get<any>(environment.product_base_url + environment.getAnniversaryMonthOptionsUrl);
  }

  public registerCustomer(customer: customerRegistration): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders()
    }
    httpOptions.headers.set('content-type', 'application/json');
    httpOptions.headers.set('Access-Control-Allow-Origin', '*');
    httpOptions.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    return this.http.post(environment.product_base_url + environment.registerCustomerUrl, customer, httpOptions);
  }

  public getCustomerDetails(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders()
    }
    const token = localStorage.getItem('customerToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
      httpOptions.headers.set('Authorization', 'Bearer ' + token);
    }

    // headers.set('content-type', 'application/json');
    // headers.set('Access-Control-Allow-Origin', '*');
    // headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // headers.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
    return this.http.get<any>(environment.api_host + `graphql?query={
           
                customer {
                  firstname
                  lastname
                  suffix
                  email
                  addresses {
                    firstname
                    lastname
                    street
                    city
                    region {
                      region_code
                      region
                    }
                    postcode      
                    telephone
                  }
                }
                customerOrders {
                  items {      
                    id
                    created_at
                    grand_total
                    status
                  }
                }
              }`, { headers: headers });
  }

  public mergeCarts(source_cart_id: string, destination_cart_id: string): Observable<any> {   
    return this.apollo
      .mutate<any>({
        mutation: gql`mutation($source_cart_id: String!, $destination_cart_id: String!) {
          mergeCarts(source_cart_id: $source_cart_id, destination_cart_id: $destination_cart_id) {
          items {
          id
          product {
          name
          sku
          }
          quantity
          }
          }
          }`,
        variables: {
          destination_cart_id: destination_cart_id,
          source_cart_id: source_cart_id
        }
      });
  }
}