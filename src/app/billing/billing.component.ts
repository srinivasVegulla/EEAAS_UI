import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTab } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as $ from 'jquery';
//import { MatTab } from '@angular/material/tabs/typings/tab';
import * as _moment from 'moment';

import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'projectListPopup',
  template: ` 
  
  <div class="panel panel-default" style="border-color:#232730;background-color:#232720;height:100%;margin-bottom:0px">
  <div class="panel-heading"><h4 class="text-left">Order Summary</h4>
  
  <button type="button" mat-dialog-close class="text-right close" style="opacity:1.2;margin-top:-30px;outline:none;color:white">
  &times;
</button></div>
  <div class="panel-body" style="padding:10px;overflow-x:hidden">
  <div class="container-fluid">
  <div class="row">
  <div class="col-md-4">
  <h5 style="font-weight: bold">Project Name</h5>
  <p>{{projectData.proj_name}}</p>
  </div>
  <div class="col-md-4">
  <h5 style="font-weight: bold">Total Requests</h5>
  <p>{{projectData.total_requests}}</p>
  </div>
  <div class="col-md-4">
  <h5 style="font-weight: bold">Total Amount</h5>
  <p>{{projectData.total_amount}}</p>
  </div>

 
  <div class="row">
  <div class="col-md-12" style="height: 300px;
  overflow-y: auto;">
  <mat-table [dataSource]="dataSource">
  
  <ng-container matColumnDef="s_No">
        
  <mat-header-cell *matHeaderCellDef style="flex:0.5"> S.No</mat-header-cell>
 
    <mat-cell *matCellDef="let element;let i=index;"  style="flex:0.5"> {{i+1}}</mat-cell>

</ng-container>

<ng-container matColumnDef="request_id">
        
<mat-header-cell *matHeaderCellDef> Request Id </mat-header-cell>

  <mat-cell *matCellDef="let element"> {{element.request_id}}</mat-cell>

</ng-container>
      <ng-container matColumnDef="service_name">
        
        <mat-header-cell *matHeaderCellDef> Hardware </mat-header-cell>
       
          <mat-cell *matCellDef="let element"> {{element.service_name}}</mat-cell>

      </ng-container>
  
     
      <ng-container matColumnDef="user">
        <mat-header-cell *matHeaderCellDef>User</mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.user}} </mat-cell>
      </ng-container>
         
      <ng-container matColumnDef="from">
        <mat-header-cell *matHeaderCellDef style="flex:1.5"> From</mat-header-cell>
        <mat-cell *matCellDef="let element" style="flex:1.5"> {{element.start_date.slice(0,10)}} </mat-cell>&nbsp;&nbsp;
      </ng-container>
         
      <ng-container matColumnDef="to">
        <mat-header-cell *matHeaderCellDef style="flex:1.5"> To</mat-header-cell>
        <mat-cell *matCellDef="let element" style="flex:1.5"> {{element.end_date.slice(0,10)}} </mat-cell>
      </ng-container>
         
      <ng-container matColumnDef="hours">
        <mat-header-cell *matHeaderCellDef> Hours</mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.hours}} </mat-cell>
      </ng-container>
         
      <ng-container matColumnDef="bill_rate">
        <mat-header-cell *matHeaderCellDef> Bill Rate($)</mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.bill_rate}} </mat-cell>
      </ng-container>
         
      <ng-container matColumnDef="price">
        <mat-header-cell *matHeaderCellDef> Total($)</mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.price}} </mat-cell>
      </ng-container>
  
     
     
  
      <mat-header-row *matHeaderRowDef="displayedColumns" ></mat-header-row>
     
      <mat-row *matRowDef="let row; columns: displayedColumns;" ></mat-row>
    </mat-table></div>
  </div>
  </div>

</div>

    `,
  styles: [`
  .col-md-2{
    width:20%
  }
  mat-row:nth-child(even){
    background-color:white;
    }
    .mat-raised-button[disabled]{
      cursor:not-allowed;
      color:white;
    }
mat-row:nth-child(odd){
    background-color:#d6e8f1;
    }
    mat-header-row{
      background-color:#d6e8f1;
      border-bottom-width: 0px; 
     border-bottom-style: none;
     font-weight:bold;
     min-height: 40px;
  
    }
    mat-header-cell{
   
     font-weight:bold;
     font-size:16px;
  
    }
    .mat-cell, .mat-header-cell {
     font-size:12px!important;
      text-align: center!important;
  }
    mat-row{
      border-bottom-width: 0px; 
      border-bottom-style: none;
      min-height: 40px;
    }
   
    `]
})
export class projectListPopup {
  orderData: any;
  serviceData: any;
  tableData: any = [];
  displayedColumns: string[]=["s_No","request_id","service_name","user","from","to","hours","bill_rate","price"];
  dataSource;
  projectData:any;
  projectList:any;
  
