import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "../../../services/api.service";
import { AuthService } from '../../../../services/auth.service'; // '../../services/auth.service';
import { WebService } from '../../../../services/web.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';
import * as moment from 'moment';
// import * as $ from 'jquery';
declare var bootbox;
declare var $;


// we use this page for lm approval, admin provision and pm cancel request funtionalities

@Component({
  selector: 'app-lm-req-processing',
  templateUrl: './lm-req-processing.component.html',
  styleUrls: ['./lm-req-processing.component.css']
})
export class LmReqProcessingComponent implements OnInit {
  sub: any;
  request_id: any;
  Object = Object;
  edit_response: any;

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
      serviceid: "234l_s",
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
      server_details: {
        os: "ubuntu",
        ram: "12 gb",
        cpu: "12 cores",
        location: "loc55"
      }
    }
  ];

  login_data: any;
  order_details: any;
  pm_can_edit: any;
  pm_can_cancel_req: any;
  enable_pm_edit: any;
  // modal for pm
  modal_data = {
    title: "",
    inputType: "",
    installed_list: [],
    list: [],
    row: ''
  }
  // {
  //   project_name: "name",
  //   start_date: 'start',
  //   end_date: 'end',
  //   servers_list: [
  //     {
  //       service_id: 'id',
  //       server_data_box: {}
  //     }
  //   ]
  // }
  constructor(
    private Activatedroute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public auth: AuthService,
    private webService: WebService,
    private loader: Ng4LoadingSpinnerService,
    private _location: Location
  ) {


  }

  ngOnInit() {
    this.edit_response = null;
    this.login_data = JSON.parse(this.auth.data);
    // console.log(this.auth.data)
    setTimeout(() => {
      this.load_sw_update_modal()
    }, 1000);
    this.sub = this.Activatedroute.queryParamMap
      .subscribe(params => {
        // pm_can_edit, pm_can_cancel_req
        this.pm_can_edit = params.get('pm_can_edit') == 'true' ? true : false;
        this.pm_can_cancel_req = params.get('pm_can_cancel_req') == 'true' ? true : false;
        this.request_id = params.get('request_id') || 0;
        this.request_id && this.getReq_data_lm(this.request_id);
      });
  }

  async getReq_data_lm(request_id) {
    try {
      localStorage.setItem('multiple_http_', 'true');
      let data1 = { 'project_id': JSON.parse(this.auth.data)['project_id'], 'action': 'read', 'request_id': request_id }; // {'project_id': ['NextGen', 'IoT'], 'action': 'read', 'request_id': request_id}
      let data2 = { "action": "read", "request_id": request_id }; // {"action":"read","request_id":"req_0102"}
      this.loader.show();
      let sec_1 = await this.api.getReq_data1_lm(data1).toPromise();
      let sec_2 = await this.api.getReq_data2_lm(data2).toPromise();

      let server_details = await this.api.getServerDetails(sec_2['request'].map((item) => item.service_id)).toPromise();
      let server_details_user = await this.api.getServerDetails_user(sec_2['request'].map((item) => item.service_id)).toPromise();
      let req_price = await this.api.getReq_data1_lm({ 'action': 'read', 'request_id': request_id }
      ).toPromise(); // duplicate of sec_1
      let project_budget: any;
      if (this.login_data.role.toLowerCase() != "pm")
        project_budget = await this.api.projectInfo({ 'action': 'read', login: JSON.parse(localStorage.getItem('data')) }).toPromise();
      this.loader.hide();
      localStorage.setItem('multiple_http_', '');
      console.log({ sec_1, sec_2, server_details, req_price, project_budget, server_details_user });

      // to add user added details to a server
      let sec_2_n = [];
      sec_2 && sec_2['request'].map((item) => {

        server_details_user && server_details_user['opnfv'].map((item2) => {
          item2.software = typeof item2.software == 'string' && item2.software != 'NA' ? JSON.parse(item2.software) : item2.software;
          if (item.service_id == item2.service_id) {
            item.server_details_user = item2;
            sec_2_n.push(item);
          }
        });

      });

      // to add server configuration details to a server
      let sec_2_n_ = [];
      //  setTimeout(() => {
      sec_2_n.map((item) => {
        server_details && server_details['server_details'].map((item2) => {
          let item3 = { ...item2 };
          console.log({ item3 })
          if (this.pm_can_edit)
            item.extra_tools = item3.softwares;
          if (item.service_id == item2.server_id) {
            item.server_details = item2;

            if (item.server_details.softwares && item['server_details'].softwares != "NA" && JSON.parse(item.server_details.softwares)) {
              // if (this.pm_can_edit)
              //   item.extra_tools = { ...JSON.parse(item3.softwares) };
              item.server_details.softwares = Object.values(JSON.parse(item.server_details.softwares)['tools']).join(", ");
            }
            if (item.extra_tools && JSON.parse(item.extra_tools)) {
              item.extra_tools = JSON.parse(item.extra_tools);
              item.extra_tools_user = { ...item.extra_tools };
            }

            sec_2_n_.push(item);
          }
        });
      });

      this.order_details = sec_1['request'][0];
      this.order_details['expired'] = moment().isAfter(moment(this.order_details.end_date, "MM/DD/YYYY"), 'day')
      this.order_details.servers_list = sec_2_n_;

      if (this.login_data.role.toLowerCase() != "pm")
        this.order_details.budget = project_budget['request'][0];
      // this.order_details.price = 9999999;
      console.log(this.order_details)
      if (this.order_details.instance_type.toLowerCase() != 'switch')
        this.loadOSnApps_4pm(this.order_details);
      //  }, 100);


    } catch (err) {
      console.log({ err });
      this.loader.hide();
      localStorage.setItem('multiple_http_', '');
    }
  }

  approve() {
    this.ApproveRequest();
  }

  reject() {
    bootbox.prompt({
      title: "Reason for Rejection",
      inputType: 'textarea',
      buttons: {
        confirm: {
          label: 'Reject',
          className: 'btn-success yes-btn'
        },
        cancel: {
          label: 'Cancel',
          className: 'btn-danger no-btn'
        }
      },
      callback: (result) => {
        console.log(result);
        if (result) // return "ok";
          this.ProvisionReject(result)
        // else alert("")
      }
    });
  }

  ApproveRequest() {
    var status;
    var day = new Date();
    var today = ("0" + (day.getMonth() + 1)).slice(-2) + "/" + ("0" + day.getDate()).slice(-2) + "/" + day.getFullYear();
    //console.log("today " + today);

    // var startdate: any = JSON.parse(this.auth.orderData);
    // console.log("start date " + startdate[0].start_date);

    let isSwitch = this.order_details.servers_list.filter((item) => item.service_name.replace(/ /g, "").toLowerCase().includes('switch'));

    status = isSwitch && isSwitch.length ? "PROVISIONED" : "APPROVED";

    var data = JSON.stringify({ "login": this.auth.data, "action": "update", "request_id": this.request_id, "status": status })
    // console.log(data, this.order_details);
    // return '';
    this.webService.RequestData(data).subscribe(res => {
      var response: any = res;
      //console.log(response);
      if (response.job == true) {
        this.bootAlert("Submitted successfully")
        this.webService.message = "Submitted successfully";
        this._location.back();
        // this.submitResult()
        setTimeout(() => {
          // window.location.href="/AdminDashboard"
          // window.location.reload();
        }, 3000)
      } else {
        this.bootAlert("Something went wrong! Please try again.")
        this.webService.message = "Submitted Failed"
        // this.submitResult()
        setTimeout(() => {
          //   window.location.reload();
          //  window.location.href="/AdminDashboard"
        }, 3000)
      }
    })
  }

  ProvisionReject(reason) {

    var data = JSON.stringify({
      "login": this.auth.data, "action": "update",
      "request_id": this.request_id, "status": "REJECTED", "reason": reason
    })
    //console.log(data)
    this.webService.RequestData(data).subscribe(res => {
      var response: any = res;
      // console.log(res);
      if (response.job = true) {
        //this.dialogRef.close();
        this.bootAlert("Rejected Successfully")
        this.webService.message = "Rejected Successfully";
        this._location.back();
        // this.submitResult()
        //setTimeout(() => {
        // console.log("jsajsdj")

        //window.location.href="/AdminDashboard"
        //this.router.navigate(['/AdminDashboard']);
        //    },3000)
      }
      else {
        this.bootAlert("Something went wrong! Please try again.")
        this.webService.message = "Submitted Failed";
        // this.dialogRef.close();
        // this.submitResult()
        // setTimeout(() => {
        //   this.router.navigate(['/AdminDashboard']);
        //  window.location.href="/AdminDashboard"
        //  },3000)
      }
    })
  }

  provision() {
    //console.log(this.order_details);
    let status = "ALLOCATED";
    if (moment(this.order_details.start_date, "MM/DD/YYYY").isSame(moment(), 'day')) {
      status = 'PROVISIONED';
    }

    this.ProvisionRequest(status);
  }

  ProvisionRequest(status) {

    // var status;
    // var day = new Date();
    // var today = ("0" + (day.getMonth() + 1)).slice(-2) + "/" + ("0" + day.getDate()).slice(-2) + "/" + day.getFullYear();
    // console.log("today " + today);

    // var startdate: any = JSON.parse(this.auth.orderData);
    // console.log("start date " + startdate[0].start_date);
    // if (today == startdate[0].start_date) {
    //   status = "PROVISIONED";
    // }
    // else {
    //   status = "ALLOCATED";
    // }


    var data = JSON.stringify({ "login": this.auth.data, "action": "update", "request_id": this.request_id, "status": status })
    //console.log(status, data)
    this.webService.RequestData(data).subscribe(res => {
      var response: any = res;
      // console.log(response);
      if (response.job == true) {
        this.bootAlert("Provisioned successfully", '/AdminDashboard/orders');
        this.webService.message = "Provisioned successfully"
        // this.submitResult()
        setTimeout(() => {
          // window.location.href="/AdminDashboard"
          // window.location.reload();
        }, 3000)
      } else {
        this.bootAlert("Provision Failed");
        this.webService.message = "Provision Failed"

      }
    });
    // setTimeout(() => {
    //   this.loader.hide();
    //   this.api.successToast("Provisioned successfully.");
    //   this.back();
    // }, 4000);
  }

  back() {
    this._location.back();
  }


  // pm functions 

  pmCancelReq() {
    // let data = {"login":"{\"user_name\":\"Sam\",\"user_id\":\"Sam\",\"job\":true,\"project_id\":[\"NextGen\"],\"role\":\"PM\"}","status":"DELETED","action":"cancel","request_id":"req_0119"}
    bootbox.confirm({
      message: "Are you sure, You want to cancel this request?",
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
      callback: (result) => {
        // console.log('This was logged in the callback: ' + result);
        if (result) {
          let data = JSON.stringify({
            login: this.auth.data,
            "status": "DELETED",
            "action": "cancel",
            "request_id": this.request_id
          });
          this.api.cancelReq(data).subscribe(
            res => {
              // console.log({ res });
              if (res['job'])
                this.bootAlert("Request Cancelled.", "back");
            },
            err => {
              //console.log({ err });
              this.bootAlert("Something went wrong. Please try again")
            }
          );
        }

      }
    });
  }

  pmEdit(value) {
    this.enable_pm_edit = value;
    if (value == false)
      this.order_details['servers_list'].map((item) => {
        item['custom_data'] = {};
      })
  }

  pmEditSubmit() {
    let new_change = false
    let req = {};
    //console.log(this.order_details);
    this.order_details.servers_list.map((server) => {
      let install = {};
      server.custom_data && server.custom_data.apps && server.custom_data.apps.map((app) => {
        install[app.service_name] = app.versions;
      })
      let uninstall = {};
      server.custom_data && server.custom_data.uninstall_list && server.custom_data.uninstall_list.filter((it) => it.user_uninstall).map((app) => {
        uninstall[app.service_name] = app.versions;
      })
      req[server.service_id] = {
        install, uninstall
      };
    })

    //console.log({ req });
    Object.values(req).map((item) => {
      Object.values(item).map((it) => {
        // console.log(it)
        if (Object.keys(it).length) {
          new_change = true;
        }
      })
    })
    if (!new_change) {
      this.api.errorToast("Alter softwares to submit!");
      // this.bootAlert("Alter softwates to submit!")
      return false;
    }

    console.log({ req });
    // return false;

    this.api.configure(req).subscribe(
      res => {
        // console.log({ res })
        // this.showResultPm(res);
        if (res) {
          let new_res = {};
          Object.keys(res).map((ed_server) => {
            this.order_details.servers_list.map((server) => {
              if (ed_server == server.service_id) {
                new_res[`${server.service_name} (${ed_server})`] = res[ed_server];
              }
            })
          })

          this.edit_response = new_res;
          // console.log(new_res);
          setTimeout(() => {
            this.load_sw_update_modal();
            //  this.ngOnInit();
          }, 100);
          this.api.successToast(`Req: ${this.request_id} services has been updated, Check for request changes.`)
        } else {
          console.log("no response ");
          this.api.errorToast(`Something went wrong in updating req:  ${this.request_id}. Please try again.`)
        }
      },
      err => {
        // console.log({ err })
        // let res = {
        //   serv_4022: {
        //     install: {
        //       java9: 'failed',
        //       aapache77: 'success'
        //     },
        //     uninstall: {
        //       java7: "success",
        //       vscode: "success"
        //     }
        //   },
        //   serv_4016: {
        //     install: {
        //       java9: 'success',
        //       aapache77: 'success'
        //     },
        //     uninstall: {
        //       java7: "success",
        //       vscode: "failed"
        //     }
        //   },
        // };


        this.api.errorToast("Something went wrong please try again");
      }
    );
    this.api.infoToast("Request is being processed...");
    setTimeout(() => {
      // this.back();
      // this.loader.hide();
    }, 2000)

  }


  loadOSnApps_4pm(orderData) {
    this.api.getCatalog().subscribe(
      res => {

        res['catalogue'] = res['catalogue'].map((item) => {
          item.checked = false;

          return item;
        })
        // this.os_list = res['catalogue'].filter((item) => item.service_type == 'bare_metal_os');
        const apps_list = res['catalogue'].filter((item) => item.service_type == 'bare_metal_software');
        orderData.servers_list.map((item) => {
          //console.log({ apps_list })
          item['custom_data'] = {};
          item['custom_data_temp'] = {};
          item['edit_modal_enable'] = false;
          // item['os_to_select'] = [...this.os_list].map((item) => { return { ...item } });
          item['app_to_select'] = apps_list.map((app) => {
            app = { ...app };

            // Object.values(item.server_details_user.software.tools).map((installed_sw) => {
            Object.values(item.extra_tools.tools).map((installed_sw) => {
              // console.log(app.versions, installed_sw)
              if (app.versions == installed_sw) {
                app['installed'] = true
              }
            })

            return { ...app }
          });
          // return { ...item };
        });
      }
    );
  }

  doModal(list, title, inputType, row) {

    this.modal_data = {
      title: "",
      inputType: "",
      installed_list: [],
      list: [],
      row: ''
    }

    setTimeout(() => {
      this.modal_data = {
        ...{
          installed_list: list.filter((item) => item.installed),
          list: list.filter((item) => !item.installed),
          inputType: inputType,
          title: title,
          row
        }
      }
    }, 100);
  }

  pm_uninstall_apps(value, server, list) {
    server.edit_modal_enable = true;
    server['custom_data_temp']['uninstall_list_temp'] = list.map((item) => item.service_id);


  }

  osNappsSelection(inputType, event, server, row) {
    row.checked = !row.checked;

    if (inputType == 'radio' && event.target.checked) {
      this.modal_data.list = this.modal_data.list.map((item) => {
        if (item.service_id !== row.service_id) {
          item.checked = false;
        }
        return item;
      })
      server['custom_data']['os'] = row.service_name;
      server['custom_data']['os_id'] = row.service_id;
      row.checked = true;

    }
    else if (inputType == 'checkbox') {
      server.edit_modal_enable = true;
      server['custom_data_temp']['apps_temp'] = this.modal_data.list.filter((item) => item.checked).map((item) => item.service_id)// .map((item) => item.servie_id);
    }

    //console.log(this.selected_list)

  }


  cancelOnUninstallModal(server) {
    console.log(server)
    let uninstall_temp = [...server['custom_data_temp']['uninstall_list_temp'] || []];
    let install_temp = [...server['custom_data_temp']['apps_temp'] || []];

    server['custom_data_temp'] = {};
    if (install_temp && install_temp.length) {
      server.app_to_select.map((item) => {
        if (install_temp.includes(item.service_id)) item.checked = false;
      })
    }

    if (uninstall_temp && uninstall_temp.length) {
      server.app_to_select.map((item) => {
        if (uninstall_temp.includes(item.service_id)) item.user_uninstall = false;
      })
    }

  }

  submitOnUninstallModal(server) {
    console.log(server);
    server['custom_data_temp'] = {};
    server['custom_data']['apps'] = server.app_to_select.filter((item) => !item.installed && item.checked)
    server['custom_data']['uninstall_list'] = server.app_to_select.filter((item) => item.installed && item.user_uninstall)
  }


  release() {
    // release by pm 
    bootbox.confirm({
      message: "Are you sure, You want to release this request?",
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
      callback: (result) => {
        // console.log('This was logged in the callback: ' + result);
        if (result) {
          let req = {
            "login": this.auth.data, // {"user_name":"Sam","user_id":"Sam","job":true,"project_id":["NextGen"],"role":"PM"},
            'request_id': this.request_id,
            'status': 'RELEASED',
            'instance_type': 'Physical'
          }
          this.api.releaseReq(req).subscribe(
            res => {
              if (res['job']) {
                this.api.successToast("Released successfully");
                this._location.back();
              }
            },
            err => {
              this.api.errorToast(this.api.commonError);
            }
          );
        }

      }
    });

  }

  showResultPm(res) {
    bootbox.confirm({
      title: "Destroy planet?",
      message: "Do you want to activate the Deathstar now? This cannot be undone.",
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i> Cancel'
        },
        confirm: {
          label: '<i class="fa fa-check"></i> Confirm'
        }
      },
      callback: function (result) {
        console.log('This was logged in the callback: ' + result);
      }
    });
  }

  load_sw_update_modal() {
    // this.edit_response = 
    $('#edit_server_modal').click();
  }

  bootAlert(text, redirectTo?) {
    bootbox.alert({
      message: text || "This is an alert with a callback!",
      callback: () => {
        if (redirectTo == 'back') this.back();
        if (redirectTo != 'back' && redirectTo)
          this.router.navigate([redirectTo]);
      }
    })
  }


}
