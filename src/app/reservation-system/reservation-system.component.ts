import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { DatePipe } from '@angular/common';
import { ApiService } from '../bare-metal/services/api.service';
@Component({
  selector: 'app-reservation-system',
  templateUrl: './reservation-system.component.html',
  styleUrls: ['./reservation-system.component.scss']
})
export class ReservationSystemComponent implements OnInit {

  listOfRequests: any;
  filteredRequests: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public router: Router, private DatePipe: DatePipe, public dialog: MatDialog, private auth: AuthService, private webService: WebService,
    private api: ApiService
  ) { }
  public bareMetalTableData: any = [];
  public filteredTableData: any = [];
  displayedColumns: string[]

  bareMetalDataSource;
  bareMetalData: any = [];
  enddateVal;
  startdateVal;
  userData: any = JSON.parse(this.auth.data) // {"Request payload":{"EDITOR_CONFIG":{"text":"{\"role\":\"PM\",\"project_id\":[\"NextGen\"],\"user_name\":\"Sam\",\"job\":true,\"user_id\":\"Sam\",\"action\":\"read\"}","mode":"text/html"}}}
  project_names: any = ['NextGen']//  this.userData.project_id;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  applyFilter(filterValue: string) {
    this.bareMetalDataSource.filter = filterValue.trim().toLowerCase();

    if (this.bareMetalDataSource.paginator) {
      this.bareMetalDataSource.paginator.firstPage();
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(ReservationDialogComponent, {
      width: '1000px',
      height: '400px',
      data: 'This text is passed into the dialog!'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      // this.dialogResult = result;
    });
  }

  getFilteredData() {
    this.bareMetalData.length = 0;
    this.filteredTableData.length = 0;
    // console.log(this.webService.todayDate)
    // console.log(this.webService.lastDate)
    // console.log(this.webService.todayTimeReservation)
    // console.log(this.webService.lastTimeReservation)
    // console.log(this.webService.todayTimeReservation[0])

    // let stDate = new Date(this.webService.todayDate);
    // //  stDate.setDate(stDate.getDate()+1);
    // stDate.setHours(this.webService.todayTimeReservation.split(':')[0])
    // stDate.setMinutes(this.webService.todayTimeReservation.split(':')[1])

    // this.startdateVal = this.DatePipe.transform(stDate, 'MM/dd/yyyy HH:mm:ss')
    // let enDate = new Date(this.webService.lastDate);
    // //  enDate.setDate(enDate.getDate()+1);
    // enDate.setHours(this.webService.lastTimeReservation.split(':')[0])
    // enDate.setMinutes(this.webService.lastTimeReservation.split(':')[1])
    // this.enddateVal = this.DatePipe.transform(enDate, 'MM/dd/yyyy HH:mm:ss')
    this.startdateVal = (new Date(this.webService.todayDateReservation).getMonth() + 1) + "/" + new Date(this.webService.todayDateReservation).getDate() + "/" + new Date(this.webService.todayDateReservation).getFullYear() + " " + new Date(this.webService.todayDateReservation).getHours() + ":" + new Date(this.webService.todayDateReservation).getMinutes() + ":" + new Date(this.webService.todayDateReservation).getSeconds();
    this.enddateVal = (new Date(this.webService.lastDateReservation).getMonth() + 1) + "/" + new Date(this.webService.lastDateReservation).getDate() + "/" + new Date(this.webService.lastDateReservation).getFullYear() + " " + new Date(this.webService.todayDateReservation).getHours() + ":" + new Date(this.webService.todayDateReservation).getMinutes() + ":" + new Date(this.webService.lastDateReservation).getSeconds();
    var data = {
      "start_date": this.startdateVal,
      "end_date": this.enddateVal,
      "action": "search",
      "location": "all"
    }
    console.log(data)
    this.webService.getFilteredReservationData(data).subscribe(res => {
      var response: any = res;
      console.log(response);
      console.log(response.serverlist);
      console.log(response.serverlist.servers);
      this.filteredRequests = response.serverlist.servers;
      console.log(this.filteredRequests);

      this.displayedColumns = ["checked", "serviceid", "name", "status", "reservedBy", "allocatedTo", "pricePerHr"];
      var len = this.filteredRequests.length;
      var j = 0;
      for (var i = len - 1; i >= 0; i--) {
        // console.log("hi",this.filteredRequests[i].reserved_date)
        // var stdate=JSON.parse(this.filteredRequests[i].reserved_date.replace(/'/g, '"'))[0].start_date;
        // var endate=JSON.parse(this.filteredRequests[i].reserved_date.replace(/'/g, '"'))[0].end_date;

        // console.log(stdate); 
        this.filteredTableData.push(
          {
            "checked": '',
            "serviceid": this.filteredRequests[i].service_id,
            "name": this.filteredRequests[i].name,
            //   "startDate": stdate,
            // "endDate": endate,
            "status": this.filteredRequests[i].status,
            // "location_id" :this.listOfRequests[i].location_id,
            "reservedBy": this.filteredRequests[i].consumer,
            "allocatedTo": this.filteredRequests[i].project,
            "pricePerHr": this.filteredRequests[i].price_per_hr,
            //        "actions": this.filteredRequests[i].consumer

          })
        j = j + 1;
      }
      console.log(this.filteredTableData)

      this.bareMetalDataSource = new MatTableDataSource(this.filteredTableData);
      this.bareMetalDataSource.paginator = this.paginator;
      this.bareMetalDataSource.sort = this.sort;
    })
  }

  reservationSystemData() {

    // var data = {
    //             "start_date": "",
    //             "end_date": ""
    //             }
    //JSON.parse(this.auth.data);
    //  data.action = "read";

    this.webService.getReservationList().subscribe(res => {
      var response: any = res;
      this.listOfRequests = response.opnfv;
      console.log(this.listOfRequests);
      //  this.listOfRequests.sort((a, b) => a.serial_no.localeCompare(b.serial_no));
      //this.displayedColumns=["sNo","request_id","project_name","pm_name","admin_name","location_id","start_date","end_date","status","price"];
      this.displayedColumns = ["checked", "serviceid", "name", "status", "reservedBy", "allocatedTo", "pricePerHr"];
      var len = this.listOfRequests.length;
      var j = 0;
      for (var i = len - 1; i >= 0; i--) {
        //       console.log("hi",this.listOfRequests[i].reserved_date)
        //    var stdate=JSON.parse(this.listOfRequests[i].reserved_date.replace(/'/g, '"'))[0].start_date;
        //   var endate=JSON.parse(this.listOfRequests[i].reserved_date.replace(/'/g, '"'))[0].end_date;

        //console.log(stdate); 
        this.bareMetalTableData.push(
          {
            "checked": false,
            "serviceid": this.listOfRequests[i].service_id,
            "name": this.listOfRequests[i].name,
            //      "startDate": stdate,
            //    "endDate": endate,
            "status": this.listOfRequests[i].status,
            // "location_id" :this.listOfRequests[i].location_id,
            "reservedBy": this.listOfRequests[i].consumer,
            "allocatedTo": this.listOfRequests[i].project,
            "pricePerHr": this.listOfRequests[i].price_per_hr,
            //  "actions": this.listOfRequests[i].consumer

          })
        j = j + 1;
      }
      console.log(this.bareMetalTableData)

      this.bareMetalDataSource = new MatTableDataSource(this.bareMetalTableData);
      this.bareMetalDataSource.paginator = this.paginator;
      this.bareMetalDataSource.sort = this.sort;
    })
  }
  addBareMetal(rowData) {
    // rowData.checked=true;
    console.log(rowData)
    // console.log(this.bareMetalTableData[rowData])
    if (rowData.checked) {
      this.bareMetalData.push(rowData)

    } else {

      for (var i = 0; i < this.bareMetalData.length; i++) {
        if (this.bareMetalData[i] == rowData) {
          this.bareMetalData.splice(i, 1);
          i--;
        }
      }
    }

  }

  submit() {
    console.log(this.bareMetalData)
    // let stDate = new Date(this.webService.todayDate);
    // //  stDate.setDate(stDate.getDate()+1);
    // stDate.setHours(this.webService.todayTimeReservation.split(':')[0])
    // stDate.setMinutes(this.webService.todayTimeReservation.split(':')[1])

    // this.startdateVal = this.DatePipe.transform(stDate, 'MM/dd/yyyy HH:mm:ss')
    // let enDate = new Date(this.webService.lastDate);
    // //  enDate.setDate(enDate.getDate()+1);
    // enDate.setHours(this.webService.lastTimeReservation.split(':')[0])
    // enDate.setMinutes(this.webService.lastTimeReservation.split(':')[1])
    // this.enddateVal = this.DatePipe.transform(enDate, 'MM/dd/yyyy HH:mm:ss')
    this.startdateVal = (new Date(this.webService.todayDateReservation).getMonth() + 1) + "/" + new Date(this.webService.todayDateReservation).getDate() + "/" + new Date(this.webService.todayDateReservation).getFullYear() + " " + new Date(this.webService.todayDateReservation).getHours() + ":" + new Date(this.webService.todayDateReservation).getMinutes() + ":" + new Date(this.webService.todayDateReservation).getSeconds();
    this.enddateVal = (new Date(this.webService.lastDateReservation).getMonth() + 1) + "/" + new Date(this.webService.lastDateReservation).getDate() + "/" + new Date(this.webService.lastDateReservation).getFullYear() + " " + new Date(this.webService.todayDateReservation).getHours() + ":" + new Date(this.webService.todayDateReservation).getMinutes() + ":" + new Date(this.webService.lastDateReservation).getSeconds();

    this.webService.setBareMetalData(this.bareMetalData)


    var info = {
      "projectName": this.webService.selectedProject, "users": this.webService.selectedUserList,
      "startDate": this.startdateVal, "endDate": this.enddateVal, "delivaryLocation": this.webService.selectedDelivaryLocation,
      "platform": "Physical", "lineManger": this.webService.lineManger, "admin": this.webService.admin,
      "imageType": this.webService.imageArray, "duration": ""
    };

    var res = this.webService.setProjectInfo(info)
    this.auth.setProjectName(this.webService.selectedProject);
    this.router.navigate(['/dashboard/orderList']);



  }
  changeStartDate(event) {
    console.log("asjbndjasjdk")
    console.log(event.value)
    console.log((new Date(event.value).getMonth() + 1) + "/" + new Date(event.value).getDate() + "/" + new Date(event.value).getFullYear() + " " + new Date(event.value).getHours() + ":" + new Date(event.value).getMinutes() + ":" + new Date(event.value).getSeconds());
    this.startdateVal = (new Date(event.value).getMonth() + 1) + "/" + new Date(event.value).getDate() + "/" + new Date(event.value).getFullYear() + " " + new Date(event.value).getHours() + ":" + new Date(event.value).getMinutes() + ":" + new Date(event.value).getSeconds();

    // this.webService.todayDate = this.DatePipe.transform(event, 'MM/dd/yyyy')
    // this.webService.todayTimeReservation = this.DatePipe.transform(event, 'HH:mm')
    // console.log("todayDate:" + this.webService.todayDate);
    // console.log("todayTimeReservation:" + this.webService.todayTimeReservation);
  }


  changeEndDate(event) {

    console.log(event.value)
    console.log((new Date(event.value).getMonth() + 1) + "/" + new Date(event.value).getDate() + "/" + new Date(event.value).getFullYear() + " " + new Date(event.value).getHours() + ":" + new Date(event.value).getMinutes() + ":" + new Date(event.value).getSeconds());
    this.enddateVal = (new Date(event.value).getMonth() + 1) + "/" + new Date(event.value).getDate() + "/" + new Date(event.value).getFullYear() + " " + new Date(event.value).getHours() + ":" + new Date(event.value).getMinutes() + ":" + new Date(event.value).getSeconds();
    // this.webService.lastDate = this.DatePipe.transform(event, 'MM/dd/yyyy')
    // this.webService.lastTimeReservation = this.DatePipe.transform(event, 'HH:mm')
    // console.log("lastDate:" + this.webService.lastDate);
    // console.log("lastTimeReservation:" + this.webService.lastTimeReservation);
  }

  viewService(serviceId) {
    this.webService.physicalServiceId = serviceId;
    this.router.navigate(['/dashboard/Myservices/NewRequest/service']);
  }
  cancle() {
    this.webService.selectedProject = null;
    //this.webService.selectedUserList = null;
    this.webService.todayDateReservation = null;
    this.webService.lastDateReservation = null;
    this.router.navigate(['/dashboard']);
  }
  userList(p_name) {
    console.log(p_name)
    this.auth.setProjectName(p_name);
    var userData: any = JSON.parse(this.auth.data)
    var data = { "login": userData, "action": "read", "status": "UNREAD", "project_id": JSON.parse(this.auth.projectName) };
    console.log(data)
    this.webService.getProjectInfo(data).subscribe(res => {
      var response: any = res
      this.webService.lineManger = response.request[0].lm_id
      this.webService.admin = response.request[0].admin_id
    })
    var tempdata = { "login": { "role": userData.role, "job": userData.job, "project_id": JSON.parse(this.auth.projectName), "user_id": userData.user_id, "user_name": userData.user_name }, "action": "read", "status": "UNREAD", "project_id": JSON.parse(this.auth.projectName) };
    this.webService.getUsersInfo(tempdata).subscribe(res => {
      var response: any = res;
      // response.user=response.user;

      for (var i = 0, len = response.user.length; i < len; i++) {
        if (response.user[i].role != "PM" && response.user[i].role != "LM") {
          //console.log($scope.list[i].user_id);
          // this.webService.userslist.push(response.user[i].user_id);
        }
      }

    })
  }

  ngOnInit() {
    this.getServerList();
    // this.reservationSystemData();
    /* this.paginator._intl.itemsPerPageLabel = 'Show';

    this.webService.Dashboard  =false;
    this.webService.ReservationSystem  =true;
    this.webService.myService  =false;
  
    this.webService.Inventory  =false;
  
    this.webService.devices  =false;
    this.webService.ReservationList  =false; */
    this.webService.currentTab = 'ReservationSystem';
  }

  getServerList() {

    // var data = {
    //             "start_date": "",
    //             "end_date": ""
    //             }
    //JSON.parse(this.auth.data);
    //  data.action = "read";

    this.api.getServerList().subscribe(res => {
      var response: any = res;
      this.listOfRequests = res['serverlist']['servers'];
      // this.listOfRequests = response.opnfv;
      console.log(this.listOfRequests);
      //  this.listOfRequests.sort((a, b) => a.serial_no.localeCompare(b.serial_no));
      //this.displayedColumns=["sNo","request_id","project_name","pm_name","admin_name","location_id","start_date","end_date","status","price"];
      this.displayedColumns = ["checked", "serviceid", "name", "status", "reservedBy", "allocatedTo", "pricePerHr"];
      var len = this.listOfRequests.length;
      var j = 0;
      for (var i = len - 1; i >= 0; i--) {
        //       console.log("hi",this.listOfRequests[i].reserved_date)
        //    var stdate=JSON.parse(this.listOfRequests[i].reserved_date.replace(/'/g, '"'))[0].start_date;
        //   var endate=JSON.parse(this.listOfRequests[i].reserved_date.replace(/'/g, '"'))[0].end_date;

        //console.log(stdate); 
        this.bareMetalTableData.push(
          {
            "checked": false,
            "serviceid": this.listOfRequests[i].service_id,
            "name": this.listOfRequests[i].name,
            //      "startDate": stdate,
            //    "endDate": endate,
            "status": this.listOfRequests[i].status,
            // "location_id" :this.listOfRequests[i].location_id,
            "reservedBy": this.listOfRequests[i].consumer,
            "allocatedTo": this.listOfRequests[i].project,
            "pricePerHr": this.listOfRequests[i].price_per_hr,
            //  "actions": this.listOfRequests[i].consumer

          })
        j = j + 1;
      }
      console.log(this.bareMetalTableData)

      this.bareMetalDataSource = new MatTableDataSource(this.bareMetalTableData);
      this.bareMetalDataSource.paginator = this.paginator;
      this.bareMetalDataSource.sort = this.sort;
    })
  }


}
