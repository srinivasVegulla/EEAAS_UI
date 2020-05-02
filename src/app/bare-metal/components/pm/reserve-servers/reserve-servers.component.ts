import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
// import { ToastService } from "../../../toast/toast.service";
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "../../../services/api.service";

declare var bootbox;

@Component({
  selector: 'app-reserve-servers',
  templateUrl: './reserve-servers.component.html',
  styleUrls: ['./reserve-servers.component.css']
})
export class ReserveServersComponent implements OnInit {
  selected_service_type: any;
  selected_list = [
    {
      server_name: "LENEVO_BDSS2"
    },
    {
      server_name: "LENEVO_BDSS3"
    },
    {
      server_name: "LENEVO_BDSS5"
    },
    {
      server_name: "LENEVO_BDSS7"
    },
  ];
  req_submitted = false;
  selectedMoment = new Date();
  FormControl = FormControl;
  os_list = [];
  apps_list = [];
  Object = Object;
  moment = moment;
  project_name_available: any;
  order_details = {
    project_name: '',
    start_date: new FormControl(new Date()),
    end_date: '',
    alert_me_before: ''
  }

  modal_data = {
    title: "",
    inputType: "",
    list: [],
    row: '',
    enable_osapp_add: false,
  }
  enable_osApp_button = false;

  constructor(
    // private toast: ToastService
    private _location: Location,
    private api: ApiService,
    private router: Router,
    private Activatedroute: ActivatedRoute,
  ) {

  }
  sub: any;
  ngOnInit() {
    this.sub = this.Activatedroute.queryParamMap
      .subscribe(params => {
        this.selected_service_type = params.get('service_type') || 0;
        // let type = params.get('service_type') || 0;
        // if (type == 'bare_metal') this.selected_service_type = 'Server';
        // if (type == 'switch') this.selected_service_type = 'Switch';
      });
    // bootbox.addLocale('my-locale', {
    //   OK: 'Delete',
    //   CANCEL: 'Cancel',
    //   CONFIRM: 'Yes'
    // });
    // bootbox.setDefaults({ locale: 'my-locale' });
    //  consoledoModal
    this.loaddata()
    this.loadOSnApps();
    //console.log(this.api.getItem('project_id'));
    this.project_name_available = this.api.getItem('project_id') && this.api.getItem('project_id')[0]
    this.order_details.project_name = this.api.getItem('project_id')[0];

  }

  loaddata() {
    this.selected_list = Object.values(JSON.parse(localStorage.getItem('reserve_servers')));
    this.selected_list = this.selected_list.map((item) => {
      item['custom_data'] = {};
      return item;
    });
    this.api.getServerDetails(this.selected_list.map((item) => item['serviceid'])).subscribe(
      res => {
        // console.log(res);
        this.selected_list.map((item) => {
          res['server_details'].map((server_details) => {
            if (item['serviceid'] == server_details.server_id) {
              item['server_details'] = server_details;
              if (item['server_details'].softwares && item['server_details'].softwares != "NA" && JSON.parse(item['server_details'].softwares)) {
                item['server_details'].softwares = Object.values(JSON.parse(item['server_details'].softwares)['tools']).join(", ");
              }
            }
          })
        })
      }
    );
  }

  dateChange(data, field) {
    this.order_details[field] = new FormControl(data);
  }



  remove(selected_list, index) {
    bootbox.confirm({
      size: "small",
      message: "Are you sure you want to delete?",
      buttons: {
        confirm: {
          label: 'Yes',
          className: 'btn-success yes-btn'
        },
        cancel: {
          label: 'No',
          className: 'btn-danger no-btn'
        }
      },
      callback: function (result) { /* result is a boolean; true = OK, false = Cancel*/
        if (result) selected_list.splice(index, 1);
      }
    })

  }

  back() {
    this._location.back();
  }

