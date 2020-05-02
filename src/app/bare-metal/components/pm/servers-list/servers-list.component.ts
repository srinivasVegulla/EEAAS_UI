import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as _ from 'lodash';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from "../../../../services/auth.service";
import * as moment from 'moment';
declare var bootbox;
declare var $;

@Component({
  selector: 'app-servers-list',
  templateUrl: './servers-list.component2.html',
  styleUrls: ['./servers-list.component.css']
})
export class ServersListComponent implements OnInit {
  Object = Object;
  isArray = Array.isArray;
  public tabdata = [
    { tab: "PHYSICAL SERVERS", value: "somedata1", id: "bare_metal", displayedColumns: ["checked", "name", "location", "os", "softwares", "allocatedTo", "pricePerHr"], filterColumns: ["name", "location", "os", "softwares", "allocatedTo", "pricePerHr"] },
    { tab: "SWITCHES", value: "somedata2", id: "switch", displayedColumns: ["checked", "name", "location", "os", "model", "allocatedTo", "pricePerHr"], filterColumns: ["name", "location", "os", "model", "allocatedTo", "pricePerHr"] },
    { tab: "VDEs", value: "somedata3", id: "VDE", displayedColumns: ["checked", "name", "location", "os", "softwares", "allocatedTo", "pricePerHr"], filterColumns: ["name", "location", "os", "softwares", "allocatedTo", "pricePerHr"] },
    { tab: "SERVICES", value: "somedata4", id: "service", displayedColumns: ["checked", "name", "location", "os", "softwares", "allocatedTo", "pricePerHr"], filterColumns: ["name", "location", "os", "softwares", "allocatedTo", "pricePerHr"] }
  ];
  bareMetalDataSource: any;
  // displayedColumns = ["checked", "name", "os", "available_from", "available_till", "reservedBy", "allocatedTo", "pricePerHr"];
  displayedColumns = ["checked", "name", "os", "softwares", "allocatedTo", "pricePerHr"];
  // filterColumns = ["name", "os", "available_from", "available_till", "reservedBy", "allocatedTo", "pricePerHr"];
  filterColumns = ["name", "os", "softwares", "allocatedTo", "pricePerHr"];
  modal_data: any;
  modal_data_inv: any;
  current_tab: any;
  selected_servers = {};
  project_name_available: any;
  enableReserveBtn = true;
  webService = {
    project_name: "",
    currentDate: new Date(),
    todayDateReservation: new Date(),
    lastDateReservation: new Date(),
    selectedDelivaryLocation: "hyderabad"

  }
  // pagination
  // pageLength: number;
  // pageSize: 5;
  // pageSizeOptions = [5, 10, 25, 100];
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(
    private api: ApiService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private auth: AuthService,
    private loader: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    // this.sample();
    // this.getList();
    this.getFilteredData();
    this.selectTab(this.tabdata[0].id);
    this.project_name_available = this.api.getItem('project_id') && this.api.getItem('project_id')[0]
    this.webService.project_name = this.api.getItem('project_id')[0];
  }

  selectTab(tab) {
    this.current_tab = tab;
    console.log(this.selected_servers);
    Object.values(this.selected_servers).map((item) => item['checked'] = false)
    this.selected_servers = {};
    this.changeDetectorRefs.detectChanges();
    this.enableReserveBtn = true;
    // this.getFilteredData();
  }

  getFilteredData(from?) {
    // console.log(this.webService);
    let string = "";
    if (!this.webService.todayDateReservation)
      string += "Start Date, ";
    if (!this.webService.lastDateReservation)
      string += "End Date ";

    if (string) bootbox.alert("Enter " + string)

    else
      this.getList(from);
  }
  tValue = ['', '', '', '', '', ''];

  applyFilter(text, field, service_type, i) {
    // console.log({ text, field, service_type });
    this.tValue[i] = text;
    let fltr_dta = [];
    this.tabdata.map((item, i) => {
      if (item.id == service_type) {
        item['data_pg'] = _.filter(item['data'], function (row) {
          return String(row[field]).toLowerCase().indexOf(text.toLowerCase()) > -1;
        })
        item['pageLength'] = item['data_pg'].length;
        this.pageChangeEvent(item, item['data_pg'], item);
        // new MatTableDataSource(_.filter(item['data'], function (row) {
        // return String(row[field]).toLowerCase().indexOf(text.toLowerCase()) > -1;
        // }));
        // => objects for ['barney']

      }
    })
  }

