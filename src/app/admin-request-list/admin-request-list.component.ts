import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as _ from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'successPopup',
  template: ` 
  <div id="successpopup" style="text-align:center" >
  <button type="button" mat-dialog-close class="text-right close" style="opacity:1.2;color:white;margin-top: -23px;
  margin-right: 6px;outline: none;">
  &times;
</button>
  <div>

<h4 style="text-align:center;margin-top:6%;font-weight:bold"><span *ngIf="webService.message!='Server is not available'"><img src="./assets/newimages/rightmark.png" style="    width: 46px;
margin-right: 3%;">Request</span> {{webService.message}}!</h4>
  

  
  </div>

  </div> 
  `,
  styles: [`

`]

})
export class successPopup {

  constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<successPopup>, @Inject(MAT_DIALOG_DATA) public data: any, public auth: AuthService, private webService: WebService) {

  }
}
@Component({
  selector: 'submitPopup',
  template: ` 
  <div class="panel panel-default" style="border-color:#232730;background-color:#232720;height:100%;margin-bottom:0px">
  <div class="panel-heading"><h4 class="text-left">Comments</h4>
  
  <button mat-dialog-close class="text-right close" style="margin-top:-30px;color:white;outline:none">
  &times;
</button>
  </div>
  <div class="panel-body" style="margin:12px">
  <div class="form-group">
  <textarea type="text" class="form-control" placeholder="Reason for Rejection" [(ngModel)]="webService.reason" style="background-color:rgba(242, 242, 242, 1);"rows="3" [(ngModel)]="reason"></textarea>
  </div>
  <button mat-raised-button color="primary" style="    float: right;
  margin: 10px;
  background: #ffffff;color:#072f61;font-weight:bold" (click)="ProvisionReject()" >submit</button>
  </div> 
  
  </div>

  `,
  styles: [`
  
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: black;
}
::-moz-placeholder { /* Firefox 19+ */
  color: black;
}`]

})
export class submitPopup {
  orderData: any;
  reason: any;
  constructor(public router: Router, public dialog: MatDialog, private dialogRef: MatDialogRef<submitPopup>, @Inject(MAT_DIALOG_DATA) public data: any, public auth: AuthService, private webService: WebService) {
    this.orderData = JSON.parse(this.auth.orderData)
  }
  ProvisionReject() {

    var data = JSON.stringify({
      "login": this.auth.data, "action": "update",
      "request_id": this.orderData[0].request_id, "status": "REJECTED", "reason": this.webService.reason
    })
    console.log(data)
    this.webService.RequestData(data).subscribe(res => {
      var response: any = res;
      if (response.job = true) {
        //this.dialogRef.close();
        this.webService.message = "Rejected Successfully";
        this.submitResult()
        //setTimeout(() => {
        // console.log("jsajsdj")

        //window.location.href="/AdminDashboard"
        //this.router.navigate(['/AdminDashboard']);
        //    },3000)
      }
      else {
        this.webService.message = "Submitted Failed";
        // this.dialogRef.close();
        this.submitResult()
        // setTimeout(() => {
        //   this.router.navigate(['/AdminDashboard']);
        //  window.location.href="/AdminDashboard"
        //  },3000)
      }
    })
  }
  submitResult() {
    this.dialogRef.close()
    let dialogRef = this.dialog.open(successPopup, {
      height: '100px',
      width: '400px'

    })
    setTimeout(() => {
      dialogRef.close()

      this.router.navigate(['/AdminDashboard']);
      console.log("closed")
      //  window.location.href="/AdminDashboard"
    }, 3000)
  }
  ngOnInit() {

  }

}

