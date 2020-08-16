import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as $ from 'jquery';
import { ApiService } from '../bare-metal/services/api.service';

@Component({
  selector: 'app-device-usage-chart',
  templateUrl: './device-usage-chart.component.html',
  styleUrls: ['./device-usage-chart.component.scss']
})

export class DeviceUsageChartComponent implements OnInit {
  data_pie: any;
  public chart: AmChart;

  constructor(
    private auth: AuthService,
    private webService: WebService,
    private AmCharts: AmChartsService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.loadPie();
    // this.loadBarChart();
    this.webService.currentTab = 'Dashboard';
  }
  listOfDevices;

  loadPie() {
    this.api.loadPie({ login: JSON.parse(this.auth.data) }).subscribe(
      res => {
        let obj = {};
        console.log({ res });
        Object.keys(res).map((item) => {
          obj[item] = this.api.makePieData(res[item])
        });

        this.data_pie = obj;
      }
    );
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

  ngAfterViewInit() {

  }

  loadBarChart() {
    this.webService.getAssetsUsageBar().subscribe(
      res => {
        // Create chart instance
        let prj: any = [];
        prj = res;
        this.listOfDevices = res;
        let chart = am4core.create("chartdiv_device", am4charts.XYChart);
        // Add data
        chart.data = this.listOfDevices.map((item) => {
          return {
            project: item.name,  //.substr(0, 9)
            hours_reserved: item.hours_reserved,
            hours_used: item.hours_used
          }
        });
        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "project";
        categoryAxis.title.text = "Devices";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "Hours";

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


        createSeries("hours_reserved", "Hours Reserved", false, "#d65db1");
        createSeries("hours_used", "Hours Used", false);

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




}
