import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import * as $ from 'jquery';
import { ApiService } from '../bare-metal/services/api.service'
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

// export interface User {
//   value: string;
//   viewValue: string;
// }

export class AdminDashboardComponent implements OnInit {
  data_pie: any;
  servicesInfo: any = [];
  adminData: any;
  total_hosts: any;
  no_of_projects: any;
  public chart: AmChart;
  users: any
  // users: User[] = [
  //   {value: 'Sam', viewValue: 'Sam'},
  //   {value: 'Alice', viewValue: 'Alice'},
  //   {value: 'Jill', viewValue: 'Jill'}
  // ];
  req_pending: any;
  opn_hosts: any;
  kube_hosts: any;
  opn_svc: any;
  kube_svc: any;
  opn_act_vdes: any;
  kube_act_vdes: any;
  open_reqs: any;
  kube_reqs: any;
  opn_cpu: any = {};
  opn_ram: any = {};
  opn_hdd: any = {};
  kube_vcpu: any = {};
  kube_ram: any = {};
  kube_hdd: any = {};
  max_opn_cpu: any;
  max_opn_ram: any;
  max_opn_hdd: any;
  max_kube_cpu: any;
  max_kube_ram: any;
  max_kube_hdd: any;
  doSomethingWithCurrentValue(event) {

  }
  adminDBData() {
    var data = { "login": JSON.parse(this.auth.data) };

    this.webService.getAdminDbData(data).subscribe(res => {
      this.adminData = res
      console.log(this.adminData)
      // this.webService.down_hosts=this.adminData.openstack.opn_down_hosts;
      // console.log(this.adminData.openstack.pending_request)
      this.servicesInfo = [
        {
          "name": "BAREMETAL SERVERS",
          "num_of_services": this.adminData.Admin.bg_server_count,
          "imagePath": "./assets/images/adminimages/hosts-59x54.svg",
          "color": "#76b6ff",
          "bordercolor": "#76b6ff"
        },
        {
          "name": "AVAILABLE BAREMETAL SERVERS",
          "num_of_services": this.adminData.Admin.bg_server_free,
          "imagePath": "./assets/images/adminimages/projects-44x54.svg",
          "color": "#fe9c3b",
          "bordercolor": "#fe9c3b"
        },
        {
          "name": "RESERVED BAREMETAL SERVERS",
          "num_of_services": this.adminData.Admin.bg_server_use,
          "imagePath": "./assets/images/adminimages/users-63x42.svg",
          "color": "#e5cb14",
          "bordercolor": "#e5cb14"
        },
        {
          // this.adminData.openstack.pending_request
          "name": "PENDING REQUESTS",
          "num_of_services": this.adminData.Admin.vm_pen_count,
          "imagePath": "./assets/images/adminimages/pendingreq-52x52.svg",
          "color": "#e064e8",
          "bordercolor": "#e064e8"
        },
        //       {
        //         "name":"HOSTS",
        //         "num_of_services":this.adminData.openstack.openstack_host + this.adminData.kubernetes.kube_host,
        //         "imagePath":"./assets/images/adminimages/hosts-59x54.svg",
        //         "color" : "#76b6ff",
        //         "bordercolor":"#76b6ff"
        //       },
        //       {
        //         "name":"PROJECTS",
        //         "num_of_services":this.adminData.openstack.projects,
        //         "imagePath":"./assets/images/adminimages/projects-44x54.svg",
        //         "color" : "#fe9c3b",
        // "bordercolor":"#fe9c3b"
        //       },
        //       {
        //         "name":"USERS",
        //         "num_of_services":parseInt(this.adminData.openstack.users),
        //         "imagePath":"./assets/images/adminimages/users-63x42.svg",
        //         "color" : "#e5cb14",
        //         "bordercolor":"#e5cb14"
        //       },
        //       {
        //        // this.adminData.openstack.pending_request
        //         "name":"PENDING REQUESTS",
        //         "num_of_services": 7,
        //         "imagePath":"./assets/images/adminimages/pendingreq-52x52.svg" ,
        //         "color" : "#e064e8",
        // "bordercolor":"#e064e8"
        //       },
      ]
      this.total_hosts = this.adminData.openstack.openstack_host + this.adminData.kubernetes.kube_host;
      this.no_of_projects = this.adminData.openstack.projects;
      this.users = parseInt(this.adminData.openstack.users);
      this.req_pending = this.adminData.openstack.pending_request;
      this.opn_hosts = this.adminData.openstack.openstack_host;
      this.kube_hosts = this.adminData.kubernetes.kube_host;
      this.opn_svc = this.adminData.openstack.opn_services;
      this.kube_svc = this.adminData.kubernetes.kube_services;
      //this.opn_act_vdes = this.adminData.openstack.opn_active_vdes;
      this.opn_act_vdes = this.adminData.Admin.utilisation.toFixed(1);
      this.kube_act_vdes = this.adminData.kubernetes.kube_active_vdes;
      this.open_reqs = this.adminData.openstack.rqst_vm;
      this.kube_reqs = this.adminData.kubernetes.rqst_container;
      this.opn_cpu = { "used": this.adminData.openstack.vcpus_used, "avail": 354 };
      this.opn_ram = { "used": Math.floor(parseInt(this.adminData.openstack.memory_mb_used) / 1024), "avail": 512 };
      this.opn_hdd = { "used": (parseInt(this.adminData.openstack.local_gb_used) / 1024).toFixed(2), "avail": 1.00 };
      this.kube_vcpu = { "used": this.adminData.kubernetes.cpu_usage, "avail": 120 };
      this.kube_ram = { "used": Math.floor(parseInt(this.adminData.kubernetes.memory_usage) / 1024), "avail": 300 };
      this.kube_hdd = { "used": (parseInt(this.adminData.kubernetes.hdd_usage) / 1024).toFixed(2), "avail": 2.00 };

      this.max_opn_hdd = Math.ceil((parseInt(this.adminData.openstack.local_gb_used) / 1024) + 1);
      this.max_kube_hdd = Math.ceil((parseInt(this.adminData.kubernetes.hdd_usage) / 1024) + 2);

      this.webService.gauge("chartdiv", this.opn_cpu.used, this.opn_cpu.used + this.opn_cpu.avail, "#0fa2ff")
      this.webService.gauge("chartdiv1", this.opn_ram.used, this.opn_ram.used + this.opn_ram.avail, "#ffa20f")
      //this.webService.gauge("chartdiv2",this.opn_hdd.used,parseFloat(this.opn_hdd.used+this.opn_hdd.avail).toFixed(1),"#a140fc")

      this.webService.gauge("chartdiv3", this.kube_vcpu.used, this.kube_vcpu.used + this.kube_vcpu.avail, "#0fa2ff")
      this.webService.gauge("chartdiv4", this.kube_ram.used, this.kube_ram.used + this.kube_ram.avail, "#ffa20f")
      //  parseFloat(this.kube_hdd.used+this.kube_hdd.avail)
      this.webService.gauge("chartdiv5", this.kube_hdd.used, 2, "#dd86e2")
      if (this.webService.storage) {
        this.webService.gauge("chartdiv2", 1.80, 2, "#dd86e2")
        //this.webService.gauge("chartdiv5",1.55,2,"#a140fc")

      }
      else {
        this.webService.gauge("chartdiv2", 1.79, 2, "#dd86e2")
        //this.webService.gauge("chartdiv5",1.31,2,"#a140fc")
      }

      console.log(this.adminData.openstack.local_gb_used)
    })
  }
  constructor(
    private auth: AuthService,
    private webService: WebService,
    private AmCharts: AmChartsService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.loadPie();
    //  this.adminDBData();
    this.webService.Dashboard = true;
    this.webService.devices = false;
    this.webService.orders = false;
    this.webService.labs = false;
    this.webService.reports = false;
    this.webService.Inventory = false;
    this.webService.catalogue = false;
    this.webService.calendar = false;
    this.webService.holidays = false;

  }

