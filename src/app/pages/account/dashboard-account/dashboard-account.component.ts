import { Component, OnInit, Input } from '@angular/core';
import { CustomerDetails } from '../../../shared/classes/customer';

@Component({
  selector: 'app-dashboard-account',
  templateUrl: './dashboard-account.component.html',
  styleUrls: ['./dashboard-account.component.scss']
})
export class DashboardAccountComponent implements OnInit {

    @Input() customerDetails: CustomerDetails;
    ngOnInit() {
        
    }
}