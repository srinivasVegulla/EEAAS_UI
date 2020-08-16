import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as $ from 'jquery';
import { ApiService } from '../bare-metal/services/api.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

// export interface User {
//   value: string;
//   viewValue: string;
// }

export class AdminDashboardComponent implements OnInit {

  currentTab = 'device';

  constructor(
    private auth: AuthService,
    private webService: WebService,
    private AmCharts: AmChartsService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.webService.currentTab = 'Dashboard';
  }

  setDashboardTab(selectedTab) {
    this.currentTab = selectedTab;
  }
}
