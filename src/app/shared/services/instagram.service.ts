import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  // Initialize
  constructor(private http: HttpClient) { }

  // Instagram Array
  public get getInstagramData() {
    return this.http.get(`https://graph.instagram.com/me/media?fields=id,media_url,media_type,caption,permalink&access_token=${environment.instagram_token}&q=redmi`);
  }

}
