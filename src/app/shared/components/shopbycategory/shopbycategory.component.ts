import { Component, OnInit, Input } from '@angular/core';
import { CollectionSlider } from '../../../shared/data/slider';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-shopbycategory',
  templateUrl: './shopbycategory.component.html',
  styleUrls: ['./shopbycategory.component.scss']
})
export class ShopbycategoryComponent implements OnInit {

  @Input() categories;
  @Input() class: string;
  BaseImagePath =  environment.featureCategoryImageBaseURL;
 public CollectionSliderConfig: any = CollectionSlider;
  constructor() { }

  ngOnInit(): void {
  }

}
