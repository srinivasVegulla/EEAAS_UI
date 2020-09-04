import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExtendPopupComponent } from '../extend-popup/extend-popup.component'

import { successPopup } from '../admin-request-list/admin-request-list.component';
@Component({
  selector: 'cancelPopup',
  template: `
  <div class="panel panel-default" style="overflow:hidden;border-color:#232730;background-color:#232720;height:100%;margin-bottom:0px">
  <div class="panel-heading"><h4 class="text-left">Cancel Request</h4>

  <button type="button" mat-dialog-close class="text-right close" style="opacity:1.2;margin-top:-30px;outline:none;color:white">
  &times;
</button></div>
  <div class="panel-body" style="padding:10px">
  <p>Are you sure you want to cancel the Request?</p>
  <div class="customRow" style="text-align: right;
  margin-top: 33px;
  margin-right: 10px;">
  <button mat-raised-button class="cancel" style="border-radius:6px;background:#ffffff;z-index:4;font-weight:bold;color:#072f61; margin: 0 5px"  [mat-dialog-close]="false" >No</button>
  <button mat-raised-button class="pro"  style="border-radius:6px;background:#ffffff;z-index:4;font-weight:bold;color:#072f61; margin: 0 5px" [mat-dialog-close]="true">Yes</button>

</div>
  </div>

  </div>
  `,
  styles: [`

`]
})
export class cancelPopup {
  constructor(private dialogRef: MatDialogRef<orderPopup>, private webService: WebService) {

  }
  ngOnInit() {


  }
}
@Component({
  selector: 'deletePopup',
  template: ` 
  <div class="panel panel-default" style="overflow:hidden;border-color:#232730;background-color:#232720;height:100%;margin-bottom:0px">
  <div class="panel-heading"><h4 class="text-left">Delete Request</h4>
  
  <button type="button" mat-dialog-close class="text-right close" style="opacity:1.2;margin-top:-30px;outline:none;color:white">
  &times;
</button></div>
  <div class="panel-body" style="padding:10px">
  <p>Are you sure you want to delete this Request?</p>
  <div class="customRow" >
  <button mat-raised-button class="cancel btnMargin" style="border-radius:6px;background:#ffffff;z-index:4;font-weight:bold;color:#072f61"  [mat-dialog-close]="false" >No</button>
  <button mat-raised-button class="pro btnMargin"  style="border-radius:6px;background:#ffffff;z-index:4;font-weight:bold;color:#072f61" [mat-dialog-close]="true">Yes</button>

</div>
  </div>
 
  </div> 
  `,
  styles: [`

`]
})
export class deletePopup {
  constructor(private dialogRef: MatDialogRef<orderPopup>) {

  }
  ngOnInit() {

  }

}
@Component({
  selector: 'submitPopup',
  template: ` 
  <div class="panel panel-default" style="border-bottom-width: 0px;">
  <div class="panel-heading"><h4 class="text-left">Comments</h4>
  <button type="button" mat-dialog-close class="text-right close" style="opacity:1.2;margin-top:-30px">
  &times;
</button></div>
  <div class="panel-body">
  <mat-card style="background-color:lightgrey">Reason for Rejection</mat-card>
 
   </div>
  </div> 
  `,
  styles: [`
  .panel-default>.panel-heading {
  
    background-color: white;
  
};
`]
})
export class submitPopup {
  constructor(private dialogRef: MatDialogRef<orderPopup>) {

  }
  ngOnInit() {

  }

}

