import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {


  listOfRequests: any;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private auth: AuthService, private webService: WebService) { }
  public tableData: any = [];
  displayedColumns: string[]
  dataSource;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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

  getFilteredData(){
    console.log(this.webService.todayDateReservation)
    console.log(this.webService.lastDateReservation)
    
    let stDate = new Date(this.webService.todayDateReservation);
    let enDate = new Date(this.webService.lastDateReservation);
    var data = {
      "start_date": stDate,
      "end_date": enDate,
      "location":"all"
      }
    this.webService.getFilteredReservationData(data).subscribe(res => {
      console.log(res)
    })
  }


  reservationSystemData() {
    
    // var data = {
    //             "start_date": "",
    //             "end_date": ""
    //             }
    //JSON.parse(this.auth.data);
  //  data.action = "read";

  this.webService.getCatologueData().subscribe(res => {
    // this.webService.getReservationList().subscribe(res => {
      var response: any = res;
      this.listOfRequests = response.opnfv;
      console.log(this.listOfRequests);
    //  this.listOfRequests.sort((a, b) => a.serial_no.localeCompare(b.serial_no));
      //this.displayedColumns=["sNo","request_id","project_name","pm_name","admin_name","location_id","start_date","end_date","status","price"];
      this.displayedColumns = ["name", "ram", "cpu", "model", "storage", "price"];      
      // this.displayedColumns = ["name", "status", "model"];
      var len = this.listOfRequests.length;
      var j = 0;
      // for (var i = len - 1; i >= 0; i--) {
        for(var i=0;i<len;i++){
        console.log(JSON.parse(this.listOfRequests[i].configurations.replace(/'/g, '"'))); 

        var inventoryData=JSON.parse(this.listOfRequests[i].configurations.replace(/'/g, '"')); 


        this.tableData.push(
          {
            "name":  inventoryData.specs[0].name,
            "ram": inventoryData.specs[0].ram,
            "cpu": inventoryData.specs[0].cpu,
            "model": inventoryData.specs[0].model,
            "storage": inventoryData.specs[0].storage,
            "price": this.listOfRequests[i].price_per_hr,
            "status": this.listOfRequests[i].status,
            // "location_id" :this.listOfRequests[i].location_id,
            // "reservedBy": this.listOfRequests[i].consumer,
            // "allocatedTo": this.listOfRequests[i].project,
            // "actions": this.listOfRequests[i].consumer
            
          })
        j = j + 1;
      }
      console.log("loop outside")
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

      // let dialogRef = this.dialog.open(orderPopup, {
      //   height: '450px',
      //   width: '700px',
      //   data: response.request
      // })
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed1');
      //   this.reservationSystemData()
      // })
    })

  }
  ngOnInit() {

    this.reservationSystemData();
    this.paginator._intl.itemsPerPageLabel = 'Show';

    this.webService.Dashboard  =false;
    this.webService.ReservationSystem  =false;
    this.webService.myService  =false;
 this.webService.LMDashboard=false;
this.webService.orders=false;
this.webService.labs=false;
this.webService.ReservationList=false;
this.webService.reports=false; 
    this.webService.Inventory  =false;
  
    this.webService.devices  =true;
    this.webService.ReservationList  =false;
  }


}
