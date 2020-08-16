import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ApiService } from '../bare-metal/services/api.service';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-device-overview',
  templateUrl: './device-overview.component.html',
  styleUrls: ['./device-overview.component.scss']
})
export class DeviceOverviewComponent implements OnInit {

  private chart;
  requestPieChart;
  barChart;
  stackedBarChart;
  currentTab = 'lowest';

  constructor(
    private api: ApiService,
    private AmCharts: AmChartsService,
  ) { }

  ngOnInit() {
    this.getDeviceOverViewPie();
    this.getRecentActivityPie();
    this.getBarChart();
    this.getStackedBarChart();

  }
  getDeviceOverViewPie() {
    let chart = am4core.create(
      "chartdivPie",
      am4charts.PieChart
    );

    chart.data = [{
      "status": "Available",
      "quantity": 6,
      "color": 'green'
    }, {
      "status": "Reserved",
      "quantity": 14,
      "color": 'grey'
    }];

    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "quantity";
    pieSeries.dataFields.category = "status";
    pieSeries.slices.template.propertyFields.fill = "color";

    pieSeries.ticks.template.disabled = true;
    pieSeries.alignLabels = false;

    pieSeries.labels.template.text = "{value}";
    pieSeries.labels.template.fontSize = 20;
    pieSeries.labels.template.radius = am4core.percent(-40);
    pieSeries.labels.template.fill = am4core.color("white");

    // Adding a legend to a Pie chart
    chart.legend = new am4charts.Legend();
    chart.legend.valueLabels.template.text = ""; // {value.value}
    chart.legend.valueLabels.template.fill = am4core.color("black");
    chart.legend.position = 'right';
    pieSeries.legendSettings.labelText = "{category}";

    this.api.hideAmchartsIcon();
  }
  getRecentActivityPie() {
    let requestPieChart = am4core.create(
      "chartdivRecentPie",
      am4charts.PieChart3D
    );

    requestPieChart.data = [{
      "status": "Pending",
      "quantity": 50,
      "color": 'skyblue'
    }, {
      "status": "Approved",
      "quantity": 20,
      "color": 'green'
    }, {
      "status": "Rejected",
      "quantity": 10,
      "color": 'red'
    }];

    let pieSeries = requestPieChart.series.push(new am4charts.PieSeries3D());
    pieSeries.dataFields.value = "quantity";
    pieSeries.dataFields.category = "status";
    pieSeries.slices.template.propertyFields.fill = "color";

    pieSeries.ticks.template.disabled = true;
    pieSeries.alignLabels = false;

    pieSeries.labels.template.text = "{value}";
    pieSeries.labels.template.fontSize = 20;
    pieSeries.labels.template.radius = am4core.percent(-40);
    pieSeries.labels.template.fill = am4core.color("white");

    // Adding a legend to a Pie requestPieChart
    requestPieChart.legend = new am4charts.Legend();
    requestPieChart.legend.valueLabels.template.text = ""; // {value.value}
    requestPieChart.legend.valueLabels.template.fill = am4core.color("black");
    pieSeries.legendSettings.labelText = "{category}";
    requestPieChart.legend.position = 'right';

    this.api.hideAmchartsIcon();

  }
  getBarChart() {
    let barChart = am4core.create("chartdivBar", am4charts.XYChart);
    barChart.data = [{
      "device": "BootLoader",
      "utilization": 8,
      "nonUtilized": 92,
    }, {
      "device": "CanOE",
      "utilization": 13,
      "nonUtilized": 87,
    }, {
      "device": "Webcam",
      "utilization": 19,
      "nonUtilized": 81,
    }, {
      "device": "Energia",
      "utilization": 25,
      "nonUtilized": 75,
    }, {
      "device": "Arduino",
      "utilization": 31,
      "nonUtilized": 69,
    }, {
      "device": "Canape",
      "utilization": 36,
      "nonUtilized": 64,
    }, {
      "device": "Moto G7",
      "utilization": 42,
      "nonUtilized": 58,
    }];

    // Create axes
    let categoryAxis = barChart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "device";
    categoryAxis.title.text = "Devices";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 5;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    let valueAxis = barChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.title.text = "Utilization %";

    createSeries("utilization", "Utilization", true, "#8B4513");
    createSeries("nonUtilized", "Non Utilization", true, "grey");

    function createSeries(field, name, stacked, color?) {
      let series = barChart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "device";
      series.name = name;
      if (color) {
        series.columns.template.fill = am4core.color(color);
        series.stroke = am4core.color(color);
      }
      series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]%";
      series.stacked = stacked;

      series.columns.template.width = am4core.percent(30);
    }

