import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  logedInUserRole;

  constructor(
    private auth: AuthService,
    private webService: WebService,
    private router: Router
  ) { }

  links = [];
  linksObject = {
    "PM": [
      {
        "linkUrl": "/home/dashboard",
        "compare": "Dashboard",
        "displayName": "Dashboard",
        "imgSrc": "./assets/images/dashboard.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      },
      {
        "linkUrl": "/home/dashboard/serverlist",
        "compare": "ReservationSystem",
        "displayName": "Hardware reservation",
        "imgSrc": "./assets/images/reservationsystem.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      },
      {
        "linkUrl": "",
        "compare": "labs",
        "displayName": "Labs",
        "imgSrc": "./assets/images/labs.png",
        "isDropdownLISTAvailable": true,
        "dropDownList": [
          {
            "linkUrl": "/home/dashboard/lab1",
            "displayName": "ODC 3"
          },
          {
            "linkUrl": "/home/dashboard/lab2",
            "displayName": "ODC 1"
          },
        ]
      },
      {
        "linkUrl": "/home/dashboard/inventory",
        "compare": "devices",
        "displayName": "Catalogue",
        "imgSrc": "./assets/images/devices.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      },
      {
        "linkUrl": "/home/dashboard/Myservices/NewRequest",
        "compare": "myService",
        "displayName": "VM reservation",
        "imgSrc": "./assets/images/services.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      },
      {
        "linkUrl": "/home/dashboard/my-reservations",
        "compare": "ReservationList",
        "displayName": " My Reservations",
        "imgSrc": "./assets/images/orders.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      }
    ],
    "Admin": [
      {
        "linkUrl": "/home/AdminDashboard",
        "compare": "Dashboard",
        "displayName": "Dashboard",
        "imgSrc": "./assets/images/dashboard.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      },
      {
        "linkUrl": "",
        "compare": "labs",
        "displayName": "Labs",
        "imgSrc": "./assets/images/labs.png",
        "isDropdownLISTAvailable": true,
        "dropDownList": [
          {
            "linkUrl": "/home/AdminDashboard/lab1",
            "displayName": "ODC 3"
          },
          {
            "linkUrl": "/home/AdminDashboard/lab2",
            "displayName": "ODC 1"
          },
        ]
      },
      {
        "linkUrl": "/home/AdminDashboard/DesignerDashboard",
        "compare": "catalogue",
        "displayName": "Catalogue",
        "imgSrc": "./assets/images/devices.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      },

      {
        "linkUrl": "/home/AdminDashboard/orders",
        "compare": "orders",
        "displayName": "Requests",
        "imgSrc": "./assets/images/orders.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      },
      {
        "linkUrl": "",
        "compare": "reports",
        "displayName": "Reports",
        "imgSrc": "./assets/images/reports.png",
        "isDropdownLISTAvailable": true,
        "dropDownList": [
          {
            "linkUrl": "/home/AdminDashboard/Billing",
            "displayName": "Billing"
          },
          {
            "linkUrl": "/home/AdminDashboard/Utilization",
            "displayName": "Utilization"
          },
        ]
      },
      {
        "linkUrl": "/home/AdminDashboard/devices",
        "compare": "Assets",
        "displayName": "Devices",
        "imgSrc": "./assets/images/users.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      },
      {
        "linkUrl": "/home/AdminDashboard/users",
        "compare": "USERS",
        "displayName": "Users",
        "imgSrc": "./assets/images/users.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      },
      /* {
        "linkUrl": "/home/AdminDashboard/calendar",
        "compare": "calendar",
        "displayName": "Calendar",
        "imgSrc": "./assets/images/users.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      }, */
      /* {
        "linkUrl": "/home/AdminDashboard/holidays",
        "compare": "holidays",
        "displayName": "Holidays",
        "imgSrc": "./assets/images/users.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      } */
    ],
    "LM": [
      {
        "linkUrl": "/home/lmdashboard",
        "compare": "LMDashboard",
        "displayName": "Dashboard",
        "imgSrc": "./assets/images/dashboard.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      },
      {
        "linkUrl": "",
        "compare": "labs",
        "displayName": "Labs",
        "imgSrc": "./assets/images/labs.png",
        "isDropdownLISTAvailable": true,
        "dropDownList": [
          {
            "linkUrl": "/home/lmdashboard/lab1",
            "displayName": "ODC 3"
          },
          {
            "linkUrl": "/home/lmdashboard/lab2",
            "displayName": "ODC 1"
          },
        ]
      },
      {
        "linkUrl": "/home/lmdashboard/catalogue",
        "compare": "catalogue",
        "displayName": "Catalogue",
        "imgSrc": "./assets/images/devices.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      },
      {
        "linkUrl": "/home/lmdashboard/orders",
        "compare": "orders",
        "displayName": "Requests",
        "imgSrc": "./assets/images/orders.png",
        "isDropdownLISTAvailable": false,
        "dropDownList": []
      },
      {
        "linkUrl": "",
        "compare": "reports",
        "displayName": "Reports",
        "imgSrc": "./assets/images/reports.png",
        "isDropdownLISTAvailable": true,
        "dropDownList": [
          {
            "linkUrl": "/home/lmdashboard/Billing",
            "displayName": "Billing"
          }
        ]
      },
    ],
  };

  ngOnInit() {
    this.logedInUserRole = this.auth.role;
    this.links = this.linksObject[this.logedInUserRole];
  }

}
