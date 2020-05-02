import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-my-reservations',
  templateUrl: './process-my-reservations.component.html',
  styleUrls: ['./process-my-reservations.component.css']
})
export class ProcessMyReservationsComponent implements OnInit {

  constructor() { }

  Object = Object;

  pending = [
    {
      start_date: '7/1/19',
      by: 'Line Manager',
      to: 'Vishal',
      status: "Approved",
      end_date: "7/2/19"
    },
    {
      start_date: '7/2/19',
      by: 'Adminstator',
      to: 'Venkatesh',
      status: "Pending",
      end_date: ""
    }
  ]

  server_list = [
    {
      service_id : "234l_s",
      name: 'Lenovo _ 44',
      custom_data: {
        project_name: "project 33",
        start_date: '4/4/19',
        end_date: '4/4/19',
        os: "ubuntu",
        apps: [
          {
            service_name: 'vs code'
          },
          {
            service_name: 'Tom cat 7'
          }
        ]
      },
      server_details : {
        os: "ubuntu",
        ram: "12 gb",
        cpu : "12 cores",
        location: "loc55"
      }
    }
  ]

  ngOnInit() {
  }

}
