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
      console.log("xxxxcourosel pie data", this.array1);
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
      this.loadPie4(item, "pie-" + name);
    });

  }

  loadPie4(data: Object, id: string) {
    var chart = am4core.create(id, am4charts.PieChart);
    let array = [];
    data = { ...data };
    if (data['name']) delete data['name'];
    Object.keys(data).map((key) => {
      if (data[key])
        array.push({ service: this.api.humanize(key), value: data[key], color: am4core.color(this.api.getColor4Pie(key)) })
    })
    // Add data
    console.log("hi array cor", array);
    chart.data = array;

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

    this.api.hideAmchartsIcon();
  }

}
