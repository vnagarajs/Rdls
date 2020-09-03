import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order, OrderDetails, Shipping } from '../../../shared/classes/order';
import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit{

  public orderDetails : OrderDetails;
  public shippingDetails: Shipping;
  public dispalyOrderSuccessMsg: boolean = true;

  constructor(private route: ActivatedRoute,
    private orderService: OrderService, public productService: ProductService) {
      
     }

  ngOnInit(): void {	
    if(this.route.snapshot.paramMap.get('source') == 'myOrders') {
      this.dispalyOrderSuccessMsg = false;
    }
    this.orderService.getOrder(this.route.snapshot.params.orderId).subscribe(response => {
      console.log(response);
      this.orderDetails =  response;
      this.shippingDetails = response.extension_attributes.shipping_assignments[0].shipping;
    }); 
  }

  ngAfterViewInit() {
    
  }

}
