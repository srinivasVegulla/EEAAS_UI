import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from "../../../services/api.service";
import { AuthService } from '../../../../services/auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as moment from 'moment';

declare var bootbox;
@Component({
  selector: 'app-reserve-switch',
  templateUrl: './reserve-switch.component.html',
  styleUrls: ['./reserve-switch.component.css']
})
export class ReserveSwitchComponent implements OnInit {
  JSON = JSON;
  configure_switch = true;
  modal_data = {
    title: "",
    inputType: "",
    list: [],
    row: ''
  }
  server_4_versions: any;
  seletedFirmVersion;
  sw_versions = [];

  selected_list = [
    {
      name: "LENEVO_BDSS2"
    },
    {
      name: "LENEVO_BDSS3"
    },
    {
      name: "LENEVO_BDSS5"
    },
    {
      name: "LENEVO_BDSS7"
    },
  ];
  order_details = {
    project_name: 'something',
    start_date: new FormControl(new Date()),
    end_date: new FormControl(new Date()),
    servers: null
  };
  sw_details = [{
    id: 'vlan',
    name: 'VLAN DETAILS',
    info: {

      // key is colounm name and value is to get it from list for rows
      "VLAN NAME": 'name',
      "VLAN ID": 'vlan_id',
      "PORTS": 'ports_text',
      // vlan_name: 'test VLAN',
      // vlan_id: 20,
      // ports: ['port1', 'port3', 'port5']
    }
  },
  {
    id: 'acl',
    name: 'ACL DETAILS',
    info: {
      "ACL NAME": 'acl_name',
      // "ACL ID": 'id',
      "ACL TYPE": 'acl_type'
      // vlan_name: 'test VLAN',
      // acl_id: 102,
      // acl_type: 'AT_EXTENDED_IPV4'
    }
  },
  // {
  //   id: 'qos',
  //   name: 'QOS DETAILS',
  //   info: {
  //     // vlan_name: 'test VLAN',
  //     // policy_name: 'Policy Test',
  //     // policy_type: 'Type 1'
  //   }
  // },
  {
    id: 'user',
    name: 'USER DETAILS',
    info: {
      "USER NAME": 'name',
      "PASSWORD": 'password',
      "USER TYPE": 'type'
    }
  },
  {
    id: 'system',
    name: 'SYSTEM',
    info: {
      "SYSTEM DETAILS": 'SYSTEM DETAILS'
    }
  }]

  Object = Object;
  project_name_available: any;
  request_id: any;
  sub: any;
  constructor(
    private Activatedroute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private _location: Location,
    private auth: AuthService,
    private loader: Ng4LoadingSpinnerService,
  ) { }

  ngOnInit() {
    // this.loaddata();
    this.project_name_available = this.api.getItem('project_id') && this.api.getItem('project_id')[0]
    this.order_details.project_name = this.api.getItem('project_id')[0];

    this.sub = this.Activatedroute.queryParamMap
      .subscribe(params => {
        // pm_can_edit, pm_can_cancel_req
        this.request_id = params.get('request_id');
        if (this.request_id) this.loaddata(this.request_id);
      });
  }

  remove(selected_list, index, confirm) {
    if (confirm)
      bootbox.confirm({
        size: "small",
        message: "Are you sure you want to delete?",
        callback: function (result) { /* result is a boolean; true = OK, false = Cancel*/
          if (result) selected_list.splice(index, 1);
        }
      })
    else selected_list.splice(index, 1);

  }

