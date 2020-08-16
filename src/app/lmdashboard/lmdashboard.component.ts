import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
//import { NgCircleProgressModule } from 'ng-circle-progress';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
// import * as am4core from "amcharts4-master/dist/es2015/core";
// import * as am4charts from "amcharts4-master/dist/es2015/charts";
// import am4themes_animated from 'amcharts4-master/dist/es2015/themes/animated';
// am4core.useTheme(am4themes_animated);
/* declare var am4core;
declare var am4charts; */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
declare var _;
// declare var am4themes_animated;
// am4core.useTheme(am4themes_animated);
import { ApiService } from '../bare-metal/services/api.service';

@Component({
  selector: 'app-lmdashboard',
  templateUrl: './lmdashboard.component.html',
  styleUrls: ['./lmdashboard.component.scss']
})
export class LmdashboardComponent implements OnInit {
  data_pie: Object; //  = { list: [{ bare_metal: 22, switch: 23, VDE: 39, service: 44 }, { bare_metal: 44, switch: 63, VDE: 76, service: 4 }] } // : any;
  constructor(private auth: AuthService, private webService: WebService,
    private AmCharts: AmChartsService,
    private api: ApiService) { }
  pm_Info: any
  servicesInfo: any = [];
  avail_budget: any;
  used_budget: any;
  public chart: AmChart;
  usedamount;


