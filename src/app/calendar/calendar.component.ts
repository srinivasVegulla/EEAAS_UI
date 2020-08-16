import { Component, OnInit, ViewChild } from '@angular/core';
// import { OptionsInput } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { CalendarComponent } from 'ng-fullcalendar';

import "fullcalendar";
import * as $ from 'jquery';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
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
  events: any = [];
  constructor(public auth: AuthService, public webService: WebService) {
    for (var i = 0; i < this.tableData.length; i++) {
      this.events.push({
        title: this.tableData[i].holiday_reason,
        start: new Date(this.tableData[i].holiday_date.getFullYear(), this.tableData[i].holiday_date.getMonth(), this.tableData[i].holiday_date.getDate(), 12, 0),

        allDay: true,
        backgroundColor: "#00c0ef", //Info (aqua)
        borderColor: "#00c0ef" //Info (aqua)
      })
    }
  }

  calendar() {
    var date = new Date();
    var d = date.getDate(),
      m = date.getMonth(),
      y = date.getFullYear();


    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      buttonText: {
        today: 'today',
        month: 'month',
        week: 'week',
        day: 'day'
      },
      //Random default events
      events: this.events,

      editable: false,
      droppable: true, // this allows things to be dropped onto the calendar !!!
      drop: function (date, allDay) { // this function is called when something is dropped

        // retrieve the dropped element's stored Event Object
        var originalEventObject = $(this).data('eventObject');

        // we need to copy it, so that multiple events don't have a reference to the same object
        var copiedEventObject = $.extend({}, originalEventObject);

        // assign it the date that was reported
        copiedEventObject.start = date;
        copiedEventObject.allDay = allDay;
        copiedEventObject.backgroundColor = $(this).css("background-color");
        copiedEventObject.borderColor = $(this).css("border-color");

        // render the event on the calendar
        // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
        $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
          // if so, remove the element from the "Draggable Events" list
          $(this).remove();
        }

      }
    });
  }
  ngOnInit() {
    this.webService.Dashboard = false;
    this.webService.devices = false;
    this.webService.orders = false;
    this.webService.labs = false;
    this.webService.reports = false;
    this.webService.Inventory = false;
    this.webService.catalogue = false;
    this.webService.calendar = true;
    this.webService.holidays = false;
    this.webService.Assets = false;
    this.calendar();
  }
}