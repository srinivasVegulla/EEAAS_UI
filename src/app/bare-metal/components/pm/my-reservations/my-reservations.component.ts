import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from "../../../services/api.service";
import { AuthService } from '../../../../services/auth.service';
import * as moment from 'moment';
@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {

  pageLength_inuse: number;
  pageSize_inuse = 5;

  pageLength_pending: number;
  pageSize_pending = 5;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(
    private api: ApiService,
    private router: Router,
    private auth: AuthService
  ) { }

  pending = [];

  inuse = [];
  splicedData_inuse: any;
  splicedData_pending: any;


  ngOnInit() {
    this.getPendingreq();
    // this.getInuseReq();
  }

  getPendingreq() {
    this.api.requestedList().subscribe(
      res => {


        let user_data = JSON.parse(localStorage.getItem('data'));


        res['request'] = res['request'].filter((item) => item.pm_id.toLowerCase() == user_data.user_id.toLowerCase()).map((item) => {
          item.expired = moment().isAfter(moment(item.end_date, "MM/DD/YYYY"), 'day');
          return item;
        });
        console.log(res, user_data);
        // .filter((item) => !(item.expired && String(item.status).toUpperCase() == 'IN PROGRESS'))

        this.inuse = res && res['request'] && res['request'].filter((item) => String(item.status).toUpperCase() == 'PROVISIONED' || String(item.status).toUpperCase() == 'ALLOCATED' || String(item.status).toUpperCase() == 'IN PROGRESS').reverse();
        this.pageLength_inuse = this.inuse.length;
        this.splicedData_inuse = this.inuse.slice(((0 + 1) - 1) * this.pageSize_inuse).slice(0, this.pageSize_inuse);

        this.pending = res && res['request'] && res['request'].filter((item) => String(item.status).toUpperCase() == 'REQUESTED' || String(item.status).toUpperCase() == 'APPROVED').reverse()
        this.pageLength_pending = this.pending.length;
        this.splicedData_pending = this.pending.slice(((0 + 1) - 1) * this.pageSize_pending).slice(0, this.pageSize_pending);

        // this.pageChangeEvent({
        //   length: this.pageLength_inuse,
        //   pageIndex: 0,
        //   pageSize: this.pageSize_inuse
        // }, 'inuse');

        // this.pageChangeEvent({
        //   length: this.pageLength_pending,
        //   pageIndex: 0,
        //   pageSize: this.pageSize_pending
        // }, 'pending');

      }
    );
  }

  getInuseReq() {

  }

  async process_ticket(data) {
    let pm_can_edit = data.status.toLowerCase() == 'provisioned' || data.status.toLowerCase() == 'allocated';
    let server_d: any;
    if (pm_can_edit) {
      try {

        server_d = await this.api.getReq_data2_lm({ "action": "read", "request_id": data.request_id }).toPromise();
        // console.log({ server_d })
        if (server_d['request'][0].service_name.toLowerCase().replace(/ /g, "").includes("switch")) {
          console.log("this is switch");
          this.router.navigate(['/home/dashboard/reserve-switch'], { queryParams: { request_id: data.request_id } });
        } else {

          this.router.navigate(['/home/dashboard/pm-req-cancel'], { queryParams: { request_id: data.request_id, pm_can_edit, pm_can_cancel_req: !pm_can_edit } });
        }
      } catch (err) {
        // console.log(err)
      }
    } else {
      this.router.navigate(['/home/dashboard/pm-req-cancel'], { queryParams: { request_id: data.request_id, pm_can_edit, pm_can_cancel_req: !pm_can_edit } });
    }


    // for service_type bare_metal we use pm-req-cancel route

    // return "some";
    // if (data.status.toUpperCase() == 'REQUESTED') {
    //   this.router.navigate(['/dashboard/pm-req-cancel'], { queryParams: { request_id: data.request_id } });
    // }
    // localStorage.setItem('reserve_servers', JSON.stringify([data]));
    // this.router.navigate(['/dashboard/reserve-servers'], { queryParams: { from: 'my_reservations' } });
    // this.router.navigate(['/dashboard/process-my-reservations'], { queryParams: { request_id: data.request_id } });
  }

  pageChangeEvent(event, type) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    if (type == 'inuse')
      this.splicedData_inuse = this.inuse.slice(offset).slice(0, event.pageSize);
    else
      this.splicedData_pending = this.pending.slice(offset).slice(0, event.pageSize);
  }

}
