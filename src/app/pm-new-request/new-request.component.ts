import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';
import { MatSelect } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})

export class NewRequestComponent implements OnInit {
  startDate: any;
  endDate: any;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  test: true;
  public projectNames: any = [];
  panelOpenState = true;
  expandedHeight = 10;
  delivary_locations: any = ["System Optimized", "Hyderabad", "Bangalore", "New Delhi"]
  platform_name = ["Container", "Virtual Machine"];
  lineManger: any;
  admin: any;
  list: any;
  showButton: boolean = false;
  imageArray: any = [];
  userslist: any = ['sam', 'alice', 'jill'];
  selectedUserList: any;
  selectedPlatform: any;
  selectedProject: any;
  selectedDelivaryLocation: any;
  duration: any;
  todayDate: any = ""//=new Date();
  lastDate: any = ""//=  new Date(this.todayDate.getFullYear(), this.todayDate.getMonth() + 1, 0);
  userData: any = JSON.parse(this.auth.data)
  project_names: any = this.userData.project_id;
  enddateVal;
  startdateVal;
  //name;
  constructor(public mySelect: MatSelect, public dialog: MatDialog, public cdr: ChangeDetectorRef, private auth: AuthService, private webService: WebService, private router: Router, private DatePipe: DatePipe) { }
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

  saveProjectInformation(img_name) {
    console.log("img_name" + img_name)

    // setTimeout(()=>{

    // if($("#"+img_name.toString().replace(/ +/g, "")).prop('checked')){
    this.imageArray.push(img_name);
    console.log(this.imageArray)

    // }
    // }
    // ,1000)
  }
  check() {
    console.log("check")

    // $('input[type="checkbox"]').on('change', function () {

    //   $('input[name="' + this.name + '"]').not(this).prop('checked', false);
    // });
  }

  submit() {
    console.log(this.bareMetalData)
    this.webService.setBareMetalData(this.bareMetalData)

    console.log("submit")
    var platform: any;
    console.log(this.webService.selectedPlatform);
    if (this.webService.selectedPlatform == "Container") {
      platform = "container"
    }
    else if (this.webService.selectedPlatform == "Virtual Machine") {
      platform = "vm"
    }
    else if (this.webService.selectedPlatform == "Physical") {
      platform = "physical"
    }
    this.webService.imageArray = [];
    for (var i = 0; i < this.imageArray.length; i++) {
      console.log("#" + this.imageArray[i].toString().replace(/ +/g, "").replace(/[-.]/g, '').toLowerCase())
      console.log($("#" + this.imageArray[i].toString().replace(/ +/g, "").replace(/[-.]/g, '').toLowerCase()).prop('checked'))
      if ($("#" + this.imageArray[i].toString().replace(/ +/g, "").replace(/[-.]/g, '').toLowerCase()).prop('checked')) {
        this.webService.imageArray.push(this.imageArray[i]);
      }
    }
    this.webService.imageArray = Array.from(new Set(this.webService.imageArray));
    console.log(this.webService.imageArray)

    var one_day = 1000 * 60 * 60 * 24;

    var date1_ms = this.webService.todayDate.getTime();
    var date2_ms = this.webService.lastDate.getTime();
    var difference_ms = date2_ms - date1_ms;
    this.duration = Math.round(difference_ms / one_day);
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
    this.startdateVal = (new Date(this.webService.todayDate).getMonth() + 1) + "/" + new Date(this.webService.todayDate).getDate() + "/" + new Date(this.webService.todayDate).getFullYear() + " " + new Date(this.webService.todayDate).getHours() + ":" + new Date(this.webService.todayDate).getMinutes() + ":" + new Date(this.webService.todayDate).getSeconds();
    this.enddateVal = (new Date(this.webService.lastDate).getMonth() + 1) + "/" + new Date(this.webService.lastDate).getDate() + "/" + new Date(this.webService.lastDate).getFullYear() + " " + new Date(this.webService.todayDate).getHours() + ":" + new Date(this.webService.todayDate).getMinutes() + ":" + new Date(this.webService.lastDate).getSeconds();
    //  var info={"projectName": this.webService.selectedProject,"users":this.webService.selectedUserList,
    //  "startDate":this.webService.todayDate,"endDate":this.webService.lastDate,"delivarLocation": this.webService.selectedDelivaryLocation,
    //  "platform":platform,"lineManger":this.webService.lineManger,"admin":this.webService.admin,"imageType":this.webService.imageArray,"duration":this.duration};
    console.log("Platform" + platform);
    var info = {
      "projectName": this.webService.selectedProject, "users": this.webService.selectedUserList,
      "startDate": this.startdateVal, "endDate": this.enddateVal, "delivaryLocation": this.webService.selectedDelivaryLocation,
      "platform": platform, "lineManger": this.webService.lineManger, "admin": this.webService.admin,
      "imageType": this.webService.imageArray, "duration": this.duration
    };

    var res = this.webService.setProjectInfo(info)
    if (res) {
      this.router.navigate(['/dashboard/orderList']);
    }



  }
  checkAllUsers(checked) {
    if (checked) {
      this.webService.selectedUserList = this.webService.userslist;
    }
    else {
      this.webService.selectedUserList = null;
    }
  }

