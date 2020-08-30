import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrls: ['./dashboard-orders.component.scss']
})
export class DashboardOrdersComponent implements OnInit {
    config: any;
    collection = { count: 60, data: [] };

    totalRecords: Number;
    page: Number=1;

    ngOnInit() {
        this.collection.data.push(
            {
                orderid: "000000046",
                orderdate: "8/29/20",
                shipto: "sadagopan m",
                ordertotal: "$4,558.10",
                status: "New Orders"
            });
        this.collection.data.push(
            {
                orderid: "000000050",
                orderdate: "8/30/20",
                shipto: "sadagopan m",
                ordertotal: "$5,558.10",
                status: "New Orders"
            });
        
        this.totalRecords = this.collection.data.length;
        this.config = {
            id: 'pagination_orders',
            itemsPerPage: 5,
            currentPage: this.page,
            totalItems: this.totalRecords
        };
    }

    pageChanged(event) {
        this.config.currentPage = event;
    }
}