@Component({
  selector: 'orderPopup',
  template: ` 
  
  <div class="panel panel-default" style="border-color:#232730;background-color:#ffffff;height:100%;margin-bottom:0px">
  <div class="panel-heading"><h4 class="text-left">Order Summary</h4>
  
  <button type="button" mat-dialog-close class="text-right close" style="opacity:1.2;margin-top:-30px;outline:none;color:white">
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
  <h5 style="font-weight: bold">Platform</h5>
  <p>{{orderData[0].instance_type | uppercase }}</p>
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
  <p [ngStyle]="{'color': orderData[0].status === 'APPROVED' ? 'green':( orderData[0].status === 'REJECTED' ? '#e5cb14' : 'black')}">{{orderData[0].status}}</p>
  </div>
  </div>
  <hr>
  <div class="row">
  <div class="col-md-12" style="height: 165px;
  overflow-y: auto;">
  <mat-table [dataSource]="dataSource">
  
   
    
      <ng-container matColumnDef="service_id">
        
        <mat-header-cell *matHeaderCellDef> Service Id </mat-header-cell>
       
          <mat-cell *matCellDef="let element"> {{element.service_id}}</mat-cell>

      </ng-container>
  
     
      <ng-container matColumnDef="service_name">
        <mat-header-cell *matHeaderCellDef> Service Name</mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.service_name | uppercase}} </mat-cell>
      </ng-container>
  
     
     
  
      <mat-header-row *matHeaderRowDef="displayedColumns" ></mat-header-row>
     
      <mat-row *matRowDef="let row; columns: displayedColumns;" ></mat-row>
    </mat-table></div>
  </div>
  </div>
  <div style="float:left;margin:10px;" *ngIf="orderData[0].instance_type != 'aws'">

  <button mat-raised-button class="cancel" color="primary" (click)="deleteRequest()" [disabled]='orderData[0].status!="REQUESTED" ' style="background-color:#ffffff;color:#072f61">Delete Request</button></div>
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
    mat-row{
      border-bottom-width: 0px; 
      border-bottom-style: none;
      min-height: 40px;
    }
   
    `]
})
export class orderPopup {
  orderData: any;
  serviceData: any;
  tableData: any = [];
  displayedColumns: string[];
  dataSource;
  constructor(private auth: AuthService, private webService: WebService, private dialogRef2: MatDialogRef<successPopup>, public dialogRef1: MatDialogRef<orderPopup>, public dialogRef: MatDialogRef<submitPopup>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private router: Router) {
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
            "service_id": this.serviceData[i].service_id,
            "service_name": this.serviceData[i].service_name,

          })
      }
      console.log(this.tableData)
      this.displayedColumns = ['service_id', 'service_name'];
      this.dataSource = new MatTableDataSource(this.tableData);


    })
  }


  deleteRequest() {

    let dialogRef = this.dialog.open(deletePopup, {
      height: '170px',
      width: '450px',

    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      console.log(result)
      if (result) {
        var data = { "login": this.auth.data, "status": "DELETED", "action": "update", "request_id": this.orderData[0].request_id }
        this.webService.RequestData(data).subscribe(res => {
          console.log(res)
          this.webService.message = "Deleted Successfully"
          let dialogRef = this.dialog.open(successPopup, {
            height: '100px',
            width: '400px',
          })
          setTimeout(() => {


            dialogRef.close();
            this.dialogRef1.close();

          }, 3000)
          // alert("Request is deleted successfully");
          // window.location.reload();

        });
      }


    })
  }

  submit() {
    this.dialogRef.close()
    let dialogRef = this.dialog.open(submitPopup, {
      height: '250px',
      width: '400px',
      data: ["data"]
    })
  }
  ngOnInit() {

    this.requestServiceData();


  }
}



