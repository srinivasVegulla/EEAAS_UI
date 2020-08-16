
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { deletePopup } from '../pmrequestlist/pmrequestlist.component';
import { MatSelect } from '@angular/material';
@Component({
  selector: 'editServicePopup',
  template: ` 
    
  <div class="panel panel-default" style="border-color:#232730;background-color:#232720;height:100%;margin-bottom:0px">
  <div class="panel-heading"><h4 class="text-left">Edit Service</h4>
  
  
  <button type="button" mat-dialog-close class="text-right close" style="outline:none;color:#ffffff;opacity:1.2;margin-top:-30px">
  &times;
</button></div>
  <div class="panel-body" style="padding:10px">
  <div class="container-fluid">
  <form  #serviceForm="ngForm">
  <div class="row">
    <div class="col-sm-3">
    <mat-form-field>
    <input matInput type="text" required placeholder="Name" [(ngModel)]="serviceData.serviceName"  [ngModelOptions]="{standalone: true}" name="name" #name="ngModel">
  </mat-form-field>
 
    </div>

    <div class="col-sm-3">
    <mat-form-field>
    <input matInput type="text" required placeholder="Description" [(ngModel)]="serviceData.description" name="description"
    #description="ngModel">
  </mat-form-field>
     
    </div>

    <div class="col-md-3">
      <mat-form-field>
        <mat-select placeholder="Service Type" #mySelect [(ngModel)]="serviceData.serviceType" name="servT">

          <div class="right-inner-addon">

            <i class="glyphicon glyphicon-search"></i>

            <input matInput type="search" [(ngModel)]="searchServiceType" [ngModelOptions]="{standalone: true}"
              class="searchInput" placeholder="Search" />
          </div>
          
          <mat-option *ngFor="let name of webService.service_Types| search: searchServiceType: 'serviceTypes'"
            [value]="name">{{name}}</mat-option>
        </mat-select>
        <!-- <mat-error *ngIf="toppings.hasError">You must select atleast two Accounts</mat-error> -->
      </mat-form-field>
    </div>

    <div class="col-sm-3">
    <mat-form-field>
    <input matInput type="text" required placeholder="Versions" [(ngModel)]="serviceData.versions"  name="versions"
    #version="ngModel">
  </mat-form-field>
    
    </div>
  </div>
  
  <div class="row">
   

    <div class="col-sm-3">
    <mat-form-field>
    <input matInput type="text" required placeholder="Price Per Hour" [(ngModel)]="serviceData.pricePerHr" name="pricePerHour"
    #price="ngModel">
  </mat-form-field>
   
    </div>
 
  </div>


  <button type="submit" class="btn btn-success" [disabled]="!serviceForm.form.valid" (click)="saveService()">Confirm</button>
  <button type="submit" class="btn btn-error"  (click)="cancel()" routerLink="/DesignerDashboard">Cancel</button>
</form>
  </div>
</div></div>
  `,
  styles: [`

`]

})
export class editServicePopup {
  serviceData: any;
  constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<editServicePopup>, @Inject(MAT_DIALOG_DATA) public data: any, public auth: AuthService, private webService: WebService) {
    console.log(this.data)
    this.serviceData = this.data
  }
  cancel() {
    this.dialogRef.close("false")
  }
  saveService() {
    console.log(this.serviceData)
    // console.log(formData.form.value)
    // let serviceData=formData.form.value;
    var data = {
      "action": "update",
      "description": this.serviceData.description,
      "image_type": this.serviceData.imageType,
      "price_per_hr": this.serviceData.pricePerHr,
      "provider_id": "Designer",
      "service_name": this.serviceData.serviceName,
      "service_type": this.serviceData.serviceType,
      "status": "Available",
      "versions": this.serviceData.versions,
      "service_id": this.serviceData.serviceId
    };

    console.log(data)
    this.webService.setServiceData(data).subscribe(res => {
      console.log("data", res);
      var resp: any = res;
      if (resp.job) {
        this.dialogRef.close("true")
      }
      // this.router.navigate([`/AdminDashboard/lab1`])
      //this.router.navigate([`/DesignerDashboard`])
    })

  }
}
@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss']
})

export class DesignerComponent implements OnInit {

