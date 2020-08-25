import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams   } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  BASE_URL = environment.BASE_URL;
 
  constructor(
    private http: HttpClient
  ) { }

  getHomePageData() {

    let params = new HttpParams();
    params = params.append('query', `{
      cmsBlocks(identifiers: "New Theme Home Page") {
      items {
      identifier
      title
      content
      }
      }
      }`);


    
    return this.http.get(`${this.BASE_URL}graphql`, {params})
    .pipe(
        map( res => {
          if (res) {
              console.log();
              if (res['data'].cmsBlocks.items[0].content) {
                  return this.removeTags(res['data'].cmsBlocks.items[0].content)
              }
          }
        })
      );
}

getBestSellingProducts(bestSellingPro) {
  let params = new HttpParams();
  params = params.append('query', `{
    products(filter:{sku:{in: ${bestSellingPro}}}pageSize:20currentPage:1){
    items
    {
      attribute_set_id
      name
      sku
      type_id
      price{
        regularPrice{
          amount{
            value
            currency
            }
        }
      }
      special_price
      tier_price
      promotional_tag
      country_of_manufacture
      image{
       label
       url
      }
    }
    }
    }`);

    
  return this.http.get(`${this.BASE_URL}graphql`, {params})
    .pipe(
        map( res => {
          if (res) {
            return res;
           
          }
        })
      );

}
 removeTags(str) {
    if ((str === null) || (str === ''))  {
        return false;
      }
    else {
        str = str.toString();
      }

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}
}