@Component({
  selector: 'myPopup',
  template: ` 
  
  <div class="panel panel-default" style="border-color:#232730;background-color:#232720;height:100%;margin-bottom:0px">
  <div class="panel-heading"><h4 class="text-left">Order Summary</h4>
  
  
  <button type="button" mat-dialog-close class="text-right close" style="outline:none;color:#ffffff;opacity:1.2;margin-top:-30px">
  &times;
</button></div>
  <div class="panel-body" style="padding:10px">
 
  <div class="container-fluid">
  <div class="row">
  <div class="col-md-2">
  <h5 style="font-weight: bold">Order Id</h5>
  <p>{{orderData[0].request_id}}</p>
  </div>
  <div class="col-md-2">
  <h5 style="font-weight: bold">Requester</h5>
  <p>{{orderData[0].pm_name}}</p>
  </div>
  <div class="col-md-2">
  <h5 style="font-weight: bold">Approver</h5>
  <p>{{orderData[0].admin_name}}</p>
  </div>
  <div class="col-md-2">
  <h5 style="font-weight: bold">Project Name</h5>
  <p>{{orderData[0].project_name}}</p>
  </div>
  <div class="col-md-2">
  <h5 style="font-weight: bold">Instance Type</h5>
  <p>{{orderData[0].instance_type}}</p>
  </div>
  </div>
  <div class="row">
  
  <div class="col-md-2">
  <h5 style="font-weight: bold">Start Date</h5>
  <p>{{orderData[0].start_date}}</p>
  </div>
  <div class="col-md-2">
  <h5 style="font-weight: bold">End Date</h5>
  <p>{{orderData[0].end_date}}</p>
  </div>
  <div class="col-md-2">
  <h5 style="font-weight: bold"> Price($) </h5>
  <p>{{orderData[0].price}}</p>
  </div>
  <div class="col-md-2">
  <h5 style="font-weight: bold"> Status </h5>
  <p [ngStyle]="{'color': orderData[0].status === 'APPROVED' ? 'green':( orderData[0].status === 'REJECTED' ? '#e5cb14' : '#000000')}">{{orderData[0].status}}</p>
  </div>
  </div>
  <hr>
  <div class="row">
  
  <div class="col-md-12" style="height: 155px;
  overflow-y: auto;">
  <mat-table [dataSource]="dataSource">
  
  ['no_of_instances','service_id', 'service_name','ram','cpu','hardDisk']
  <ng-container matColumnDef="no_of_instances">
        
  <mat-header-cell *matHeaderCellDef> No. Of Instances </mat-header-cell>
 
    <mat-cell *matCellDef="let element"> {{element.no_of_instances}}</mat-cell>

</ng-container>

      <ng-container matColumnDef="service_id">
        
        <mat-header-cell *matHeaderCellDef> Service Id </mat-header-cell>
       
          <mat-cell *matCellDef="let element"> {{element.service_id}}</mat-cell>

      </ng-container>
  
     
      <ng-container matColumnDef="service_name">
        <mat-header-cell *matHeaderCellDef> Service Name</mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.service_name}} </mat-cell>
      </ng-container>
  
      <ng-container matColumnDef="ram">
        
      <mat-header-cell *matHeaderCellDef> RAM(GB) </mat-header-cell>
      
        <mat-cell *matCellDef="let element"> {{element.ram}}</mat-cell>
      
      </ng-container>
      <ng-container matColumnDef="cpu">
              
      <mat-header-cell *matHeaderCellDef> CPU(#Core) </mat-header-cell>
      
        <mat-cell *matCellDef="let element"> {{element.cpu}}</mat-cell>
      
      </ng-container>
      <ng-container matColumnDef="hardDisk">
              
      <mat-header-cell *matHeaderCellDef> Hard Disk(GB) </mat-header-cell>
      
        <mat-cell *matCellDef="let element"> {{element.hardDisk}}</mat-cell>
      
      </ng-container>
     
  
      <mat-header-row *matHeaderRowDef="displayedColumns" ></mat-header-row>
     
      <mat-row *matRowDef="let row; columns: displayedColumns;" ></mat-row>
    </mat-table>
    </div>
  </div>
  <div style="float:right;margin:10px;" >
<button mat-raised-button color="primary"  class="cancel" [mat-dialog-close]="true" (click)="rejectRequest()"  [disabled]='orderData[0].status=="PROVISIONED" || orderData[0].status=="ALLOCATED"'style="background-color:white;color:red; margin:5px;border-radius:6px;border:1px solid #efecec">Reject</button>
<button id="proButton" mat-raised-button  class="pro" color="primary"  [mat-dialog-close]="true"  *ngIf="router.url == '/lmdashboard/orders' && orderData[0].status=='REQUESTED'" (click)="ApproveRequest()"  [disabled]='orderData[0].status=="PROVISIONED" || orderData[0].status=="ALLOCATED"' style="background-color:#ffffff;margin:5px;border-radius:6px;color:#072f61">Approve</button>
<button id="proButton" mat-raised-button  class="pro" color="primary"  [mat-dialog-close]="true"  *ngIf="orderData[0].status!='REQUESTED'" (click)="ProvisionRequest()"  [disabled]='orderData[0].status=="PROVISIONED" || orderData[0].status=="ALLOCATED"' style="background-color:#ffffff;margin:5px;border-radius:6px;color:#072f61">Provision</button></div>
  </div>
  
  </div>
</div>

    `,
  styles: [`
  mat-row:nth-child(even){
    background-color:white;
    }
    .col-md-2{
      width:20%
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
  
    }miss
    mat-header-cell{
   
     font-weight:bold;
     font-size:12px;
  
    }
    mat-row{
      border-bottom-width: 0px; 
      border-bottom-style: none;
      min-height: 40px;
    }
    .mat-raised-button[disabled]{
      cursor:not-allowed;
      color:white;
    }
   
    
    `]
})
export class myPopup {
  orderData: any;
  serviceData: any;
  tableData: any = [];
  displayedColumns: string[];
  dataSource;
  constructor(public auth: AuthService, private webService: WebService, public mydialogRef: MatDialogRef<myPopup>, public dialogRef: MatDialogRef<submitPopup>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private router: Router) {
    this.orderData = data;
    console.log(this.orderData);
  }
  requestServiceData() {
    var data = JSON.stringify({ "action": "read", "request_id": this.orderData[0].request_id })

    this.webService.getRequestServiceData(data).subscribe(res => {
      var response: any = res;
      this.serviceData = response.request;
      for (var i = 0; i < this.serviceData.length; i++) {
        this.tableData.push(
          {
            "no_of_instances": 1,
            "service_id": this.serviceData[i].service_id,
            "service_name": this.serviceData[i].service_name,
            "ram": 2,
            "cpu": 1,
            "hardDisk": 20
          })
      }
      console.log(this.tableData, "table")
      this.displayedColumns = ['no_of_instances', 'service_id', 'service_name', 'ram', 'cpu', 'hardDisk'];
      this.dataSource = new MatTableDataSource(this.tableData);


    })
  }
  // closeFunc(){

