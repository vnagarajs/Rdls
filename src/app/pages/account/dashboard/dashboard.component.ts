import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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