  loadOSnApps() {
    this.api.getCatalog().subscribe(
      res => {

        res['catalogue'] = res['catalogue'].map((item) => {
          item.checked = false;
          return item;
        })
        this.os_list = res['catalogue'].filter((item) => item.service_type == 'bare_metal_os');
        this.apps_list = res['catalogue'].filter((item) => item.service_type == 'bare_metal_software');
        this.selected_list = this.selected_list.map((item) => {

          let installed_os = [...this.os_list].map((item) => { return { ...item } }).filter((os) => os.service_name == item['raw_data']['hover_details']['operating_system']);
          let installed_apps = [...this.apps_list].map((item) => { return { ...item } }).filter((app) => item['raw_data']['hover_details']['softwares'].replace(/ /g, "").split(",").includes(app.versions))

          item['custom_data'] = installed_os && installed_os.length && { os: installed_os[0].service_name, os_id: installed_os[0].service_id } || {};
          item['custom_data']['apps_added'] = installed_apps;

          item['os_to_select'] = [...this.os_list].map((os) => {
            if (os.service_name == item['raw_data']['hover_details']['operating_system'])
              os['checked'] = true;
            return { ...os }
          }); // .filter((os) => os.service_name != item['raw_data']['hover_details']['operating_system'])
          item['app_to_select'] = [...this.apps_list].map((app) => {
            if (item['raw_data']['hover_details']['softwares'].replace(/ /g, "").split(",").includes(app.versions))
              app['checked'] = true;
            return { ...app }
          });

          return { ...item };
        });
      }
    );
  }

  doModal(list, title, inputType, row) {

    this.modal_data = {
      title: "",
      inputType: "",
      list: [],
      row: '',
      enable_osapp_add: false,
    }
    // this.cancelOsnApps(list, row['custom_data']['apps_added'], true);
    // setTimeout(() => {
    this.modal_data = {
      // ...{
      list: list,
      inputType: inputType,
      title: title,
      enable_osapp_add: false,
      row,

      // }
    }
    // }, 100);
  }

  osNappsSelection(inputType, event, server, row, modal_data) {
    row.checked = !row.checked;

    if (inputType == 'radio' && event.target.checked) {
      modal_data.enable_osapp_add = true;
      this.modal_data.list = this.modal_data.list.map((item) => {
        if (item.service_id !== row.service_id) {
          item.checked = false;
        }
        return item;
      })
      // server['custom_data']['os'] = row.service_name;
      // server['custom_data']['os_id'] = row.service_id;
      row.checked = true;

    }
    else if (inputType == 'checkbox') {
      server['custom_data']['apps'] = this.modal_data.list.filter((item) => item.checked)// .map((item) => item.servie_id);
      if (server['custom_data']['apps'].length) {
        modal_data.enable_osapp_add = true;
      }
    }

    //console.log(this.selected_list)

  }


  // for suresh

  // loadAppsList(list, apps_added) {
  //   if (!apps_added) list = list.map((item) => item.checked = false);
  //   else {

  //     list.map((app) => {
  //       apps_added.map((added) => {

  //         if (app.service_id != added.service_id) app.checked = true;
  //         // else app.checked = true

  //       })
  //     })
  //   }
  // }



  addOsnApp_new(input_type, list, server) {
    if (input_type == "checkbox")
      server['custom_data']['apps_added'] = list.map((item) => { return { ...item } }).filter((item) => item.checked);
    else {
      // console.log({ input_type, list, server });
      for (let i = 0; i < list.length; i++) {
        let row = list[i];
        if (row.checked) {
          server['custom_data']['os'] = row.service_name;
          server['custom_data']['os_id'] = row.service_id;
          break;
        }

      }
    }
  }

