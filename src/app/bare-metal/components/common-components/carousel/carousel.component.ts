import { Component, OnInit, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { ApiService } from "../../../services/api.service";

declare var _;

declare var document;
/* declare var am4core: any;
declare var am4charts: any; */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  inputs: ['data']
})
export class CarouselComponent implements OnInit {
  data: any;
  Object = Object;
  array1: any;
  constructor(
    private AmCharts: AmChartsService,
    private api: ApiService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.loadCarousel();
    setTimeout(() => {
      if (this.data)
        this.loadPie_n(this.data)
    }, 100);

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log({ changes });
    if (changes.data && !changes.data.firstChange) {
      this.data = changes.data.currentValue;
      let someA = [];
      Object.keys(this.data).map((item) => {
        let obj = this.data[item];
        obj['name'] = item
        someA.push(obj);
      });

      this.array1 = _.chunk(someA, 3);
      console.log("xxxxcourosel pie data", this.array1)
      setTimeout(() => {
        this.loadPie_n(this.data);
      }, 100);

    }
  }

  loadCarousel() {
    $(document).ready(() => {
      // $('#recipeCarousel').carousel({
      //   interval: 10000
      // })

      $('.carousel .carousel-item').each(function () {
        var next = $(this).next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (var i = 0; i < 3; i++) {
          next = next.next();
          if (!next.length) {
            next = $(this).siblings(':first');
          }

          next.children(':first-child').clone().appendTo($(this));
        }
      });

    });

  }

  loadPie_n(new_data) {

    //  let list = new_data.list; //  [{ bare_metal: 22, switch: 23, VDE: 39, service: 44 }, { bare_metal: 44, switch: 63, VDE: 76, service: 11 }]
    Object.keys(new_data).map((name, i) => {
      let item = new_data[name];
      this.loadPie4(item, "pie-" + name)

      //   this.AmCharts.makeChart("pie-" + name, {
      //     "type": "pie",
      //     "labelRadius": 10,
      //     // "fontSize": 14,
      //     // "labelText": " ",
      //     "theme": "light",
      //     "startAngle": 177,
      //     "startDuration": 0,
      //     "labelTickColor": "white",
      //     "labelTickAlpha": 0.5,
      //     "outlineColor": "#232730",
      //     "dataProvider": [{
      //       "budgetType": "Servers",
      //       "percent": item.bare_metal || 0,
      //       "color": "#c4782d",
      //       "labelColor": "#ffffff",

      //       value_n: item.bare_metal || 0,
      //       // "labelColor": "#ffffff",
      //     }, {
      //       "budgetType": "Switches",
      //       "percent": item.switch || 0,
      //       "color": "#2b92f1",
      //       "labelColor": "#ffffff",
      //       value_n: item.switch || 0,
      //       // "labelColor": "#ffffff",
      //     }, {
      //       "budgetType": "VDEs",
      //       "percent": item.VDE || 0,
      //       "color": " #34495e",
      //       "labelColor": "#ffffff",
      //       value_n: item.VDE || 0,
      //       // "labelColor": "#ffffff",
      //     }, {
      //       "budgetType": "Services",
      //       "percent": item.service || 0,
      //       "color": " #8e44ad",
      //       "labelColor": "#ffffff",
      //       value_n: item.service || 0,
      //       // "labelColor": "#ffffff",
      //     }],
      //     balloonText: "[[budgetType]]: [[value_n]]",
      //     "valueField": "percent",
      //     "titleField": "budgetType",
      //     "colorField": "color",
      //     "labelColorField": "labelColor",
      //     "legend": {
      //       "generateFromData": true,
      //       "align": "left",
      //       "color": '#ffffff',
      //       // "fontSize":12,

      //       //   "autoMargins":true,
      //       //  "useMarkerColorForLabels":true,
      //       //  "switchColor":"#3366CC",
      //       // "data":[{title: "Available Budget", color: "#c4782d",value:"$"+this.pm_Info.openstack.project_info[0].avail_budget},{title: "Used Budget", color: "#2b92f1",value:"$"+(parseInt(this.pm_Info.openstack.project_info[0].total_budget)-parseInt(this.pm_Info.openstack.project_info[0].avail_budget))}]
      //       "data": [{
      //         "budgetType": "Servers",
      //         "percent": item.bare_metal || 0,
      //         "color": "#c4782d",
      //         "labelColor": "#ffffff",
      //         // "labelColor": "#ffffff",
      //       }, {
      //         "budgetType": "Switches",
      //         "percent": item.switch || 0,
      //         "color": "#2b92f1",
      //         "labelColor": "#ffffff",
      //         // "labelColor": "#ffffff",
      //       }, {
      //         "budgetType": "VDEs",
      //         "percent": item.VDE || 0,
      //         "color": " #34495e",
      //         "labelColor": "#ffffff",
      //         // "labelColor": "#ffffff",
      //       }, {
      //         "budgetType": "Services",
      //         "percent": item.service || 0,
      //         "color": " #8e44ad",
      //         "labelColor": "#ffffff",
      //         // "labelColor": "#ffffff",
      //       }].filter((item) => item.percent).map((item) => { return { title: item.budgetType, color: item.color } }) // [{ title: "Available Billing", color: "#c4782d" }, { title: "Used Billing", color: "#2b92f1" }]
      //     },

      //   });
    });

  }

  loadPie4(data: Object, id: string) {
    // Create chart instance
    // console.log(data)
    var chart = am4core.create(id, am4charts.PieChart);
    let array = [];
    data = { ...data };
    if (data['name']) delete data['name'];
    Object.keys(data).map((key) => {
      if (data[key])
        array.push({ service: this.api.humanize(key), value: data[key], color: am4core.color(this.api.getColor4Pie(key)) })
    })
    // Add data
    console.log(array)
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
    pieSeries.slices.template.propertyFields.fill = "color";
    // pieSeries.slices.template.propertyFields.fill = "color";

    pieSeries.ticks.template.disabled = true;
    pieSeries.alignLabels = false;
    pieSeries.labels.template.text = "{value}";
    pieSeries.labels.template.fontSize = 20;
    pieSeries.labels.template.radius = am4core.percent(-40);
    pieSeries.labels.template.fill = am4core.color("white");
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
    this.api.hideAmchartsIcon();
  }

}