  async loaddata(request_id) {
    try {
      localStorage.setItem('multiple_http_', 'true');

      // let sw_conf = await this.api.switchConfig(sw_data).toPromise();
      let data1 = { 'project_id': JSON.parse(this.auth.data)['project_id'], 'action': 'read', 'request_id': request_id }; // {'project_id': ['NextGen', 'IoT'], 'action': 'read', 'request_id': request_id}
      let data2 = { "action": "read", "request_id": request_id }; // {"action":"read","request_id":"req_0102"}
      this.loader.show();
      let sec_1 = await this.api.getReq_data1_lm(data1).toPromise();
      let sec_2 = await this.api.getReq_data2_lm(data2).toPromise();

      let server_details = await this.api.getServerDetails(sec_2['request'].map((item) => item.service_id)).toPromise();
      let server_details_user = await this.api.getServerDetails_user(sec_2['request'].map((item) => item.service_id)).toPromise();
      // let req_price = await this.api.getReq_data1_lm({ 'action': 'read', 'request_id': request_id }
      // ).toPromise(); // duplicate of sec_1
      console.log({ sec_1, sec_2, server_details, server_details_user });
      // to add user added details to a server
      let sec_2_n = [];

      sec_2 && sec_2['request'].map((item) => {

        server_details_user && server_details_user['opnfv'].map((item2) => {
          item2.software = typeof item2.software == 'string' ? JSON.parse(item2.software) : item2.software;
          if (item.service_id == item2.service_id) {
            item.server_details_user = item2;
            item.sw_details = [...this.sw_details].map((item) => { item['_id'] = this.api.getRandomNumber(); return { ...item } });
            sec_2_n.push(item);
          }
        });

      });

      // to add server configuration details to a server
      let sec_2_n_ = [];

      sec_2_n.map((item) => {
        server_details && server_details['server_details'].map((item2) => {
          if (item.service_id == item2.server_id) {
            item.server_details = item2;
            sec_2_n_.push(item);
          }
        });
      });





      this.order_details = sec_1['request'][0];
      this.order_details.servers = sec_2_n_;
      this.order_details['expired'] = moment().isAfter(moment(sec_1['request'][0].end_date, "MM/DD/YYYY"), 'day')

      // to add switch configure details to a server
      if (this.order_details.servers && this.order_details.servers.length)
        for (let i = 0; i < this.order_details.servers.length; i++) {
          let item = this.order_details.servers[i];
          let sw_data = {
            "service_id": item.service_id,
            "switch_ip": item.server_details.Ip_Address,
            "config": {
              "vlan": { "method": "read" },
              "qos": { "method": "read" },
              "acl": { "method": "read" },
              "resources": { "method": "read" },
              "system": { "method": "read" },
              "user": { "method": "read" },
              "port": { "method": "read" }
            },
            "switch_cred": { "userName": "admin", "password": "Admin123" }
          };
          let res = await this.api.switchConfig(sw_data).toPromise();

          item.sw_conf = [...res['response']].map((item) => { return { ...item } });
          item.sw_conf[0].vlan_element.map((vl) => {
            vl.ports_text = '';
            vl.ports = [];
            item.sw_conf[6].vlan_port_element.map((port) => {
              if (vl.vlan_id == port.vlan_id) {
                vl.ports.push(port);
                let comma = vl.ports_text.length ? ", " : '';
                vl.ports_text = vl.ports_text + comma + port.port_id;
              }
            })
          })

          item['sw_details'].map((svr) => {
            if (svr.id == 'vlan') svr.data = res['response'][0]['vlan_element'];
            if (svr.id == 'acl') svr.data = res['response'][2]['acl_element'];
            if (svr.id == 'qos') svr.data = res['response'][1]['qos_policy_element'];
            if (svr.id == 'user') svr.data = res['response'][5]['device_management_user_element'];
            if (svr.id == 'system') {
              svr.data = res['response'][4];
              svr.data['total_memory_in_bytes'] = this.api.bytesToSize(Number(svr.data['total_memory_in_bytes']));
              delete svr.data.base_ethernet_address;
              delete svr.data.uri;
            }
          });



        }



      this.order_details.start_date = new FormControl(moment(sec_1['request'][0].start_date, "MM/DD/YYYY").format());
      this.order_details.end_date = new FormControl(moment(sec_1['request'][0].end_date, "MM/DD/YYYY").format());

      console.log(this.order_details)
      // setTimeout(() => {
      //   this.order_details['servers'][0]['sw_details'][2]['data'][0] = { "name": "something", "password": "something", "type": "something" }
      // }, 5000);

      this.loader.hide();
      localStorage.setItem('multiple_http_', '');
    } catch (err) {
      console.log({ err });
      this.loader.hide();
      localStorage.setItem('multiple_http_', '');
    }

  }

  addRow(sw) {
    if (!this.order_details['expired']) {
      console.log({ sw });
      let new_rec = {
        input: true,
        new: true
      };
      Object.values(sw.info).map((key) => {
        new_rec["" + key] = ""; // pending
      });
      sw.data.push(new_rec);
    }
  }

  row_action(server, sw_confg, row, action, index?) {
    console.log(this.order_details, { server, sw_confg, row, action, index });
    if (!this.order_details['expired']) {
      let newRow = { ...row };
      if (action == 'edit') {
        // row.input = true;

        if (sw_confg.id != 'user')
          this.api.infoToast("Edit is not available temporarily!");
        else {
          row.password = "";
          row.input = true;
        }
      }

      else if (action == 'cancel') {
        if (row.new) return this.remove(sw_confg.data, index, false)
        row.input = false;

      } else if (action == 'create') {

        if (!row.new) action = 'update';

        this.pm_config_sw(server, sw_confg, newRow, action, index, row);
      } else if (action == 'delete') {

        console.log(typeof newRow.vlan_id);
        if (sw_confg.id == 'vlan' && newRow.name) delete newRow.name;
        this.pm_config_sw(server, sw_confg, newRow, action, index, row)
      }

    }

  }

