import { Component, OnInit,ViewChild } from '@angular/core';
// import { OptionsInput } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { CalendarComponent } from 'ng-fullcalendar';
import * as $ from 'jquery';
import "fullcalendar";
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  tableData: any = [
    { s_No: ' ', holiday_date: new Date("01/15/2019"), holiday_reason: 'Sankranti', actions: '' },
    { s_No: ' ', holiday_date: new Date("05/01/2019"), holiday_reason: 'May Day', actions: '' },
    { s_No: ' ', holiday_date: new Date("06/05/2019"), holiday_reason: 'Ramzon', actions: '' },
    { s_No: ' ', holiday_date: new Date("08/15/2019"), holiday_reason: 'Independance Day', actions: '' },
    { s_No: ' ', holiday_date: new Date("09/02/2019"), holiday_reason: 'Ganesh Charthurdi', actions: '' },
    { s_No: ' ', holiday_date: new Date("10/02/2019"), holiday_reason: 'Gandhi Jyanthi', actions: '' },
    { s_No: ' ', holiday_date: new Date("10/08/2019"), holiday_reason: 'Dussehra', actions: '' },
    { s_No: ' ', holiday_date: new Date("12/25/2019"), holiday_reason: 'Christamas', actions: '' },
    

  ]
  events:any=[];
  constructor(public auth:AuthService,public webService:WebService) {
    for (var i=0;i<this.tableData.length;i++){
this.events.push({
  title: this.tableData[i].holiday_reason,
  start: new Date(this.tableData[i].holiday_date.getFullYear(),  this.tableData[i].holiday_date.getMonth(), this.tableData[i].holiday_date.getDate(), 12, 0),
  
  allDay: true,
  backgroundColor: "#00c0ef", //Info (aqua)
  borderColor: "#00c0ef" //Info (aqua)
},)
    }
   }



  ngOnInit() {
    this.webService.Dashboard=false;
    this.webService.devices=false;
   this.webService.orders=false;
this.webService.labs=false;
this.webService.reports=false;
    this.webService.Inventory  =false;
this.webService.catalogue=false;
this.webService.calendar=true;
this.webService.holidays=false;
//this.calendar();
}
}