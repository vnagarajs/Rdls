import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams   } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  HOME_PAGE_DATA_API = 'https://28pkqk84wgmimmok.mojostratus.io/API/HomeSecGraphqlWeb.php';
  constructor(
    private http: HttpClient
  ) { }

  getHomePageData() {
    return this.http.get<any>(this.HOME_PAGE_DATA_API)
    .pipe(
        map( res => {
          if (res) {
            return res;
          }
        })
      );
}
}
