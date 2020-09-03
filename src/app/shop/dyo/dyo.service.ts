import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams   } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as jQuery from 'jquery';
import { Observable } from 'apollo-link';
@Injectable({
  providedIn: 'root'
})
export class DyoService {

  BASE_URL = environment.BASE_URL;
  BASE_URL_CDN = environment.DYO_BASE_MEDIA_URL;

  shapeOptions;
  engCount = [];
  iterCount = 0;

  constructor(
    private http: HttpClient
  ) { }

  getDesignYourProducts(sku) {

    this.getShapeOptions().subscribe((data: any)  => {
      this.shapeOptions = data;
    });
    return this.http.get(`${environment.product_base_url}product/getBaseDetail_new/${sku}`)
    .pipe(
        map( res => {
          if (res) {
              return res;
          }
        })
      );
  }

 getShapeOptions() {
  return this.http.get(`${environment.product_base_url}product/getStoneDropdownOptForFilter`)
  .pipe(
      map( res => {
        return res;
      }));
}


getStoneTotalQty(productInfo){
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < productInfo.custom_attributes.length; i++){
          // tslint:disable-next-line:variable-name
          const attr_code = productInfo.custom_attributes[i].attribute_code;
          if (attr_code === 'stone_qty'){
                  const El = productInfo.custom_attributes[i].value;
                  return (El);
              }
      }
}
getStoneShapeValue(label){
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < this.shapeOptions.StoneShape.length; i++){
  //  alert(`${this.shapeOptions.StoneShape[i].label} === ${label}`);
    if (this.shapeOptions.StoneShape[i].label === label){
          return this.shapeOptions.StoneShape[i].value;
        }
    }
}

getDefaultStoneShape(items){

  return this.getShapeByValue(items.stone_shape);
}
getShapeByValue(value){
  for (let i = 0; i < this.shapeOptions.StoneShape.length; i++){
      if (this.shapeOptions.StoneShape[i].value === value){
          return this.shapeOptions.StoneShape[i].label;
        }

    }
}

   getStoneList(label) {
 const stoneShapeValue =  this.getStoneShapeValue(label);
 const apiURL = `${environment.BASE_URL}productwebservice/DyoStone/searchdetail?stone_shape=${stoneShapeValue}&stone_view_dimension=2D&attribute_set_id=230&
 dyo_stone_type=${jQuery('#stoneType').val()}&display_order=ASC&order_option=attribute_set_id`;

 return this.http.get(apiURL)
  .pipe(
      map( res => {
        return res;
      }));
}
getContainerBoxSize() {
  const width = jQuery('#container2d').width();
  const height = jQuery('#container2d').height();
  const orgWidth = 768.00;
  const orgHeigth = 785.00;
  const widthRatio = (width) / (orgWidth);
  const heightRatio = (height) / (orgHeigth);
  const scale = Math.min(widthRatio, heightRatio);
  return {
      width,
      height,
      scale,
      orgWidth,
      orgHeigth
  };
}
/*getShapeByValue(value) {
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < this.shapeOptions.StoneShape.length; i++){
    if (this.shapeOptions.StoneShape[i].value === value){
        return this.shapeOptions.StoneShape[i].label;
      }

  }
}*/

getEngarving(productInfo){
    return  new Promise( (resolve, reject) => {
      productInfo.custom_attributes.forEach(element => {
        if (element.attribute_code === 'is_engaravable') {
          alert(element.value);
          if (element.value == 1) {
            let engDetails =  [];
            engDetails =  [];
            this.engCount = [];
            this.iterCount = 0;
            resolve(element.value)
            //const engarvingCount = this.hasEngravingCount(productInfo);
          }
        }
      });
    });
 }


getEngarvingD(productInfo){
  for (let i = 0; i < productInfo.custom_attributes.length; i++){
    // console.log(productInfo.custom_attributes[i].attribute_code === 'is_engaravable')
        if (productInfo.custom_attributes[i].attribute_code === 'is_engaravable'){
           
            if (productInfo.custom_attributes[i].value == 1){
           
                  let engDetails =  [];
                  engDetails =  [];
                  this.engCount = [];
                  this.iterCount = 0;
                const engarvingCount = this.hasEngravingCount(productInfo);
              
                for (let j = 0; j < engarvingCount.length; j++){
                     const iter =  j + 1;
                     const hasEng = 	this.getEngarvingDetails(iter, productInfo);
                     if (hasEng.status){
                           engDetails.push(hasEng);
                       }
                  }
                return engDetails;
              }
            break;
          }

      }
    }
    hasEngravingCount(productInfo){
      let iterCount = 0;
      iterCount = iterCount + 1;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < productInfo.custom_attributes.length; i++){
           const attribute_code = productInfo.custom_attributes[i].attribute_code;
           if (attribute_code === 'eng_pos' + iterCount + '_x'){
           this.engCount.push(attribute_code);
           iterCount++;
          }
      }
    
      return this.engCount;
    }
    getEngarvingDetails(iter, productInfo){
      const value =  'eng_pos' + iter + '_x';
      const isE =  {
        status: false,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        angle: 0,
        engravable_text: null,
        label: null,
        value: null,
        is_visible_on_front: null,
        default_frontend_label: null
      };
      for (let i = 0; i < productInfo.custom_attributes.length; i++){
        const attribute_code = productInfo.custom_attributes[i].attribute_code;
        const attribute_value = productInfo.custom_attributes[i].value;
        // if(attribute_code != value){
        isE.status =  true;

        if (attribute_code === 'eng_pos' + iter + '_x'){
              isE.x = attribute_value;
            }else if (attribute_code === 'eng_pos' + iter + '_y'){
              isE.y = attribute_value;

            }else if (attribute_code === 'eng_pos' + iter + '_width'){
              isE.width = attribute_value;
            }
            else if (attribute_code === 'eng_pos' + iter + '_height'){
              isE.height = attribute_value;
            }
            else if (attribute_code === 'eng_text' + iter + '_angle'){
              isE.angle = attribute_value;
              }
            else if (attribute_code === 'engravable_text' + iter){
              isE.engravable_text = attribute_value;
              isE.label = productInfo.custom_attributes[i].label;
              isE.value =  productInfo.custom_attributes[i].value;
              isE.is_visible_on_front =  productInfo.custom_attributes[i].is_visible_on_front;
              isE.default_frontend_label =  productInfo.custom_attributes[i].default_frontend_label;
              }
          }
      return isE;
        }
      
}
