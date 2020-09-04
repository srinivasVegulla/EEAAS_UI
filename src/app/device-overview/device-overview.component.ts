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
      "color": '#32CD32'
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
      "color": '#6794dc'
    }, {
      "status": "Approved",
      "quantity": 20,
      "color": '#32CD32'
    }, {
      "status": "Rejected",
      "quantity": 10,
      "color": '#d65db1'
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
      "utilization": 15,
      "nonUtilized": 85,
    }, {
      "device": "CANOE_1",
      "utilization": 24,
      "nonUtilized": 76,
    }, {
      "device": "CANOE_2",
      "utilization": 32,
      "nonUtilized": 68,
    }, {
      "device": "Energia",
      "utilization": 40,
      "nonUtilized": 60,
    }, {
      "device": "Arduino",
      "utilization": 51,
      "nonUtilized": 49,
    }, {
      "device": "Canape",
      "utilization": 58,
      "nonUtilized": 42,
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

    createSeries("utilization", "Utilization", true, "#d65db1");
    createSeries("nonUtilized", "Non Utilization", true);

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

      series.columns.template.width = am4core.percent(60);
      let bullet = series.bullets.push(new am4charts.LabelBullet());

      bullet.label.text = "[bold]{valueY}";
      bullet.label.fontSize = 12;
      bullet.locationY = 0.5;
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

    createSeries("requestTime", "Request Time", false, "#d65db1");
    createSeries("availableTime", "Available Time", false);

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

      series.columns.template.width = am4core.percent(60);

      let bullet = series.bullets.push(new am4charts.LabelBullet());

      bullet.label.text = "[bold]{valueY}";
      bullet.label.fontSize = 12;
      bullet.label.dy = -10;
      //  valueLabel.labels.template.radius = am4core.percent(-40);
      // valueLabel.label.fill = am4core.color("white");
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
    "idleHrs": "95"
  }, {
    "deviceName": "Canape",
    "deviceFeature": "Data",
    "idleHrs": "74"
  }, {
    "deviceName": "Energia",
    "deviceFeature": "Data",
    "idleHrs": "65"
  }, {
    "deviceName": "Rasberry_Pi",
    "deviceFeature": "Data",
    "idleHrs": "55"
  }, {
    "deviceName": "CanOe 4",
    "deviceFeature": "Data",
    "idleHrs": "39"
  }, {
    "deviceName": "Canlyzer",
    "deviceFeature": "Data",
    "idleHrs": "31"
  }, {
    "deviceName": "WebCam",
    "deviceFeature": "Data",
    "idleHrs": "26"
  }, {
    "deviceName": "CanOe 4",
    "deviceFeature": "Data",
    "idleHrs": "20"
  }];
  tableDataLow = [{
    "deviceName": "Arduino",
    "deviceFeature": "Data",
    "idleHrs": "67"
  }, {
    "deviceName": "Boot Loader",
    "deviceFeature": "Data",
    "idleHrs": "46"
  }, {
    "deviceName": "CanOe 2",
    "deviceFeature": "Data",
    "idleHrs": "22"
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