  loadPie() {
    this.api.loadPie({ login: JSON.parse(this.auth.data) }).subscribe(
      res => {
        let obj = {};
        console.log({ res });
        Object.keys(res).map((item) => {
          obj[item] = this.api.makePieData(res[item])
        });

        this.data_pie = obj;
        // {
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
      }
    );
  }
  // calendar(){
  //   $('#calendar').fullCalendar({
  //     header: {
  //         left: 'prev,next today',
  //         center: 'title',
  //         right: 'month,agendaWeek,agendaDay,listWeek'
  //     },
  //     defaultDate: '2018-11-16',
  //     navLinks: true,
  //     eventLimit: true,
  //     events: [{
  //             title: 'Front-End Conference',
  //             start: '2018-11-16',
  //             end: '2018-11-18'
  //         },
  //         {
  //             title: 'Hair stylist with Mike',
  //             start: '2018-11-20',
  //             allDay: true
  //         },
  //         {
  //             title: 'Car mechanic',
  //             start: '2018-11-14T09:00:00',
  //             end: '2018-11-14T11:00:00'
  //         },
  //         {
  //             title: 'Dinner with Mike',
  //             start: '2018-11-21T19:00:00',
  //             end: '2018-11-21T22:00:00'
  //         },
  //         {
  //             title: 'Chillout',
  //             start: '2018-11-15',
  //             allDay: true
  //         },
  //         {
  //             title: 'Vacation',
  //             start: '2018-11-23',
  //             end: '2018-11-29'
  //         },
  //     ]
  //   });
  // }
  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

  ngAfterViewInit() {



  }

}