  constructor(private auth: AuthService, private webService: WebService,
    public dialogRef: MatDialogRef<projectListPopup>,
     @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private router: Router) {
    console.log(data)
    this.projectData=data.project;
    this.tableData=data.listofprojects;
    console.log(this.tableData)
    this.dataSource=new MatTableDataSource(this.tableData)

  }


  

  ngOnInit() {


    

  }
}
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  providers: [
 
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],

})
export class BillingComponent implements OnInit {
  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
   console.log("close")
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
   //this.datepicker.close();
  }
  
  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    console.log("close")
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
 
  }
startDate:string;
endDate:string;
billingTypelist:any=["Monthly","Weekly"]
billingType:string='';
billingData:any=[];
public tableData: any = [];
date1;
user;
role;
userid;
dataSource:any;
proj_list:any=[];
maxDate = new Date();
totalBill=0;
@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
@ViewChild(MatSort, {static: false}) sort: MatSort;

displayedColumns: string[]=["s_No","proj_name","total_requests","total_amount"];
  constructor(public dialogRef: MatDialogRef<projectListPopup>,@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private auth: AuthService, private webService: WebService) {
   
   }
 
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
  getBilling(){
    console.log("hello value here is"+this.auth.role)
    this.billingData.length=0
this.role=this.auth.role
this.user=this.auth.userid
// this.userid=this.auth.userid
    this.tableData.length=0;
    this.totalBill=0;
    var date:any=new Date(this.date.value)
 var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
console.log( firstDay.getMonth()+1)
this.startDate= (firstDay.getMonth()+1) + "/" +firstDay.getDate() + "/" +  firstDay.getFullYear()+" "+"00:00:00"
this.endDate= (lastDay.getMonth()+1) + "/" + lastDay.getDate() + "/" +lastDay.getFullYear()+" "+"00:00:00";
  //   if(this.billingType=="Weekly"){
  //   var todayDate=new Date();
  //   this.endDate=todayDate.getMonth()+1 + "/" + todayDate.getDate() + "/" + todayDate.getFullYear()+" "+"00:00:00";
  //   var lastDate=new Date(todayDate.getTime() - (7 * 24 * 60 * 60 * 1000))
  //   this.startDate=lastDate.getMonth()+1 + "/" + lastDate.getDate() + "/" + lastDate.getFullYear()+" "+"00:00:00"
  // }
  // else if(this.billingType=="Monthly"){
  //   var todayDate=new Date();
  //   this.endDate=todayDate.getMonth()+1 + "/" + todayDate.getDate() + "/" + todayDate.getFullYear()+" "+"00:00:00"
  //   var lastDate=new Date(todayDate.getTime() - (30 * 24 * 60 * 60 * 1000))
  //   this.startDate=lastDate.getMonth()+1 + "/" + lastDate.getDate() + "/" + lastDate.getFullYear()+" "+"00:00:00"
  // }
  // else{
  //   var todayDate=new Date();
  //   this.endDate=todayDate.getMonth()+1 + "/" + todayDate.getDate() + "/" + todayDate.getFullYear()+" "+"00:00:00";
  //   var lastDate=new Date(todayDate.getTime() - (7 * 24 * 60 * 60 * 1000))
  //   this.startDate=lastDate.getMonth()+1 + "/" + lastDate.getDate() + "/" + lastDate.getFullYear()+" "+"00:00:00"
  // }

 
 // this.billingData=[{"req_price1": [{"price": 240.0, "request_id": "req_0008"}, {"price": 480.0, "request_id": "req_0009"}, {"price": 120.0, "request_id": "req_0010"}, {"price": 120.0, "request_id": "req_0011"}, {"price": 240.0, "request_id": "req_0012"}, {"price": 60.0, "request_id": "req_0013"}, {"price": 60.0, "request_id": "req_0014"}, {"price": 60.0, "request_id": "req_0015"}, {"price": 96.0, "request_id": "req_0016"}, {"price": 96.0, "request_id": "req_0017"}, {"price": 48.0, "request_id": "req_0018"}, {"price": 96.0, "request_id": "req_0019"}, {"price": 48.0, "request_id": "req_0020"}, {"price": 960.0, "request_id": "req_0021"}, {"price": 72.0, "request_id": "req_0024"}, {"price": 72.0, "request_id": "req_0025"}, {"price": 72.0, "request_id": "req_0026"}, {"price": 24.0, "request_id": "req_0030"}], "total_price": 2964.0},
  //{"req_price2": [{"price": 240.0, "request_id": "req_0008"}, {"price": 480.0, "request_id": "req_0009"}, {"price": 120.0, "request_id": "req_0010"}, {"price": 120.0, "request_id": "req_0011"}, {"price": 240.0, "request_id": "req_0012"}, {"price": 60.0, "request_id": "req_0013"}, {"price": 60.0, "request_id": "req_0014"}, {"price": 60.0, "request_id": "req_0015"}, {"price": 96.0, "request_id": "req_0016"}, {"price": 96.0, "request_id": "req_0017"}, {"price": 48.0, "request_id": "req_0018"}, {"price": 96.0, "request_id": "req_0019"}, {"price": 48.0, "request_id": "req_0020"}, {"price": 960.0, "request_id": "req_0021"}, {"price": 72.0, "request_id": "req_0024"}, {"price": 72.0, "request_id": "req_0025"}, {"price": 72.0, "request_id": "req_0026"}, {"price": 24.0, "request_id": "req_0030"}], "total_price": 2964.0}]
  //this.billingData=[{"req_price1": [{"hardware":"CPU","user":"user1","from":"01/04/2019","to":"30/04/2019","hrs":6,"billrate":"$600","total":"$3600"}, {"hardware":"RAM","user":"user2","from":"01/04/2019","to":"30/04/2019","hrs":8,"billrate":"$600","total":"$4800"}], "total_price": 2964.0},
// {"req_price2": [{"hardware":"CPU","user":"user1","from":"01/04/2019","to":"30/04/2019","hrs":6,"billrate":"$600","total":"$3600"}, {"hardware":"RAM","user":"user2","from":"01/04/2019","to":"30/04/2019","hrs":8,"billrate":"$600","total":"$4800"}], "total_price": 2964.0}]
 


// console.log(typeof(this.billingData[0][Object.keys(this.billingData[0])[0]]))
//     console.log(typeof(this.billingData[0].total_price))
//   for(var i=0;i<this.billingData.length;i++){
//     this.tableData[i]={"s_No":"","proj_name":Object.keys(this.billingData[i])[0],"total_requests":this.billingData[i][Object.keys(this.billingData[i])[0]].length,"total_amount":this.billingData[0].total_price}
//   this.totalBill=this.totalBill+this.tableData[i].total_amount;
//   console.log(this.totalBill)
//   }
// for(var i=0;i<this.billingData.length;i++){
//      this.tableData[i]={"s_No":"","proj_name":this.billingData[i].project_name,"total_requests":this.billingData[i].req_price.length,"total_amount":this.billingData[i].total_price}
//    this.totalBill=this.totalBill+this.tableData[i].total_amount;
//      console.log(this.totalBill)
//      }
//   console.log(this.tableData)
//   this.dataSource = new MatTableDataSource(this.tableData);
//  this.dataSource.paginator = this.paginator;
//   this.dataSource.sort = this.sort;
//   console.log(data)
  var data:any=JSON.stringify({"start_date":this.startDate,"end_date":this.endDate,"user":this.user,"role":this.role});
  this.webService.getBillingData(data).subscribe(res => {
    console.log(res)
    this.billingData=res;
    for(var i=0;i<this.billingData.length;i++){
      this.tableData[i]={"s_No":"","proj_name":this.billingData[i].project_name,"total_requests":this.billingData[i].req_price.length,"total_amount":this.billingData[i].total_price}
    this.totalBill=this.totalBill+this.tableData[i].total_amount;
      console.log(this.totalBill)
      }
   
  
  this.dataSource = new MatTableDataSource(this.tableData);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  })
}
viewRequest(proj_name,index) {
console.log(proj_name)
for(var i=0;i<this.billingData.length;i++){

if(this.billingData[i].project_name==proj_name){
 
  this.proj_list=this.billingData[i].req_price
}
}
console.log({project:this.tableData[index],listofprojects:this.proj_list})
    let dialogRef = this.dialog.open(projectListPopup, {
      height: '450px',
      width: '700px',
      data: {project:this.tableData[index],listofprojects:this.proj_list}
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed1');
      // this.requestListData()
    })
 

}
// addEvent() {

//  var date:any=new Date(this.date.value)
//  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
// var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

// this.startDate=firstDay.getMonth()+1 + "/" + firstDay.getDate() + "/" + firstDay.getFullYear()+" "+"00:00:00"
// this.endDate=lastDay.getMonth()+1 + "/" + lastDay.getDate() + "/" + lastDay.getFullYear()+" "+"00:00:00";
// this.getBilling();
// }

   ngOnInit() {
    
     this.getBilling();
     this.webService.Dashboard  =false;
    this.webService.ReservationSystem  =false;
    this.webService.myService  =false;
this.webService.LMDashboard=false;
this.webService.orders=false;
this.webService.labs=false;
this.webService.ReservationList=false;
this.webService.reports=true;
    this.webService.Inventory  =false;
this.webService.catalogue=false;
    this.webService.devices  =false;
    this.webService.ReservationList  =false;
    this.webService.calendar=false;
this.webService.holidays=false;

  }

}