  pm_config_sw(server, sw_confg, row, action, index?, origial_row?) {
    // return false;

    let request = {
      "service_id": server.service_id,
      "switch_ip": server.server_details.Ip_Address,
      "switch_cred": { "userName": "admin", "password": "Admin123" },
      // "config": {
      //     "vlan": { "vlan_id": 14, "name": "Test_vlan", "method": "create" }
      // },
      config: {}
    };

    let some = {};

    Object.values(sw_confg.info).map((item) => {
      if (item != 'ports_text')
        some["" + item] = row["" + item]
    })

    if (some['ports_text']) delete some['ports_text']

    some['method'] = action;

    if (sw_confg.id == 'user') some['password_type'] = "PET_PLAIN_TEXT";

    if (action == 'delete' && sw_confg.id == 'acl') {
      console.log({ row });

      some = {
        acl_id: row.id,
        method: action
      }
    }

    if (action == 'delete' && sw_confg.id == 'vlan') {
      some = {
        method: action,
        vlan_id: row.vlan_id
      }
    }

    if (action == 'create' && sw_confg.id == 'vlan') {
      if (some['vlan_id']) some['vlan_id'] = Number(some['vlan_id'])
    }




    request.config[sw_confg.id] = some;
    row.input = false;


    console.log(request);
    // return false
    this.api.configureSwitch(request).subscribe(
      res => {
        let message = '';
        if (res['response'] && res['response'][0]) {
          if (res['response'][0].message) {
            this.api.errorToast(`${res['response'][0].message}`);
            if (action == 'create')
              this.remove(sw_confg.data, index, false)
            return false;
          }
          if (res['response'][0]) {
            if (action == 'delete')
              this.remove(sw_confg.data, index, false);

            if (action == 'update' && sw_confg.id == 'user' && origial_row) {
              origial_row.password = "********";
            }
            this.api.successToast(`${this.api.humanize(sw_confg.id)} ${this.api.capitalize(action)}d Successfully.`)


            // if (action == 'delete') {
            //   // {"response": [{"response": "deleted"}]}
            //   // { "response": [{ "uri": "/vlans/14", "vlan_id": 14, "name": "Test_vlan", "status": "VS_PORT_BASED", "type": "VT_STATIC", "is_voice_enabled": false, "is_jumbo_enabled": false, "is_dsnoop_enabled": false, "is_dhcp_server_enabled": false }] }

            //   if (res['response'][0]['response'] == 'deleted') {
            //     message = sw_confg.id + ' deleted successfully';
            //   }


            // } else if (action == 'create') {
            //   if (res['response'][0].name || res['response'][0].acl_name) {
            //     let text = res['response'][0].name || res['response'][0].acl_name;
            //     message = text + " created successfully";
            //   }
            // }
            // this.api.successToast(message);
          } else {
            row.input = true;
            this.api.errorToast('Unable to proces the request!');
          }
        } else {
          this.api.errorToast('Unable to proces the request!');
        }
      },
      err => {
        this.api.errorToast('Unable to proces the request!');
      }
    );
  }

  showversions(server, curVersion) {
    this.server_4_versions = server;
    curVersion = curVersion.split('.').join('_');
    console.log(curVersion)
    // this.seletedFirmVersion = curVersion;
    this.sw_versions = [...['WB_16_02_0026', 'WB_16_03_0007', 'WB_16_04_0016']].filter((item) => item != curVersion);
    this.seletedFirmVersion = this.sw_versions[0];
    console.log(this.sw_versions, curVersion);
  }

  update_version(server, version) {
    console.log(server, version);

    let myTimeout = setTimeout(() => {
      this.loader.hide();
      this.api.successToast("Switch version update is being processed... It may take few minutes.");
      $("#version-pop-close").click();
      this.back();
    }, 5000);
    this.api.update_sw_ver({ "switch_ip": server.server_details.Ip_Address, "version": version }).subscribe(
      res => {
        if (res['job'])
          this.api.successToast("Version updated.");
        else {
          this.api.errorToast(res['error'] || this.api.commonError);
          clearTimeout(myTimeout);
        }
      },
      err => {
        this.api.errorToast(this.api.commonError);
        clearTimeout(myTimeout);
      }
    );

  }

  // release() {
  //   // release by pm 
  //   let req = {
  //     "login": this.auth.data, // {"user_name":"Sam","user_id":"Sam","job":true,"project_id":["NextGen"],"role":"PM"},
  //     'request_id': this.request_id,
  //     'status': 'RELEASED',
  //     'instance_type': 'Physical'
  //   }
  //   this.api.releaseReq(req).subscribe(
  //     res => {
  //       if (res['job']) {
  //         this.api.errorToast("Released successfully");
  //         this._location.back();
  //       }
  //     },
  //     err => {
  //       this.api.errorToast(this.api.commonError);
  //     }
  //   );
  // }

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
                this.api.errorToast("Released successfully");
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

  dateChange(data, field) {
    this.order_details[field] = new FormControl(data);
  }

  back() {
    this._location.back();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  icons() {

    // .next-collapse:after {
    // //   /* symbol for "opening" panels */
    // //   font-family: 'Glyphicons Halflings';
    // //   /* essential for enabling glyphicon */
    // //   content: "\e114";
    // //   /* adjust as needed, taken from bootstrap.css */
    // //   float: right;
    // //   /* adjust as needed */
    // //   color: white;
    // //   /* adjust as needed */
    // // }

    // // .next-collapse .collapsed:after{
    // // /* symbol for "collapsed" panels */
    // // content: "\e080";
    // // /* adjust as needed, taken from bootstrap.css */
    // // }

  }

}