  serviceData() {
    var data = { "login": JSON.parse(this.auth.data) };

    this.webService.getPMServiceData(data).subscribe(res => {
      this.pm_Info = res;
      console.log(this.pm_Info)
      this.servicesInfo = [
        {
          "name": "TOTAL BAREMETAL's",
          "num_of_services": this.pm_Info.LM.bg_server_count,
          "imagePath": "./assets/images/openstock_72x72.png",
          "color": "#76b6ff",
          "bordercolor": "#76b6ff"
        },
        {
          "name": "AVAILABLE BAREMETAL",
          "num_of_services": this.pm_Info.LM.bg_server_free,
          "imagePath": "./assets/images/kubernetes_VDEs_72x72.png",
          "color": "#fe9c3b",
          "bordercolor": "#fe9c3b"
        },
        {
          "name": "VM PENDING REQUESTS",
          "num_of_services": this.pm_Info.LM.vm_pen_count,
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
          "num_of_services": this.pm_Info.LM.bg_server_use,
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
        this.budget(5, 95)
      }
      else {
        this.budget(10, 90)
      }
      //console.log(this.pm_Info)
    });
  }

  budget(avail, used) {
    console.log("budget")
    this.chart = this.AmCharts.makeChart("chartdiv", {
      "type": "pie",
      "labelRadius": 10,
      // "fontSize": 14,
      "labelText": " ",
      "theme": "light",
      "startAngle": 177,
      "startDuration": 0,
      "labelTickColor": "white",
      "labelTickAlpha": 0.5,
      "outlineColor": "#232730",
      "dataProvider": [{
        "budgetType": "Available Billing",
        "percent": avail,
        "color": "#c4782d",
        "labelColor": "#ffffff",
        // "labelColor": "#ffffff",
      }, {
        "budgetType": "Used Billing",
        "percent": used,
        "color": "#2b92f1",
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
        "data": [{ title: "Available Billing", color: "#c4782d" }, { title: "Used Billing", color: "#2b92f1" }]
      },
      "labelColorField": "labelColor",
    });
  }
  doSomethingWithCurrentValue(event) {

  }

  ngOnInit() {
    this.loadBarChart();
    this.loadPie();
    this.serviceData();
    this.webService.currentTab = 'LMDashboard';
  }
  ngAfterViewInit() {
    // this.budget(10,90)

  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

  loadBarChart() {
    this.api.loadLmBarChart().subscribe(
      res => {
        console.log({ res });
        // Create chart instance
        let chart = am4core.create("chartdiv_bar", am4charts.XYChart);
        let projectsArray = res['project'];
        projectsArray = projectsArray.slice(0, 12);
        // Add data
        chart.data = projectsArray.map((item) => {
          return {
            project: item.project_name.substr(0, 9),
            used: item.reserve_budget,
            available: item.avail_budget
          }
        });
        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "project";
        categoryAxis.title.text = "Projects";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "Budget ($)";

        // Create series
        function createSeries(field, name, stacked, color?) {
          let series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "project";
          series.name = name;
          if (color) {
            series.columns.template.fill = am4core.color(color);
            series.stroke = am4core.color(color);
          }
          series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
          series.stacked = stacked;

          series.columns.template.width = am4core.percent(30);
        }

        function example() {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = "litres";
          series.dataFields.categoryX = "country";
          series.name = "Sales";
          series.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
          series.columns.template.fill = am4core.color("#104547");
          console.log({ chart_data: chart.data })
        }


        createSeries("used", "Used", false, "#d65db1");
        createSeries("available", "Allocated", true);

        // Add legend
        // chart.legend = new am4charts.Legend();
        chart.legend = new am4charts.Legend();
        this.api.hideAmchartsIcon()
      },
      err => {
        console.log({ err });
      }
    );


  }

  loadPie_n(new_data) {
    let list = [{ bare_metal: 22, switch: 23, VDE: 39, service: 44 }, { bare_metal: 44, switch: 63, VDE: 76, service: 11 }]
    list.map((item, i) => {
      this.chart = this.AmCharts.makeChart("pie" + (i + 1), {
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
          "percent": item.bare_metal || 0,
          "color": "#c4782d",
          "labelColor": "#ffffff",
          // "labelColor": "#ffffff",
        }, {
          "budgetType": "Switches",
          "percent": item.switch || 0,
          "color": "#2b92f1",
          "labelColor": "#ffffff",
          // "labelColor": "#ffffff",
        }, {
          "budgetType": "VDEs",
          "percent": item.VDE || 0,
          "color": " #34495e",
          "labelColor": "#ffffff",
          // "labelColor": "#ffffff",
        }, {
          "budgetType": "Services",
          "percent": item.service || 0,
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
            "percent": item.bare_metal || 0,
            "color": "#c4782d",
            "labelColor": "#ffffff",
            // "labelColor": "#ffffff",
          }, {
            "budgetType": "Switches",
            "percent": item.switch || 0,
            "color": "#2b92f1",
            "labelColor": "#ffffff",
            // "labelColor": "#ffffff",
          }, {
            "budgetType": "VDEs",
            "percent": item.VDE || 0,
            "color": " #34495e",
            "labelColor": "#ffffff",
            // "labelColor": "#ffffff",
          }, {
            "budgetType": "Services",
            "percent": item.service || 0,
            "color": " #8e44ad",
            "labelColor": "#ffffff",
            // "labelColor": "#ffffff",
          }].filter((item) => item.percent).map((item) => { return { title: item.budgetType, color: item.color } }) // [{ title: "Available Billing", color: "#c4782d" }, { title: "Used Billing", color: "#2b92f1" }]
        },
        "labelColorField": "labelColor",
      });
    });

  }

  loadPie() {
    let data = JSON.parse(this.auth.data);
    data['action'] = "read";
    console.log(data)
    // sample input  '{"login":{"job":true,"user_name":"Sam","role":"PM","user_id":"Sam","project_id":["NextGen"]},"action":"read"}'
    this.api.loadPie({ login: data }).subscribe(
      res => {
        let obj = {};
        console.log({ res });
        Object.keys(res).map((item) => {
          obj[item] = this.api.makePieData(res[item])
        });

        this.data_pie = obj;
        //  {
        //   NextGen: {
        //     bare_metal: 33,
        //     service: 10
        //   },
        //   IOT: {
        //     bare_metal: 22,
        //     service: 48
        //   },
        //   IOO: {
        //     bare_metal: 22,
        //     service: 48
        //   },
        //   NextGen2: {
        //     bare_metal: 33,
        //     service: 10
        //   },
        //   IOT2: {
        //     bare_metal: 22,
        //     service: 48
        //   },
        //   IOO2: {
        //     bare_metal: 22,
        //     service: 48
        //   }
        // } //  obj;


        // this.loadPie_n(" sdfsdf");
      },
      err => {
        console.log({ err })
      });
  }
}