  //   $("#proButton").click()

  // }

  ApproveRequest() {
    var status;
    var day = new Date();
    var today = ("0" + (day.getMonth() + 1)).slice(-2) + "/" + ("0" + day.getDate()).slice(-2) + "/" + day.getFullYear();
    console.log("today " + today);

    var startdate: any = JSON.parse(this.auth.orderData);
    console.log("start date " + startdate[0].start_date);

    status = "APPROVED";


    var data = JSON.stringify({ "login": this.auth.data, "action": "update", "request_id": startdate[0].request_id, "status": status })
    console.log(status)
    this.webService.RequestData(data).subscribe(res => {
      var response: any = res;
      console.log(response);
      if (response.job == true) {
        this.webService.message = "Submitted successfully"
        this.submitResult()
        setTimeout(() => {
          // window.location.href="/AdminDashboard"
          // window.location.reload();
        }, 3000)
      } else {
        this.webService.message = "Submitted Failed"
        this.submitResult()
        setTimeout(() => {
          //   window.location.reload();
          //  window.location.href="/AdminDashboard"
        }, 3000)
      }
    })
  }

  ProvisionRequest() {

    var status;
    var day = new Date();
    var today = ("0" + (day.getMonth() + 1)).slice(-2) + "/" + ("0" + day.getDate()).slice(-2) + "/" + day.getFullYear();
    console.log("today " + today);

    var startdate: any = JSON.parse(this.auth.orderData);
    console.log("start date " + startdate[0].start_date);
    if (today == startdate[0].start_date) {
      status = "PROVISIONED";
    }
    else {
      status = "ALLOCATED";
    }


    var data = JSON.stringify({ "login": this.auth.data, "action": "update", "request_id": startdate[0].request_id, "status": status })
    console.log(status)
    this.webService.RequestData(data).subscribe(res => {
      var response: any = res;
      console.log(response);
      if (response.job == true) {
        this.webService.message = "Submitted successfully"
        this.submitResult()
        setTimeout(() => {
          // window.location.href="/AdminDashboard"
          // window.location.reload();
        }, 3000)
      } else {
        this.webService.message = "Submitted Failed"
        this.submitResult()
        setTimeout(() => {
          //   window.location.reload();
          //  window.location.href="/AdminDashboard"
        }, 3000)
      }
    })
  }
  submitResult() {
    console.log(this)

    this.dialog.closeAll()
    let dialogRef = this.dialog.open(successPopup, {
      height: '100px',
      width: '400px'
    })

    setTimeout(() => {

      dialogRef.close()
    }, 3000)

  }