@Component({
  selector: 'app-pmrequestlist',
  templateUrl: './pmrequestlist.component.html',
  styleUrls: ['./pmrequestlist.component.scss']
})
export class PmrequestlistComponent implements OnInit {
  listOfRequests: any;
  constructor(public dialogRef: MatDialogRef<orderPopup>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef1: MatDialogRef<cancelPopup>, private auth: AuthService, private webService: WebService) { }
  public tableData: any = [];
  displayedColumns: string[]
  dataSource;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  requestListData() {
    this.tableData.length = 0;
    var data = JSON.parse(this.auth.data);
    data.action = "read";

    this.webService.RequestData(data).subscribe(res => {
      var response: any = res;
      this.listOfRequests = response.request;
      this.listOfRequests = this.listOfRequests.filter((item) => {
        return (item.instance_type == 'aws' || item.instance_type == 'vm')
      })
      console.log("hi 1111  fffffffffff", this.listOfRequests)
      this.listOfRequests.sort((a, b) => a.request_id.localeCompare(b.request_id));
      //this.displayedColumns=["sNo","request_id","project_name","pm_name","admin_name","location_id","start_date","end_date","status","price"];
      this.displayedColumns = ["instance_type", "request_id", "project_name", "admin_name", "start_date", "end_date", "status", "price", "cancel"];
      var len = this.listOfRequests.length;
      var j = 0;
      /* console.log("hi 1111  fffffffffff", this.listOfRequests)
      this.listOfRequests = this.listOfRequests.filter((item) => {
        return (item.instance_type == 'aws' || item.instance_type == 'vm')
      })
      console.log("hi fffffffffff", this.listOfRequests) */
      for (var i = len - 1; i >= 0; i--) {
        var date: any = new Date(this.listOfRequests[i].start_date)
        date = date.setDate(date.getDate() + 1);
        this.tableData.push(
          {
            "instance_type": this.listOfRequests[i].instance_type,
            "request_id": this.listOfRequests[i].request_id,
            "project_name": this.listOfRequests[i].project_name,
            "pm_name": this.listOfRequests[i].pm_name,
            "admin_name": this.listOfRequests[i].admin_name,
            // "location_id" :this.listOfRequests[i].location_id,
            "start_date": this.listOfRequests[i].start_date,
            "end_date": this.listOfRequests[i].end_date,
            "status": this.listOfRequests[i].status,
            "price": this.listOfRequests[i].price,
            "cancel": (this.listOfRequests[i].status == 'REJECTED') || (this.listOfRequests[i].status == 'CANCELLED') || (this.listOfRequests[i].status == 'DELETED') || (new Date(date) < new Date())
          })
        j = j + 1;
      }
      console.log(this.tableData)

      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  viewRequest(reqId) {
    console.log(reqId);
    var data = JSON.parse(this.auth.data);

    var pro = data.project_id;
    var data1 = { "project_id": pro, "action": "read", "request_id": reqId };
    var data2 = JSON.stringify(data1);
    this.webService.RequestData(data2).subscribe(res => {
      var response: any = res

      let dialogRef = this.dialog.open(orderPopup, {
        height: '450px',
        width: '700px',
        data: response.request
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed1');
        this.requestListData()
      })
    })
  }
  extendRequest(rowData) {
    console.log(rowData);

    var date1 = new Date(rowData.end_date);
    var date2 = new Date();
    console.log(date1);
    console.log(date2);
    if (date2 < date1) {
      var timeDiff = Math.abs(date1.getTime() - date2.getTime());
      var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
      if (diffDays >= 1) {
        let dialogRef = this.dialog.open(ExtendPopupComponent, {
          height: '260px',
          width: '500px',
          data: rowData.request_id
        })
        console.log(diffDays);
      } else {
        alert("You can only extend before 24 hours of the end time")
      }

    } else {
      alert("not allowed")
    }



  }
  cancelRequest(rowData) {
    console.log("cancel")


    var reqData = { "request_id": rowData.request_id, "action": "cancel" };
    console.log(reqData)

    var reqDataJSON = JSON.stringify(reqData);
    //this.webService.RequestData(reqDataJSON).subscribe(res => {
    //var response: any = res
    //console.log(response)
    let dialogRef = this.dialog.open(cancelPopup, {
      height: '170px',
      width: '400px',
      //  data: response.request
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed1');
      console.log(result);
      if (result) {
        this.webService.RequestData(reqDataJSON).subscribe(res => {
          console.log(res)
          var resp: any = res;

          if (resp.job) {
            this.requestListData()

          }
        })
      }
      //   this.requestListData()
    })
    // })

  }
  ngOnInit() {

    this.requestListData();
    //this.paginator._intl.itemsPerPageLabel = 'Show';

    /* this.webService.Dashboard  =false;
    this.webService.ReservationSystem  =false;
    this.webService.myService  =false;
  
    this.webService.Inventory  =false;
  
    this.webService.devices  =false;
    this.webService.ReservationList  =true; */

    this.webService.currentTab = 'ReservationList';


  }
}