  listOfRequests: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private auth: AuthService, private webService: WebService) { }
  public tableData: any = [];
  public bareMetalTableData: any = [];

  displayedColumns: string[]
  bareMetalDisplayedColumns: string[];
  dataSource;
  bareMetalDataSource;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilterBareMetal(filterValue: string) {
    this.bareMetalDataSource.filter = filterValue.trim().toLowerCase();

    if (this.bareMetalDataSource.paginator) {
      this.bareMetalDataSource.paginator.firstPage();
    }
  }
  reservationSystemData() {
    this.tableData.length = 0;
    var data = { "status": "Available", "action": "read" };
    //JSON.parse(this.auth.data);
    //  data.action = "read";

    this.webService.getCatalogueList(data).subscribe(res => {
      var response: any = res;
      this.listOfRequests = response.catalogue;
      console.log(this.listOfRequests);
      //  this.listOfRequests.sort((a, b) => a.serial_no.localeCompare(b.serial_no));
      //this.displayedColumns=["sNo","request_id","project_name","pm_name","admin_name","location_id","start_date","end_date","status","price"];
      this.displayedColumns = ["serviceId", "serviceName", "serviceType", "imageType", "versions", "description", "pricePerHr", "actions"];
      var len = this.listOfRequests.length;
      var j = 0;
      for (var i = len - 1; i >= 0; i--) {
        this.tableData.push(
          {
            "serviceId": this.listOfRequests[i].service_id,
            "serviceName": this.listOfRequests[i].service_name,
            "serviceType": this.listOfRequests[i].service_type,
            "imageType": this.listOfRequests[i].image_type,
            "versions": this.listOfRequests[i].versions,
            // "location_id" :this.listOfRequests[i].location_id,
            "description": this.listOfRequests[i].description,
            "pricePerHr": this.listOfRequests[i].price_per_hr
          })
        j = j + 1;
      }
      console.log(this.tableData)

      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  dsData;

  private idColumn = 'serviceId';
  deleteService(row) {
    var deleteData = { "service_id": row.serviceId, "action": "delete" }
    let dialogRef = this.dialog.open(deletePopup, {
      height: '170px',
      width: '450px',

    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.webService.deleteServiceData(deleteData).subscribe(res => {
          console.log("hi vegu catalog del", res, this.paginator)
          //////////////////////////
          this.dsData = this.dataSource.data;
          const itemIndex = this.dsData.findIndex(obj => obj === row);
          this.dataSource.data.splice(itemIndex, 1);
          this.dataSource.paginator = this.paginator;
          //////////////////////////////
          this.reservationSystemData();
        });
      }
      else {
        console.log("closed");
      }
    })

  }
  // viewRequest(reqId) {
  //   console.log(reqId);
  //   var data = JSON.parse(this.auth.data);

  //   var pro = data.project_id;
  //   var data1 = { "project_id": pro, "action": "read", "request_id": reqId };
  //   var data2 = JSON.stringify(data1);
  //   this.webService.RequestData(data2).subscribe(res => {
  //     var response: any = res

  //     // let dialogRef = this.dialog.open(orderPopup, {
  //     //   height: '450px',
  //     //   width: '700px',
  //     //   data: response.request
  //     // })
  //     // dialogRef.afterClosed().subscribe(result => {
  //     //   console.log('The dialog was closed1');
  //     //   this.reservationSystemData()
  //     // })
  //   })

  // }

  reservationSystemBareMetalData() {

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
      this.bareMetalDisplayedColumns = ["checked", "serviceid", "name", "status", "reservedBy", "allocatedTo"];
      var len = this.listOfRequests.length;
      var j = 0;
      for (var i = len - 1; i >= 0; i--) {
        //  console.log("hi",this.listOfRequests[i].reserved_date)
        // var stdate=JSON.parse(this.listOfRequests[i].reserved_date.replace(/'/g, '"'))[0].start_date;
        //  var endate=JSON.parse(this.listOfRequests[i].reserved_date.replace(/'/g, '"'))[0].end_date;

        // console.log(stdate); 
        this.bareMetalTableData.push(
          {
            "checked": false,
            "serviceid": this.listOfRequests[i].service_id,
            "name": this.listOfRequests[i].name,
            // "startDate": stdate,
            // "endDate": endate,
            "status": this.listOfRequests[i].status,
            // "location_id" :this.listOfRequests[i].location_id,
            "reservedBy": this.listOfRequests[i].consumer,
            "allocatedTo": this.listOfRequests[i].project,
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

  addService() {
    this.auth.addCatalogueService();

  }
  EditService(row) {
    let dialogRef = this.dialog.open(editServicePopup, {
      height: '230px',
      width: '1100px',
      data: row
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        console.log(result)
        this.reservationSystemData();
      }
    })
  }
  ngOnInit() {

    this.reservationSystemData();
    this.reservationSystemBareMetalData();
    //  this.paginator._intl.itemsPerPageLabel = 'Show';

    this.webService.Dashboard = false;
    this.webService.devices = false;
    this.webService.ReservationSystem = false;
    this.webService.myService = false;
    this.webService.LMDashboard = false;
    this.webService.orders = true;
    this.webService.labs = false;
    this.webService.ReservationList = false;
    this.webService.reports = false;
    this.webService.Inventory = false;
    this.webService.Dashboard = false;
    this.webService.myService = true;
    this.webService.calendar = false;
    this.webService.holidays = false;
    this.webService.Assets = false;
  }



}