  cancelOsnApps(input_type, list, apps_added, server) {
    // console.log({ list, apps_added });
    if (input_type == "checkbox") {
      if (!apps_added) list.map((item) => item.checked = false);
      else {

        list = list.map((app) => {
          // apps_added.map((added) => {
          for (let i = 0; i < apps_added.length; i++) {
            let added = apps_added[i];
            if (added.service_id == app.service_id) {
              // console.log(added.service_id, app.service_id, true)
              app.checked = true;
              break
            } else {
              // console.log(added.service_id, app.service_id, false)
              app.checked = false;
            }
          }
          // })
          // console.log(app)
          return app;
        })
      }
      // console.log({ list, apps_added });
      server['app_to_select'] = [...list];
    } else {
      if (server['custom_data']['os_id']) {
        list.map((item) => {
          if (item.service_id == server['custom_data']['os_id'])
            item.checked = true;
          else item.checked = false;
        })
      } else
        list.map((item) => item.checked = false)

    }

  }

  // for suresh ends

  reserve() {
    console.log(this.selected_list);

    if (!this.order_details.start_date || !this.order_details.end_date) {
      this.api.errorToast("Enter Start and End dates!");
      return false;
    }
    try {
      let instance_type = this.selected_list.filter((item) => item['raw_data']['service_type'] == 'switch').length ? "Switch" : "Physical";
      // console.log(this.selected_list.filter((item) => item['raw_data']['service_type'] == 'switch'))
      let req = {
        action: 'create',
        login: JSON.parse(localStorage.getItem('data')),
        // login: {
        //   job: true,
        //   role: '',
        //   user_id: '',
        //   user_name: '',
        //   project_id: ['']
        // },
        order_details: {
          start_date: moment(this.order_details.start_date.value).format('MM/DD/YYYY') + " 00:00:00",
          end_date: moment(this.order_details.end_date['value']).format('MM/DD/YYYY') + " 00:00:00",
          alert_me_before: this.order_details.alert_me_before,
          project_name: this.order_details.project_name,
          order_items: this.selected_list.length,
          estimated_no_of_users: 1,
          status: 'REQUESTED',
          instance_type,
          location: 'Hyderabad'

        },
        service_details: this.selected_list.map((item) => {
          let obj = {};
          if (this.selected_service_type == 'bare_metal' && !item['custom_data'].os) throw "Select OS."
          obj['service_id'] = item['raw_data'].service_id;
          obj['service_type'] = item['raw_data'].service_type;
          obj['os'] = item['custom_data'].os;
          obj['os_id'] = item['custom_data'].os_id;
          // obj['softwares'] = item['custom_data'].apps.map((item) => item.service_id);
          if (this.selected_service_type == 'bare_metal') {
            // if (!item['custom_data'].apps || !item['custom_data'].apps.length)
            //     throw "Select Softwares.";
            let tools = {};
            item['custom_data'].apps && item['custom_data'].apps_added && item['custom_data'].apps_added.map((item) => {
              tools[item.service_name] = item.versions
            });
            obj['extra_tools'] = tools;
          }

          return JSON.stringify(obj);

        }),
        // [
        //   { service_id: '', service_type: '', os: '', softwares: [] }
        // ],
        userList: [this.api.getItem('user_name')]
      };
      console.log({ req });
      // return false
      this.api.reserveServers(req).subscribe(
        res => {
          // console.log({ res });
          if (res['job'] == true) {

            bootbox.alert({
              message: "Request submitted successfully!",
              callback: () => {

                // console.log('This was logged in the callback!');
                this.router.navigate(['/dashboard/my-reservations']);
                // this.router. http://10.138.77.70:4200/dashboard/my-reservations
              }
            })
          } else {
            this.api.errorToast(this.api.commonError)
            // bootbox.alert({
            //   message: "Something went wrong! Please try again.",
            //   callback: function () {
            //    // console.log('This was logged in the callback!');
            //   }
            // })
          }


        },
        err => {
          //  console.log({ err })
          this.api.errorToast(this.api.commonError)
        }
      );

    } catch (err) {
      console.log({ err })
      this.api.errorToast(typeof err == 'string' ? err : "Enter required details to proceed.")
    }

  }


}