  clear(i, field, current_tab) {
    this.tValue[i] = '';
    this.applyFilter("", field, current_tab, i);
  }

  clearAll() {
    this.tValue = ['', '', '', '', '', ''];
    //this.applyFilter("", field, current_tab, i);
    this.ngOnInit()
  }

  async getList(from?) {

    // let bare_metal = [];
    // let switch = []; 
    //   let vde = [];
    // let service = [];
    // console.log(JSON.parse(this.auth.data)['project_id'][0]);

    try {
      localStorage.setItem('multiple_http_', 'true');
      this.loader.show();
      let get_server_list_data = { "start_date": moment(this.webService.todayDateReservation).format('MM/DD/YYYY') + " 00:00:00", "end_date": moment(this.webService.lastDateReservation).format('MM/DD/YYYY') + " 00:00:00", "action": "search", "location": this.webService.selectedDelivaryLocation.toLowerCase() || "all", project_id: JSON.parse(this.auth.data)['project_id'][0] }
      let inventoryList = await this.api.getServerList(get_server_list_data).toPromise(); // .subscribe(

      let catogeryList = await this.api.getCatalog().toPromise();

      // code to get physical servers and switches
      let inv_list = inventoryList['serverlist']['servers'].map((item, i) => {
        catogeryList['catalogue'].map((catg, j) => {
          if (item.service_id == catg.service_id) {
            item['type'] = catg;
            item['service_type'] = catg.service_type;
          }
        });
        return item;
      });
      let server_details_hover = await this.api.getServerDetails().toPromise();
      console.log({ server_details_hover });
      inv_list && inv_list.map((item) => {
        server_details_hover && server_details_hover['server_details'].map((hover_detail) => {
          let hover_details_ = { ...hover_detail };
          // console.log({ hover_details_ })
          if (hover_details_.softwares && hover_details_.softwares != "NA" && JSON.parse(hover_details_.softwares)) {
            let softwares = { ...JSON.parse(hover_details_.softwares) };
            if (softwares.tools && softwares.tools != "NA") {
              hover_details_.softwares = Object.values(softwares.tools).join(", ");
            }

          }
          if (item.service_id == hover_details_.server_id) item['hover_details'] = hover_details_;
        })
      })
      console.log({ server_details_hover });



      console.log({ inventoryList }, { catogeryList }, { inv_list });
      // let filteredTableData = inventoryList['serverlist']['servers'].map((item, i) => {
      let filteredTableData = inv_list.map((item, i) => {
        let softwares = "NA";
        if (item.software && item.software != "NA" && JSON.parse(item.software)) {
          item.software = JSON.parse(item.software);
          item['os'] = item.software['os'];
          if (item.software.tools) {
            softwares = Object.values(item.software.tools).join(", ");
          }

        }

        if (item.configurations && item.configurations != "NA" && JSON.parse(item.configurations.replace(/'/g, `"`))) {
          item.configurations = JSON.parse(item.configurations.replace(/'/g, `"`));
          item['model'] = item.configurations.specs[0].model;
        }
        return {
          "location": item.location || 'NA',
          "raw_data": item,
          "available_from": '',
          "available_till": '',
          "checked": false,
          "serviceid": item.service_id,
          "name": item.name,
          "status": item.status,
          "reservedBy": item.consumer,
          "allocatedTo": item.project,
          "pricePerHr": item.price_per_hr,
          softwares,
          os: item['os'] || "NA",
          model: item['model'] || 'NA'
        }

      });
      console.log({ filteredTableData });

      filteredTableData.map((item, i) => {
        this.tabdata.map((item2, i) => {
          if (item['raw_data']['type'].service_type == item2.id) {
            if (!item2['data']) item2['data'] = [item];
            item2['data'].push(item);
          }
        })
      });

      this.set_popovers(filteredTableData);

      // code to get VDEs

      let switch_list_cat = catogeryList['catalogue'].filter((item) => item.service_type == "switch");
      let service_list_cat = catogeryList['catalogue'].filter((item) => ['vm', 'container'].includes(item.image_type) && !['switch', 'VDE', 'bare_metal'].includes(item.service_type)).map((item) => {
        return {
          "raw_data": item,
          "location": item.location || "NA",
          "available_from": '', // 404
          "available_till": '', // 404 
          "checked": false,
          "serviceid": item.service_id,
          "name": item.service_name,
          "status": item.status,
          "reservedBy": item.consumer || '', // 404
          "allocatedTo": item.project || '', // 404
          "pricePerHr": item.price_per_hr,
          os: item['os'] || "NA" // 404
        }
      });

      let vdes_list = catogeryList['catalogue'].filter((item) => item.service_type == "VDE").map((item, i) => {
        // return item;
        return {
          "raw_data": item,
          "location": item.location || "NA",
          "available_from": '', // 404
          "available_till": '', // 404 
          "checked": false,
          "serviceid": item.service_id,
          "name": item.service_name,
          "status": item.status,
          "reservedBy": item.consumer || '', // 404
          "allocatedTo": item.project || '', // 404
          "pricePerHr": item.price_per_hr,
          os: item['os'] || "NA" // 404
        }

      })

      console.log("hiiiiiiiiiiiiiiiii", this.tabdata);

      this.tabdata.map((item) => {
        if (item.id == 'VDE') {
          item['data'] = vdes_list;
        }
        else if (item.id == 'service') {
          item['data'] = service_list_cat;
        }
        item['data'] = item['data'] ? _.uniqBy(item['data'], 'serviceid') : []
      })

      //  Services = Filter output from catalogue where image_type in ('vm','container') and service_type not in ("VDE","bare_metal","switch");



      console.log({ vdes_list, switch_list_cat, service_list_cat });

      this.tabdata.map((item) => {
        item['pageSize'] = 5;
        item['pageLength'] = item['data'].length;
        item['data_pg'] = item['data'];
        item['data_4_tabl'] = new MatTableDataSource(item['data']);
        this.pageChangeEvent(item, item['data_pg'], item);
        // item['data_4_tbl_filtr'] = new MatTableDataSource(item['data'].slice(((0 + 1) - 1) * item['pageSize']).slice(0, item['pageSize']));
        // item['data_4_tbl_filtr'] = new MatTableDataSource(item['data']);

        // item['data_4_tbl_filtr']['paginator'] = this.paginator;
      })


      // raw_data.type.service_type

      console.log("hiiii 2", this.tabdata);
      this.bareMetalDataSource = new MatTableDataSource(filteredTableData);
      setTimeout(() => {
        this.loader.hide();
        localStorage.setItem('multiple_http_', '');
      }, 1000);
      // if (from)
      //  $("#exp-date-range").click();
    } catch (err) {
      // console.log({ err })
      setTimeout(() => {
        this.loader.hide();
        localStorage.setItem('multiple_http_', '');
      }, 1000);
    }

  }

  async getRecord(event, row) {

    $("#show_modal").click();
    event.preventDefault();
    event.stopPropagation();




    // console.log({ event, row }, event.target.lastChild);
    console.log(row, event);
    try {
      this.modal_data = null;
      let something = await this.api.getServerDetails(row.serviceid).toPromise();
      // console.log({ something });
      something = something['server_details'] && something['server_details'].length && something['server_details'][0] || null;
      this.modal_data_inv = null;

      if (row.raw_data.service_type == 'bare_metal') {

        let somet = {};
        if (something)
          somet = await this.api.bare_metal_inv({ ip_address: something['Ip_Address'] }).toPromise();
        if (somet['job']) {
          this.modal_data = something;

          this.modal_data_inv = somet['Baremetal_inventory'];
          this.modal_data['Ip_Address'] = this.modal_data_inv.ipaddress;
          this.modal_data['operating_system'] = this.modal_data_inv.operatingsystem;
          this.modal_data['mac_address'] = this.modal_data_inv.macaddress;

          this.modal_data['Disk'] = this.modal_data_inv.storagesizeingb;
          this.modal_data['CPU'] = this.modal_data_inv.processorcount;
          this.modal_data['RAM'] = this.modal_data_inv.memorysize;

          delete this.modal_data_inv.ipaddress;
          delete this.modal_data_inv.macaddress;
          delete this.modal_data_inv.operatingsystem;

          delete this.modal_data_inv.storagesizeingb;
          delete this.modal_data_inv.processorcount;
          delete this.modal_data_inv.memorysize;


        } else {
          this.modal_data = something;
        }




      } else if (row.raw_data.service_type == 'switch') {
        this.modal_data = something;
      } else {
        this.api.infoToast("Not available currently!");
        $("#show_modal").click();
      }
      if (this.modal_data && this.modal_data['softwares'] && this.modal_data['softwares'] != "NA" && JSON.parse(this.modal_data['softwares']))
        this.modal_data['softwares'] = Object.values(JSON.parse(this.modal_data['softwares'])['tools']).join(", ");
      console.log(this.modal_data, this.modal_data_inv)
    } catch (err) {
      console.log({ err })
      this.api.errorToast(this.api.commonError);

    }
    // this.api.getServerDetails(row.serviceid).subscribe(
    //   res => {
    //     console.log(res);
    //     this.modal_data = res['server_details'] && res['server_details'].length && res['server_details'][0];
    //     // this.modal_data.info = {
    //     //   Brand: this.modal_data.model || '',
    //     //   'Model No.': '',
    //     //   'Processor count': this.modal_data.CPU || '',
    //     //   'RAM size': this.modal_data.RAM || '',
    //     //   'No. of USB Ports': '',
    //     //   'Voltage': '',
    //     //   'Storage': this.modal_data.Disk || ''
    //     // };
    //     // this.modal_data.apps = ["Microsoft Visual studio 16.20", "Apache Version 15.0", "Node JS"]
    //   }
    // );

  }

  pageChangeEvent(event, data, tab) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    tab['data_4_tbl_filtr'] = new MatTableDataSource(data.slice(offset).slice(0, event.pageSize));
    this.set_popovers(data.slice(offset).slice(0, event.pageSize));
  }

  addBareMetal(event, row) {
    event.preventDefault();
    event.stopPropagation();
    row.checked = !row.checked;
    row.checked ? this.selected_servers[row.serviceid] = row : delete this.selected_servers[row.serviceid]
    console.log(this.selected_servers);
    if (this.selected_servers && Object.keys(this.selected_servers).length) this.enableReserveBtn = false;
    else this.enableReserveBtn = true;
  }

  reserve() {
    console.log(this.current_tab, this.selected_servers);
    // this.selected_servers = this.selected_servers.filter((item)=>item.raw_data.service_type == this.current_tab)

    // return "some"
    if (this.selected_servers && Object.keys(this.selected_servers).length) {
      localStorage.setItem("reserve_servers", JSON.stringify(this.selected_servers));
      if (this.current_tab == 'bare_metal') {
        this.router.navigate(['/dashboard/reserve-servers'], { queryParams: { service_type: this.current_tab } });
      } else if (this.current_tab == 'switch') {
        // this.router.navigate(['/dashboard/reserve-switch']);
        this.router.navigate(['/dashboard/reserve-servers'], { queryParams: { service_type: this.current_tab } });
      } else {
        console.log(this.current_tab);

      }
    } else {
      this.api.infoToast('Select service (s) to reserve !');
      // this.bootAlert("Select server(s) to reserve !")

    }

  }

  cellMover(event, row) {
    // event.preventDefault();
    // event.stopPropagation();
    // console.log("m over", row);
    // $("#show_modal").click();
    // this.modal_data = row.raw_data.hover_details && row.raw_data.hover_details;
  }

  bootAlert(text) {
    bootbox.alert({
      message: text || "This is an alert with a callback!",
      callback: function () {
        console.log('This was logged in the callback!');
      }
    })
  }

  set_popovers(data) {
    setTimeout(() => {

      data.map((item) => {
        $('#popover' + item.serviceid).popover(
          {
            trigger: "hover",
            // title: "<b>Example popover</b> - title",
            content: $('#popover-content' + item.serviceid).html()
          }
        );
      })


    }, 1000);
  }

  componentClick() {
    console.log($("#collapseExample").attr("class"))
    if ($("#collapseExample").attr("class") != 'collapse') {
      $("#collapseExample").removeClass($("#collapseExample").attr("class"));
      $("#collapseExample").addClass("collapse");
    }


  }

  selectDateR(event) {


    if ($("#collapseExample").attr("class") != 'collapse') {
      $("#collapseExample").removeClass($("#collapseExample").attr("class"));
      $("#collapseExample").addClass("collapse");
    } else {
      $("#collapseExample").removeClass($("#collapseExample").attr("class"));
      $("#collapseExample").addClass("collapse");

      $("#collapseExample").addClass("in");
    }
    event.stopPropagation();
  }



}