  rejectRequest() {
    //  console.log("rejected")
    //  this.mydialogRef.close()

    let dialogRef = this.dialog.open(submitPopup, {
      height: '250px',
      width: '400px',
      data: this.auth.orderData
    })
    this.dialogRef.afterClosed().subscribe(result => {
      console.log("reject")
      //   this.requestListData();

    })
    // setTimeout(() => {

    //   dialogRef.close()  
    // },1000)
  }
  ngOnInit() {

    this.requestServiceData();
    $("#suc").hide();
    $("#fai").hide();

  }
}


@Component({
  selector: 'app-admin-request-list',
  templateUrl: './admin-request-list.component.html',
  styleUrls: ['./admin-request-list.component.scss']
})
export class AdminRequestListComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<myPopup>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
    public auth: AuthService, private webService: WebService, private router: Router) {

  }
  pageIndex = 0;
  pageLength: number;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  listOfRequests: any = [];
  displayedColumns: string[];
  dataSource: any;
  tab;
  public tableData: any = [];
  public tableData1: any = [];
  @ViewChild(MatPaginator, { static: false }) public paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  JSON = JSON;

  ngOnInit() {
    this.tab = 1;
    // this.lmtab('APPROVED', 1);


    this.requestListData();
    //this.paginator._intl.itemsPerPageLabel = 'Show';
    /* this.webService.Dashboard = false;
    this.webService.orders = true;
    this.webService.assurance = false;
    this.webService.Dashboard = false;
    this.webService.ReservationSystem = false;
    this.webService.myService = false;
    this.webService.LMDashboard = false;
    this.webService.labs = false;
    this.webService.ReservationList = false;
    this.webService.reports = false;

    this.webService.Dashboard = false;
    this.webService.devices = false;
    this.webService.Inventory = false;
    this.webService.catalogue = false;
    this.webService.calendar = false;
    this.webService.holidays = false;
    this.webService.Assets = false; */
    this.webService.currentTab = 'orders';

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  lm_req_history = [];
  dataSource_history_lm: any;

  //chatbot
  getProjectName() {
    var data = JSON.parse(this.auth.data);
    data.action = "read";
    data.status = ["APPROVED", "PROVISIONED", "IN PROGRESS", "ALLOCATED"];
    this.webService.RequestData(data).subscribe(res => {
      console.log(res, "try")
      var response: any = res;
      this.listOfRequests = response.request;


      var j = 0;
      var len = this.listOfRequests.length;
      for (var i = len - 1; i >= 0; i--) {
        if (this.listOfRequests[i].status == "APPROVED") {
          this.tableData1.push(
            {
              "sNo": "0" + (j + 1),
              "request_id": this.listOfRequests[i].request_id,
              "project_name": this.listOfRequests[i].project_name,

              //  "location_id" :this.listOfRequests[i].location_id,
              "start_date": this.listOfRequests[i].start_date,
              "end_date": this.listOfRequests[i].end_date,
              "status": "./assets/images/approved.svg",
              "price": this.listOfRequests[i].price
            })

          j = j + 1;
        }

      }

      this.webService.project_name = this.tableData1[0].project_name
      //response.request[response.request.length-1].project_name
      console.log(this.webService.project_name, "name of project")
    });
  }


  requestListData() {
    this.tableData.length = 0;
    // console.log("i m hererewrewftsr");
    var data = JSON.parse(this.auth.data);
    data.action = "read";
    // data.status = ["APPROVED", "PROVISIONED", "IN PROGRESS", "ALLOCATED"];
    data.status = ["APPROVED", "PROVISIONED", "REQUESTED", "IN PROGRESS", "RELEASED"];
    this.webService.RequestData(data).subscribe(res => {
      //console.log(res)
      var response: any = res;
      this.listOfRequests = response.request;
      // this.lm_req_history = this.listOfRequests.filter((item) => item.status == "APPROVED");
      // this.dataSource_history_lm = new MatTableDataSource(this.lm_req_history);
      console.log(this.listOfRequests);
      this.listOfRequests && this.listOfRequests.map((item) => {
        item.instance_type = item.instance_type && item.instance_type.toLowerCase() == "physical" ? "Server" : item.instance_type;
        if (!['RELEASED', 'CANCELLED'].includes(item.status.toUpperCase()))
          item.expired = moment(moment().format('MM/DD/YYYY'), "MM/DD/YYYY").isAfter(moment(item.end_date, "MM/DD/YYYY").format("MM/DD/YYYY"));
      });
      // this.displayedColumns=["sNo","request_id","project_name","location_id","start_date","end_date","status","price"];
      this.displayedColumns = ["sNo", "request_id", "service_type", "project_name", "start_date", "end_date", "price", "status"];

      this.lmtab("APPROVED", 1);

      return false
      // var j = 0;
      // var len = this.listOfRequests.length;
      // for (var i = len - 1; i >= 0; i--) {
      //   if (this.router.url == '/AdminDashboard/orders' &&
      //     (this.listOfRequests[i].status == "APPROVED")
      //     //  || this.listOfRequests[i].status == 'REQUESTED')
      //   ) {
      //     this.tableData.push(
      //       {
      //         "sNo": "0" + (j + 1),
      //         "request_id": this.listOfRequests[i].request_id,
      //         "project_name": this.listOfRequests[i].project_name,

      //         // "location_id" :this.listOfRequests[i].location_id,
      //         "start_date": this.listOfRequests[i].start_date,
      //         "end_date": this.listOfRequests[i].end_date,
      //         //  "status":"./assets/newimages/status.png",
      //         "status": this.listOfRequests[i].status,
      //         "price": this.listOfRequests[i].price
      //       })

      //     j = j + 1;
      //   } else if (this.router.url == '/lmdashboard/orders' &&
      //     (this.listOfRequests[i].status == "REQUESTED")
      //   ) {
      //     this.tableData.push(
      //       {
      //         "sNo": "0" + (j + 1),
      //         "request_id": this.listOfRequests[i].request_id,
      //         "project_name": this.listOfRequests[i].project_name,

      //         // "location_id" :this.listOfRequests[i].location_id,
      //         "start_date": this.listOfRequests[i].start_date,
      //         "end_date": this.listOfRequests[i].end_date,
      //         //  "status":"./assets/newimages/status.png",
      //         "status": this.listOfRequests[i].status,
      //         "price": this.listOfRequests[i].price
      //       })

      //     j = j + 1;
      //   }

      // }
      // console.log(this.tableData)
      // this.webService.adminTableData = this.tableData
      // //  this.auth.setadminTableData(this.tableData);
      // this.pageLength = this.tableData.length;
      // this.tableData = this.tableData.slice(((0 + 1) - 1) * this.pageSize).slice(0, this.pageSize);
      // this.dataSource = new MatTableDataSource(this.tableData);

      // // this.dataSource = new MatTableDataSource(this.tableData);
      // // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    })

  }

  viewRequest(num) {
    console.log("myconsole")

    var data = JSON.parse(this.auth.data);
    // data.action="read";
    // data.status=["APPROVED","PROVISIONED"viewRequest, "IN PROGRESS", "ALLOCATED"];
    //   this.webService.RequestData(data).sviewRequestubscribe(res => {
    //     //console.log(res)
    //    var response:any=res;
    //    this.listOfRequests=response.request;
    //    this.displayedColumns=["sNo","request_id","project_name","location_id","start_date","end_date","status","price"];
    //    var j=0;
    //    for(var i=0;i<this.listOfRequests.length;i++){
    //      if(this.listOfRequests[i].status=="APPROVED"){
    //     this.tableData.push(
    //       {"sNo":"0"+(j+1),
    //     "request_id" :this.listOfRequests[i].request_id,
    //    "project_name" :this.listOfRequests[i].project_name,

    //     "location_id" :this.listOfRequests[i].location_id,
    //      "start_date" :this.listOfRequests[i].start_date,
    //      "end_date" :this.listOfRequests[i].end_date,
    //    "status":"./assets/images/approved.svg",
    //      "price":this.listOfRequests[i].price
    //    })
    //    //console.log("sjkk",this.tableData)
    //    j=j+1;
    //   }
    //   }
    // console.log("syuydsga",this.tableDataadminData)

    var reqId;

    console.log(this.tableData);
    //var adminData:any=JSON.parse(this.auth.adminData)
    var adminData: any = this.tableData
    console.log("sajdjdhash")
    console.log(adminData)
    for (var i = 0; i < adminData.length; i++) {

      console.log(adminData[i].sNo, num)
      if (adminData[i].sNo == num) {
        reqId = adminData[i].request_id;
        console.log("reqId", reqId)
      }
    }
    console.log("reqId", reqId)
    var pro = data.project_id;

    var data1 = { "project_id": pro, "action": "read", "request_id": reqId };

    var data2 = JSON.stringify(data1);
    this.webService.RequestData(data2).subscribe(res => {
      var response: any = res
      console.log(response, "1myconsole")
      this.auth.setOrderData(response.request);
      this.dialogRef = this.dialog.open(myPopup, {
        height: '450px',
        width: '700px',
        data: response.request
      })
      this.dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed1');
        this.requestListData()
      })


    })
    //  });

  }

  getDetails_more(row) {
    if (JSON.parse(this.auth.data).role == 'LM')
      this.router.navigate(['/home/lmdashboard/lm-req-processing'], { queryParams: { request_id: row.request_id } });
    if (JSON.parse(this.auth.data).role.toLowerCase() == 'admin')
      // this.viewRequest(row.sNo)
      this.router.navigate(['/home/AdminDashboard/lm-req-processing'], { queryParams: { request_id: row.request_id } });
  }



  lmtab(tab, number) {
    this.tab = number;
    this.pageIndex = 0;
    // console.log(tab, number)
    let status = '';
    if (this.tab == 2)
      status = JSON.parse(this.auth.data).role.toLowerCase() == 'admin' ? 'PROVISIONED, IN PROGRESS, RELEASED' : 'APPROVED, REJECTED'
    else
      status = JSON.parse(this.auth.data).role.toLowerCase() == 'admin' ? 'APPROVED' : 'REQUESTED';


    // let data_ = this.listOfRequests.filter((item) => {
    //   if (tab == "PROVISIONED") {
    //     if (item.status == tab || item.status == "IN PROGRESS") return true;
    //   } else {
    //     if (item.status == tab) return true;
    //   }

    // })
    let data_ = this.makeMatTblList(this.filter_base(this.listOfRequests, status, 'status'));
    this.pageLength = data_.length;
    data_ = data_.slice(((0 + 1) - 1) * this.pageSize).slice(0, this.pageSize);
    this.dataSource = new MatTableDataSource(data_);
  }

  pageChangeEvent(event) {
    let status = '';
    if (this.tab == 2)
      status = JSON.parse(this.auth.data).role.toLowerCase() == 'admin' ? 'PROVISIONED, IN PROGRESS, RELEASED' : 'APPROVED, REJECTED'
    else
      status = JSON.parse(this.auth.data).role.toLowerCase() == 'admin' ? 'APPROVED' : 'REQUESTED'
    // console.log(status)

    // let data_ = this.listOfRequests.filter((item) => (item) => {
    //   if (status == "PROVISIONED") {
    //     if (item.status == status || item.status == "IN PROGRESS") return true;
    //   } else {
    //     if (item.status == status) return true;
    //   }

    // })

    let data_ = this.makeMatTblList(this.filter_base(this.listOfRequests, status, 'status'));

    this.pageLength = data_.length;
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    data_ = data_.slice(offset).slice(0, event.pageSize);
    this.dataSource = new MatTableDataSource(data_);
    // const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    // this.splicedData = this.requests.slice(offset).slice(0, event.pageSize);
  }

  makeMatTblList(array) {
    return array.map((item, i) => {
      return {
        "sNo": "0" + (i + 1),
        "request_id": item.request_id,
        "project_name": item.project_name,
        "service_type": item.instance_type,
        // "location_id" :item.location_id,
        "start_date": item.start_date,
        "end_date": item.end_date,
        //  "status":"./assets/newimages/status.png",
        "status": item.status,
        "price": item.price,
        expired: item.expired
      }
    });
  }

  filter_base(array, string, key) {
    // _.sortBy(users, ['user', 'age']);
    return _.sortBy(array.filter((item) => item[key] && string.includes(item[key])), ['request_id']).reverse();

  }

}

