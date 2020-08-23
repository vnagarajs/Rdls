import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductSlider, CollectionSlider, BannerSlider } from '../../shared/data/slider';
import { Product } from '../../shared/classes/product';
import { ProductService } from '../../shared/services/product.service';
import { HomepageService } from '../../shared/services/homepage.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnDestroy {

  public themeLogo: string = 'assets/images/riddleslogoblack.png'; // Change Logo
  
  public products: Product[] = [];
  public productCollections: any[] = [];

  public ProductSliderConfig: any = ProductSlider;
  public CollectionSliderConfig: any = CollectionSlider;

  public homePagefeaturedCategory: any [] = [];
  public bannersliders: any[] = [];
  public bannerslidersMobile: any[] = [];
  public bestSellingProducts: any[] = [];
  public fineJewelry: any[] = [];
  public HomePageBannerSlider: any =  BannerSlider;
  public storySectionOne: any[] = [];
  public storySectionTwo: any[] = [];

  bannerBaseImagePath = environment.homePageBannerImageBaseURL;


  constructor(
    private _sanitizer:DomSanitizer,
    public productService: ProductService,
    public homePageService: HomepageService
    ) {
  
  }

  

  ngOnInit(): void {
    // Change color for this layout
    document.documentElement.style.setProperty('--theme-deafult', '#e4604a');

    this.homePageService.getHomePageData().subscribe((data: any)  => {
     
      data = JSON.parse(data);
      this.bannersliders = data.Slider;
      this.bannerslidersMobile = data.Slider;
      this.bestSellingProducts = data.featuredProducts;
      this.homePagefeaturedCategory =  data.Shop_By_Style;
      this.fineJewelry = data.Fine_Jewelry;
      this.storySectionOne = data.Story_Section_1;
      this.storySectionTwo = data.Story_Section_2;
});

  }

  ngOnDestroy(): void {
    // Remove Color
    document.documentElement.style.removeProperty('--theme-deafult');
  }


}
