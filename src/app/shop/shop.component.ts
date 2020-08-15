import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  
  public themeLogo: string = 'assets/images/riddleslogoblack.png';

  constructor() { }

  ngOnInit(): void {
  }

}
