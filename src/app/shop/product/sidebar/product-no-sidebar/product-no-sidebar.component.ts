import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import { Product } from '../../../../shared/classes/product';
import { cartRestApi } from '../../../../shared/classes/cartRestApi';
import { ProductService } from '../../../../shared/services/product.service';
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { environment } from '../../../../../environments/environment';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-no-sidebar',
  templateUrl: './product-no-sidebar.component.html',
  styleUrls: ['./product-no-sidebar.component.scss']
})
export class ProductNoSidebarComponent implements OnInit {

  public product: Product;
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public price: number;
  public specialPrice: number;
  public displayPrice: number;
  public finalPrice: number;
  public environment: any = environment;
  public isWarrantySelected: boolean = false;
  public productDescription: string;
  public formSubmitted: boolean = false;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  cartFormGroup: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router,
    public productService: ProductService) {
    //this.route.data.subscribe(response => this.product = response.data );   
  }

  ngOnInit(): void {
    this.productService.getProductBySku(this.route.snapshot.params.sku).subscribe(response => {

      this.product = response;
      let specialPriceAttr = this.product.custom_attributes.filter(c => c.attribute_code === 'special_price')[0];
      if(specialPriceAttr) {
        this.specialPrice = specialPriceAttr.value;
      }
      let productDescriptionAttr = this.product.custom_attributes.filter(f => f.attribute_code == 'short_description')[0];
      if(productDescriptionAttr) {
        this.productDescription = productDescriptionAttr.value;
      }
      this.displayPrice = parseFloat( this.product.display_price);
      this.price = this.product.price;
      this.finalPrice = parseFloat(this.product.display_price);
      let group = {}
      this.product.options.forEach(control => {
        group[control.option_id] = new FormControl('', control.is_require ? [Validators.required] : []);
      });
      this.cartFormGroup = new FormGroup(group);
    });
  }

  get formControls() { return this.cartFormGroup.controls; }

  changePrice() {
    this.finalPrice = parseFloat(this.product.display_price);
    console.log(this.cartFormGroup);
    this.product.options.forEach(option => {
      switch(option.type) {
        case 'checkbox':
          if(this.cartFormGroup.controls[option.option_id].value) {
            this.finalPrice += option.values[0].price;
          }
          break;
        case 'drop_down':
          if(this.cartFormGroup.controls[option.option_id].value) {
            this.finalPrice += option.values.filter(v => v.option_type_id == this.cartFormGroup.controls[option.option_id].value)[0].price;
          }
          break;
        case 'field':
          if(this.cartFormGroup.controls[option.option_id].value) {
            this.finalPrice += option.price;
          }
          break;
      }
    });
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
    }
    return uniqSize
  }

  selectSize(size) {
    this.selectedSize = size;
  }

  // Increament
  increment() {
    this.counter++;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter--;
  }

  // Add to cart
  async addToCart() {
    console.log(this.cartFormGroup);
    this.formSubmitted = true;
    if(!this.cartFormGroup.valid)
    return;
    let cart: cartRestApi.Cart = {};
    cart.cartItem = {};
    cart.cartItem.productOption = {};
    cart.cartItem.productOption.extensionAttributes = {};
    cart.cartItem.productOption.extensionAttributes.customOptions = [];

    cart.cartItem.sku = this.product.sku;
    cart.cartItem.quote_id = this.productService.getQuoteId();    
    cart.cartItem.qty = this.counter || 1;

    this.product.options.forEach(option => {
      switch(option.type) {
        case 'checkbox':
          if(this.cartFormGroup.controls[option.option_id].value) {
            cart.cartItem.productOption.extensionAttributes.customOptions.push({
              optionId: option.option_id.toString(),
              optionValue: option.values[0].option_type_id.toString()
            });
          }
          break;
        case 'drop_down':
          if(this.cartFormGroup.controls[option.option_id].value) {
            cart.cartItem.productOption.extensionAttributes.customOptions.push({
              optionId: option.option_id.toString(),
              optionValue: this.cartFormGroup.controls[option.option_id].value
            });
          }
          break;
        case 'field':
          if(this.cartFormGroup.controls[option.option_id].value) {
            cart.cartItem.productOption.extensionAttributes.customOptions.push({
              optionId: option.option_id.toString(),
              optionValue: this.cartFormGroup.controls[option.option_id].value
            });
          }
          break;
      }
    });
    await this.productService.addToCart(cart).subscribe((response) => {
      this.router.navigate(['/shop/cart']);
    });
      
  }
  

  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if (status)
      this.router.navigate(['/shop/checkout']);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

}