  listOfRequests: any;
  filteredRequests: any;

  public bareMetalTableData: any = [];
  public filteredTableData: any = [];
  displayedColumns: string[]
  bareMetalDataSource;
  bareMetalData: any = [];
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

  changeStartDate(event) {
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

  getFilteredData() {
    console.log(this.webService.todayDate)
    console.log(this.webService.lastDate)
    console.log(this.webService.todayTimeReservation)
    console.log(this.webService.lastTimeReservation)
    console.log(this.webService.todayTimeReservation[0])

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

    var data = {
      "start_date": this.startdateVal,
      "end_date": this.enddateVal,
      "action": "search",
      "location": "all"
    }
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

  @ViewChild('mySelect', { static: false }) mySelec: MatSelect;
  //  openselect(my){
  //    console.log("sjsjj")
  //    my.toggle();
  //  }

  ngAfterViewInit() {
    //$("#mySelect").show()
    //   this.webService.mySelect.toggle()
    //   console.log("jsajsj111")
    //  this.mySelect.toggle()
    //this.webService.openselect(this.mySelect.panelOpenState)
    //this.openselect(this.mySelect)
    // this.cdr.detectChanges();
  }

  //chatbot
  openNewServices() {
    $('#collapseOne').removeClass('in');
    $('#collapseTwo').addClass('in');
    this.showButton = true;
    this.webService.projInfoOpened = false;
  }

  openProjInfo() {
    $('#collapseTwo').removeClass('in');
    $('#collapseOne').addClass('in');
    this.webService.projInfoOpened = true;
  }
  opensubtype() {
    if (this.webService.selectedPlatform == 'Container') {
      $('#Analytics').show();
      $('#MLDL').show();
    }
    else {
      $('#Analytics').hide();
      $('#MLDL').hide();

    }
  }

  openToggle() {
    if (this.webService.selectedPlatform == 'Container') {
      $('#Analytics').show();
      $('#MLDL').show();
    }
    else {
      $('#Analytics').hide();
      $('#MLDL').hide();

    }
    console.log(this.webService.selectedProject, this.webService.selectedPlatform, this.webService.selectedUserList,
      this.webService.todayDate, this.webService.lastDate, this.webService.selectedDelivaryLocation,
      this.webService.lineManger, this.webService.admin)
    if (this.webService.selectedProject != undefined && this.webService.selectedPlatform != undefined && this.webService.selectedUserList != undefined && this.webService.todayDate != undefined && this.webService.lastDate != undefined && this.webService.todayDate != "" && this.webService.lastDate != "" && this.webService.selectedDelivaryLocation != undefined && this.webService.lineManger != undefined && this.webService.admin != undefined) {

      //  $('#collapseOne').hide();
      //  $('#collapseTwo').show();
      $('#collapseOne').removeClass('in');
      $('#collapseTwo').addClass('in');

      this.showButton = true;

    }


  }


  //chatbot function
  openServiceTab(name) {
    if (name[0] == "DeveloperWorkstation") {

      $('ul.nav-tabs li.active').removeClass('active');
      //   $("div.tab-content").removeClass("active");  
      $("#DeveloperWs").addClass("active").siblings().removeClass("active");
      $('#Developer').addClass('active');
      // $("#AnalyticsService").addClass('active');
    }
    else if (name[0] == "AnalyticsServices") {

      $('ul.nav-tabs li.active').removeClass('active');
      //   $("div.tab-content").removeClass("active");  
      $("#AnalyticsService").addClass("active").siblings().removeClass("active");
      $('#Analytics').addClass('active');
    }
    else if (name[0] == "ApplicationServices") {
      $('ul.nav-tabs li.active').removeClass('active');
      $("#ApplicationService").addClass("active").siblings().removeClass("active");
      $('#Application').addClass('active');
    }
    else if (name[0] == "OpenDevOps") {
      $('ul.nav-tabs li.active').removeClass('active');
      $("#DevOps").addClass("active").siblings().removeClass("active");
      $('#Dev').addClass('active');
    }
    else if (name[0] == "MLFramework") {
      $('ul.nav-tabs li.active').removeClass('active');
      $("#MLorDL").addClass("active").siblings().removeClass("active");
      $('#MLDL').addClass('active');
    }

  }
  // toggleradio(id){
  //   if ($("#"+id).prop("checked")) {
  //     $("#"+id).prop('checked', false);
  //     }
  //     else{
  //       $("#"+id).prop('checked', true);
  //     }
  // }
  checkButton(list) {
    console.log(list)
    $('input:checkbox').prop('type', 'radio');
    this.webService.imageArray.length = 0
    console.log(this.imageArray.length)
    for (var i = 0; i < list.length; i++) {

      $("#" + list[i].toString().replace(/ +/g, "")).prop('checked', true);
      console.log($("#" + list[i].toString().replace(/ +/g, "")).prop('checked'))
      // list[i] = list[i].charAt(0).toUpperCase() + list[i].substr(1);;
    }
    for (var i = 0; i < list.length; i++) {

      if ($("#" + list[i].toString().replace(/ +/g, "")).prop('checked')) {
        this.webService.imageArray.push(list[i]);



      }
    }

    this.cdr.detectChanges()

  }
  cancle() {
    this.webService.selectedProject = null;
    //    this.webService.selectedUserList = null;
    this.webService.lineManger = null;
    this.webService.admin = null;

    this.webService.todayDate = null;
    this.webService.lastDate = null;
    this.router.navigate(['/home/dashboard']);
  }
  disablecheck() {

    console.log(this.imageArray.length)
    for (var i = 0; i < this.imageArray.length; i++) {
      if ($("#" + this.imageArray[i].toString().replace(/ +/g, "").replace(/[-.]/g, '').toLowerCase()).prop('checked')) {

        return false;
      }
    }
    return true;
  }
  radioCheck(list) {

    console.log(this.webService.imageArray.length)
    for (var i = 0; i < list.length; i++) {

      $("#" + list[i].toString().replace(/ +/g, "").replace(/[-.]/g, '').toLowerCase()).prop('checked', true);
      this.imageArray.push(list[i])
    }
    console.log(this.imageArray.length)


  }


  viewService(serviceId) {
    this.webService.physicalServiceId = serviceId;
    this.router.navigate(['/dashboard/Myservices/NewRequest/service']);
  }


  ngOnInit() {
    this.radioCheck(this.webService.imageArray)
    /*  this.webService.Dashboard  =false;
     this.webService.ReservationSystem  =false;
     this.webService.myService  =true;
   
     this.webService.Inventory  =false;
   
     this.webService.devices  =false;
     this.webService.ReservationList  =false; */
    this.webService.currentTab = 'myService';
    this.cdr.detectChanges()
    this.reservationSystemData();
    if (this.webService.selectedProject != undefined) {
      this.userList(this.webService.selectedProject)
    }
    // $('.no-open-lmao').collapse({
    //   toggle: false
    // })
  }

}