    // Add legend
    // chart.legend = new am4charts.Legend();
    barChart.legend = new am4charts.Legend();
    barChart.legend.maxHeight = 20;
    this.api.hideAmchartsIcon()

  }
  getStackedBarChart() {
    let stackedBarChart = am4core.create("chartdivStackedBar", am4charts.XYChart);
    stackedBarChart.data = [{
      "device": "BootLoader",
      "requestTime": 16,
      "availableTime": 12
    }, {
      "device": "CanOE",
      "requestTime": 8,
      "availableTime": 6
    }, {
      "device": "Webcam",
      "requestTime": 5,
      "availableTime": 9
    }, {
      "device": "Energia",
      "requestTime": 20,
      "availableTime": 10
    }];

    // Create axes
    let categoryAxis = stackedBarChart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "device";
    categoryAxis.title.text = "Devices";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 5;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    let valueAxis = stackedBarChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.title.text = "Time (In Hours)";

    createSeries("requestTime", "Request Time", false, "#8B4513");
    createSeries("availableTime", "Available Time", false, '#696969');

    function createSeries(field, name, stacked, color?) {
      let series = stackedBarChart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "device";
      series.name = name;
      if (color) {
        series.columns.template.fill = am4core.color(color);
        series.stroke = am4core.color(color);
      }
      series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]Hrs";
      series.stacked = stacked;

      series.columns.template.width = am4core.percent(30);
    }

    // Add legend
    // chart.legend = new am4charts.Legend();
    stackedBarChart.legend = new am4charts.Legend();
    stackedBarChart.legend.maxHeight = 20;
    this.api.hideAmchartsIcon();
  }

  tableDataHigh = [{
    "deviceName": "CanOe",
    "deviceFeature": "Data",
    "idleHrs": "20"
  }, {
    "deviceName": "Canape",
    "deviceFeature": "Data",
    "idleHrs": "24"
  }, {
    "deviceName": "Energia",
    "deviceFeature": "Data",
    "idleHrs": "34"
  }, {
    "deviceName": "Rasberry_Pi",
    "deviceFeature": "Data",
    "idleHrs": "12"
  }, {
    "deviceName": "CanOe 4",
    "deviceFeature": "Data",
    "idleHrs": "67"
  }, {
    "deviceName": "Canlyzer",
    "deviceFeature": "Data",
    "idleHrs": "62"
  }, {
    "deviceName": "WebCam",
    "deviceFeature": "Data",
    "idleHrs": "36"
  }, {
    "deviceName": "CanOe 4",
    "deviceFeature": "Data",
    "idleHrs": "15"
  }];
  tableDataLow = [{
    "deviceName": "Arduino",
    "deviceFeature": "Data",
    "idleHrs": "39"
  }, {
    "deviceName": "Boot Loader",
    "deviceFeature": "Data",
    "idleHrs": "46"
  }, {
    "deviceName": "CanOe 2",
    "deviceFeature": "Data",
    "idleHrs": "12"
  }];

  tableData = this.tableDataLow;
  showMinTableData = this.tableData.slice(0, 5);

  setTab(tabVal) {
    this.currentTab = tabVal;
    this.tableData = (tabVal == 'lowest') ? (this.tableDataLow) : this.tableDataHigh;
    this.showMinTableData = this.tableData.slice(0, 5);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
    if (this.barChart) {
      this.AmCharts.destroyChart(this.barChart);
    }
    if (this.stackedBarChart) {
      this.AmCharts.destroyChart(this.stackedBarChart);
    }
    if (this.requestPieChart) {
      this.AmCharts.destroyChart(this.requestPieChart);
    }
  }

}
