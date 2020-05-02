import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
//import { NgCircleProgressModule } from 'ng-circle-progress';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { ApiService } from '../bare-metal/services/api.service';
import * as _ from 'lodash';
/* 
declare var am4core: any;
declare var am4charts: any; */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-pmdashboard',
  templateUrl: './pmdashboard.component.html',
  styleUrls: ['./pmdashboard.component.css']
})
export class PmdashboardComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private webService: WebService,
    private AmCharts: AmChartsService,
    private api: ApiService
  ) { }
  _ = _;
  notis: any;
  pm_Info: any
  servicesInfo: any = [];
  avail_budget: any;
  used_budget: any;
  public chart: AmChart;
  usedamount;



  ngOnInit() {
    // this.temp();
    // this.serviceData();
    this.webService.Dashboard = true;
    this.webService.ReservationSystem = false;
    this.webService.myService = false;

    this.webService.Inventory = false;

    this.webService.devices = false;
    this.webService.ReservationList = false;
    // this.budget(10,90)
    //     this.webService.Dashboard=true;
    //     this.webService.myService=false;
    //  this.webService.devices=false;


    // new from here
    this.getdashboard();
    this.getNotifications();
    // this.budget(10, 90);
    this.loadPie();
    // this.loadAmcharts4Pie();
  }


  getNotifications() {
    this.api.getNotifications().subscribe(
      res => {
        console.log({ res });
        this.notis = _.take(res['request'], 10);
      }
    );
  }

  getdashboard() {
    //this.api.get
    this.api.getDashboardData().subscribe(
      res => {
        console.log({ res });
        this.servicesInfo = [
          {
            "name": "PENDING REQUESTS",
            "num_of_services": res['PM']['pending_requests'],
            "imagePath": "./assets/images/openstock_72x72.png",
            "color": "#76b6ff",
            "bordercolor": "#76b6ff"
          },
          {
            "name": "APPROVED REQUESTS",
            "tag_line": "(in last 7 days)",
            "num_of_services": res['PM']['approved_requests'],
            "imagePath": "./assets/images/kubernetes_VDEs_72x72.png",
            "color": "#fe9c3b",
            "bordercolor": "#fe9c3b"
          },
          {
            "name": "RESERVATIONS EXPIRING",
            "tag_line": "(in next 7 days)",
            "num_of_services": res['PM']['reservations_expiring'],
            "imagePath": "./assets/images/openstock_72x72.png",
            "color": "#e5cb14",
            "bordercolor": "#e5cb14"
          },
        ];
      }
    );
  }

  ngAfterViewInit() {
    // this.budget(10,90);
  }

  serviceData() {
    var data = { "login": JSON.parse(this.auth.data) };

    this.webService.getPMServiceData(data).subscribe(res => {
      this.pm_Info = res;
      console.log(this.pm_Info)
      this.servicesInfo = [
        {
          "name": "TOTAL BAREMETAL",
          "num_of_services": this.pm_Info.PM.bg_server_count,
          "imagePath": "./assets/images/openstock_72x72.png",
          "color": "#76b6ff",
          "bordercolor": "#76b6ff"
        },
        {
          "name": "AVAILABLE BAREMETAL",
          "num_of_services": this.pm_Info.PM.bg_server_free,
          "imagePath": "./assets/images/kubernetes_VDEs_72x72.png",
          "color": "#fe9c3b",
          "bordercolor": "#fe9c3b"
        },
        {
          "name": "VM PENDING REQUESTS",
          "num_of_services": this.pm_Info.PM.vm_pen_count,
          "imagePath": "./assets/images/openstock_72x72.png",
          "color": "#e5cb14",
          "bordercolor": "#e5cb14"
        },
        // {
        //   "name":"BIG IP SERVERS",
        //   "num_of_services":this.pm_Info.bg_server_count,
        //   "imagePath":"./assets/images/kubernetes_VDEs_72x72.png",
        //   "color" : "#e064e8",
        //   "bordercolor":"#e064e8"
        // },
        {
          "name": "RESERVED BAREMETAL SERVERS",
          "num_of_services": this.pm_Info.PM.bg_server_use,
          "imagePath": "./assets/images/kubernetes_VDEs_72x72.png",
          "color": "#e064e8",
          "bordercolor": "#e064e8"
        },
        // {
        //   "name":"OPENSTACK SERVICES",
        //   "num_of_services":this.pm_Info.openstack.services,
        //   "imagePath":"./assets/images/openstock_72x72.png",
        //   "color" : "#76b6ff",
        //   "bordercolor":"#76b6ff"
        // },
        // {
        //   "name":"OPENSTACK VDE's",
        //   "num_of_services":this.pm_Info.openstack.allocated_vdes,
        //   "imagePath":"./assets/images/kubernetes_VDEs_72x72.png",
        //   "color" : "#fe9c3b",
        //   "bordercolor":"#fe9c3b"
        // },
        // {
        //   "name":"KUBERNETES SERVICES",
        //   "num_of_services":this.pm_Info.kubernetes.services,
        //   "imagePath":"./assets/images/openstock_72x72.png",
        //   "color" : "#e5cb14",
        //   "bordercolor":"#e5cb14"
        // },
        // {
        //   "name":"KUBERNETES VDE's",
        //   "num_of_services":this.pm_Info.kubernetes.allocated_vdes,
        //   "imagePath":"./assets/images/kubernetes_VDEs_72x72.png",
        //   "color" : "#e064e8",
        //   "bordercolor":"#e064e8"
        // },
      ]
      //this.avail_budget=Math.floor((parseInt(this.pm_Info.openstack.project_info[0].avail_budget)/parseInt(this.pm_Info.openstack.project_info[0].total_budget))*100)
      //this.usedamount=(parseInt(this.pm_Info.openstack.project_info[0].total_budget)-parseInt(this.pm_Info.openstack.project_info[0].avail_budget))
      // this.avail_budget=Math.floor((parseInt(this.pm_Info.openstack.project_info[0].avail_budget)/parseInt(this.pm_Info.openstack.project_info[0].total_budget))*100)
      // this.usedamount=(parseInt(this.pm_Info.openstack.project_info[0].total_budget)-parseInt(this.pm_Info.openstack.project_info[0].avail_budget))
      // this.used_budget=100-parseInt(this.avail_budget)
      if (this.webService.storage) {
        // this.budget(5, 95)
      }
      else {
        // this.budget(10, 90)
      }
      //console.log(this.pm_Info)
    });
  }

  budget(avail, used, new_data?) {
    this.chart = this.AmCharts.makeChart("chartdiv", {
      "type": "pie",
      "labelRadius": 10,
      // "fontSize": 14,
      // "labelText": " ",
      "theme": "light",
      "startAngle": 177,
      "startDuration": 0,
      "labelTickColor": "white",
      "labelTickAlpha": 0.5,
      "outlineColor": "#232730",
      "dataProvider": [{
        "budgetType": "Servers",
        "percent": new_data.bare_metal || 0,
        "color": "#c4782d",
        "labelColor": "#ffffff",
        // "labelColor": "#ffffff",
      }, {
        "budgetType": "Switches",
        "percent": new_data.switch || 0,
        "color": "#2b92f1",
        "labelColor": "#ffffff",
        // "labelColor": "#ffffff",
      }, {
        "budgetType": "VDEs",
        "percent": new_data.VDE || 0,
        "color": " #34495e",
        "labelColor": "#ffffff",
        // "labelColor": "#ffffff",
      }, {
        "budgetType": "Services",
        "percent": new_data.service || 0,
        "color": " #8e44ad",
        "labelColor": "#ffffff",
        // "labelColor": "#ffffff",
      }],
      "valueField": "percent", "titleField": "budgetType",
      "colorField": "color",
      "legend": {
        "generateFromData": true,
        "align": "left",
        "color": '#ffffff',
        // "fontSize":12,

        //   "autoMargins":true,
        //  "useMarkerColorForLabels":true,
        //  "switchColor":"#3366CC",
        // "data":[{title: "Available Budget", color: "#c4782d",value:"$"+this.pm_Info.openstack.project_info[0].avail_budget},{title: "Used Budget", color: "#2b92f1",value:"$"+(parseInt(this.pm_Info.openstack.project_info[0].total_budget)-parseInt(this.pm_Info.openstack.project_info[0].avail_budget))}]
        "data": [{
          "budgetType": "Servers",
          "percent": new_data.bare_metal || 0,
          "color": "#c4782d",
          "labelColor": "#ffffff",
          // "labelColor": "#ffffff",
        }, {
          "budgetType": "Switches",
          "percent": new_data.switch || 0,
          "color": "#2b92f1",
          "labelColor": "#ffffff",
          // "labelColor": "#ffffff",
        }, {
          "budgetType": "VDEs",
          "percent": new_data.VDE || 0,
          "color": " #34495e",
          "labelColor": "#ffffff",
          // "labelColor": "#ffffff",
        }, {
          "budgetType": "Services",
          "percent": new_data.service || 0,
          "color": " #8e44ad",
          "labelColor": "#ffffff",
          // "labelColor": "#ffffff",
        }].filter((item) => item.percent).map((item) => { return { title: item.budgetType, color: item.color } }) // [{ title: "Available Billing", color: "#c4782d" }, { title: "Used Billing", color: "#2b92f1" }]
      },
      "labelColorField": "labelColor",
    });
  }
  doSomethingWithCurrentValue(event) {

  }

  loadPie() {
    let data = JSON.parse(this.auth.data);
    data['action'] = "read";
    console.log(data)
    // sample input  '{"login":{"job":true,"user_name":"Sam","role":"PM","user_id":"Sam","project_id":["NextGen"]},"action":"read"}'
    this.api.loadPie({ login: data }).subscribe(
      res => {
        let obj = {};
        console.log(this.api.getItem('project_id')[0]);
        let raw = res[this.api.getItem('project_id')[0]];
        obj = this.api.makePieData(raw);
        console.log("xxxxxxxxxxxx makePieData",obj)
        //  sample {
        //   switch: 22,
        //   bare_metal: 43,
        //   VDE: 978,
        //   laskdf: 23424,
        //   w342rsdf: 3434
        // }; //  this.api.getItem('project_id')[0];
        // Object.keys(raw).map((item) => {
        //   if (item == 'switch' || item == 'VDE' || item == 'bare_metal') obj[item] = raw[item];
        //   else {
        //     obj['service'] = obj['service'] ? obj['service'] + raw[item] : raw[item]
        //   }
        // });
        // this.budget(0, 0, obj);
        this.loadAmcharts4Pie(obj);
      },
      err => {
        console.log(err)
      }
    );
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

  temp() {
    this.servicesInfo = [
      {
        "name": "TOTAL BAREMETAL",
        "num_of_services": 1,
        "imagePath": "./assets/images/openstock_72x72.png",
        "color": "#76b6ff",
        "bordercolor": "#76b6ff"
      },
      {
        "name": "AVAILABLE BAREMETAL",
        "num_of_services": 2,
        "imagePath": "./assets/images/kubernetes_VDEs_72x72.png",
        "color": "#fe9c3b",
        "bordercolor": "#fe9c3b",
        "tag_line": "(in last 7 days)",
      },
      {
        "name": "VM PENDING REQUESTS",
        "num_of_services": 3,
        "imagePath": "./assets/images/openstock_72x72.png",
        "color": "#e5cb14",
        "bordercolor": "#e5cb14",
        "tag_line": "(in last 7 days)",
      },
      // {
      //   "name":"BIG IP SERVERS",
      //   "num_of_services":this.pm_Info.bg_server_count,
      //   "imagePath":"./assets/images/kubernetes_VDEs_72x72.png",
      //   "color" : "#e064e8",
      //   "bordercolor":"#e064e8"
      // },
      {
        "name": "RESERVED BAREMETAL SERVERS",
        "num_of_services": 4,
        "imagePath": "./assets/images/kubernetes_VDEs_72x72.png",
        "color": "#e064e8",
        "bordercolor": "#e064e8"
      },
      // {
      //   "name":"OPENSTACK SERVICES",
      //   "num_of_services":this.pm_Info.openstack.services,
      //   "imagePath":"./assets/images/openstock_72x72.png",
      //   "color" : "#76b6ff",
      //   "bordercolor":"#76b6ff"
      // },
      // {
      //   "name":"OPENSTACK VDE's",
      //   "num_of_services":this.pm_Info.openstack.allocated_vdes,
      //   "imagePath":"./assets/images/kubernetes_VDEs_72x72.png",
      //   "color" : "#fe9c3b",
      //   "bordercolor":"#fe9c3b"
      // },
      // {
      //   "name":"KUBERNETES SERVICES",
      //   "num_of_services":this.pm_Info.kubernetes.services,
      //   "imagePath":"./assets/images/openstock_72x72.png",
      //   "color" : "#e5cb14",
      //   "bordercolor":"#e5cb14"
      // },
      // {
      //   "name":"KUBERNETES VDE's",
      //   "num_of_services":this.pm_Info.kubernetes.allocated_vdes,
      //   "imagePath":"./assets/images/kubernetes_VDEs_72x72.png",
      //   "color" : "#e064e8",
      //   "bordercolor":"#e064e8"
      // },
    ]
  }

  loadAmcharts4Pie(data: Object) {
    // am4core.useTheme(am4themes_animated);
    // Themes end
    console.log(data)
    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    let array = [];
    Object.keys(data).map((key) => {
      if (data[key])
        array.push({ service: this.api.humanize(key), value: data[key], color: am4core.color(this.api.getColor4Pie(key)) })
    })
    // Add data
    chart.data = array;
    //  [{
    //   "country": "Lithuania",
    //   "litres": 501.9
    // }, {
    //   "country": "Czechia",
    //   "litres": 301.9
    // }, {
    //   "country": "Ireland",
    //   "litres": 201.1
    // }, {
    //   "country": "Germany",
    //   "litres": 165.8
    // },];


    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "service";

    pieSeries.ticks.template.disabled = true;
    pieSeries.alignLabels = false;
    pieSeries.labels.template.text = "{value}";
    pieSeries.labels.template.fontSize = 20;
    pieSeries.labels.template.radius = am4core.percent(-40);
    pieSeries.labels.template.fill = am4core.color("white");
    pieSeries.slices.template.propertyFields.fill = "color";
    // pieSeries.labels.template.relativeRotation = 90;


    chart.legend = new am4charts.Legend();
    chart.legend.valueLabels.template.text = ""; // {value.value}
    chart.legend.valueLabels.template.fill = am4core.color("white");
    pieSeries.legendSettings.labelText = "[white]{category}[/]";

    // Add and configure Series
    // var pieSeries = chart.series.push(new am4charts.PieSeries());
    // pieSeries.dataFields.value = "litres";
    // pieSeries.dataFields.category = "country";
    // pieSeries.slices.template.stroke = am4core.color("#fff");
    // pieSeries.slices.template.strokeWidth = 2;
    // pieSeries.slices.template.strokeOpacity = 1;

    // // This creates initial animation
    // pieSeries.hiddenState.properties.opacity = 1;
    // pieSeries.hiddenState.properties.endAngle = -90;
    // pieSeries.hiddenState.properties.startAngle = -90;

    // // pieSeries.ticks.template.disabled = true;
    // // pieSeries.alignLabels = false;

    // pieSeries.labels.template.text = "{category}: {value.value}";
    // pieSeries.labels.template.fill = am4core.color("white");
    // pieSeries.labels.template.relativeRotation = 90;
    this.api.hideAmchartsIcon()
  }
}
