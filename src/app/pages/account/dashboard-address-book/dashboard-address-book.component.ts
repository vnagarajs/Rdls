import { Component, OnInit, Input } from '@angular/core';
import { CustomerDetails } from '../../../shared/classes/customer';

@Component({
  selector: 'app-dashboard-address-book',
  templateUrl: './dashboard-address-book.component.html',
  styleUrls: ['./dashboard-address-book.component.scss']
})
export class DashboardAddressBookComponent implements OnInit {

    @Input() customerDetails: CustomerDetails;
    ngOnInit() {
        console.log(this.customerDetails);
    }
}