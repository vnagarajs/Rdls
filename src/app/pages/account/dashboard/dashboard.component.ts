import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';
import { CustomerDetails } from '../../../shared/classes/customer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public openDashboard: boolean = false;
  dashboardTitle: string;
  selectedIndex: number;
  menus = [
    {
      "text": "My Account"
    },
    {
      "text": "My Orders"
    },
    {
      "text": "My Wish List"
    },
    {
      "text": "Address Book"
    },
    {
      "text": "Account Information"
    },
    {
      "text": "Store Credit"
    },
    {
      "text": "Stored Payment Methods"
    },
    {
      "text": "Gift Card"
    },
    {
      "text": "Reward Points"
    },
    {
      "text": "Gift Registry"
    },
    {
      "text": "Newsletter Subscriptions"
    },
    {
      "text": "My Invitations"
    }
  ]
  customerDetails: CustomerDetails;

  constructor(private accountService: AccountService) {
    this.accountService.getCustomerDetails().subscribe(response => {
      console.log(response);
      this.customerDetails = response.data; 
    });
   }

  ngOnInit(): void {
    this.dashboardTitle = "MY ACCOUNT";
    this.selectedIndex = 0;
  }

  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }

  select(index: number, title: string) {
    this.selectedIndex = index;
    this.dashboardTitle = title.toUpperCase();
  }
}
