import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  listOfRequests: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private auth: AuthService, private webService: WebService) { }
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
  reservationSystemData() {

    var data = { "status": "Available", "action": "read" };
    //JSON.parse(this.auth.data);
    //  data.action = "read";

    this.webService.getCatologueData().subscribe(res => {
      // this.webService.getCatalogueList(data).subscribe(res => {
      var response: any = res;
      this.listOfRequests = response.catalogue;
      console.log(this.listOfRequests);
      //  this.listOfRequests.sort((a, b) => a.serial_no.localeCompare(b.serial_no));
      //this.displayedColumns=["sNo","request_id","project_name","pm_name","admin_name","location_id","start_date","end_date","status","price"];
      this.displayedColumns = ["serviceName", "serviceType", "serviceId", "imageType", "versions", "description", "pricePerHr"];
      var len = this.listOfRequests.length;
      var j = 0;
      for (var i = len - 1; i >= 0; i--) {
        this.tableData.push(
          {
            "serviceName": this.listOfRequests[i].service_name,
            "serviceType": this.listOfRequests[i].service_type,
            "serviceId": this.listOfRequests[i].service_id,
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
    //this.paginator._intl.itemsPerPageLabel = 'Show';
    /* this.webService.Dashboard = false;
    this.webService.ReservationSystem = false;
    this.webService.devices = true;
    this.webService.ReservationList = false;
    this.webService.Dashboard = false;
    this.webService.ReservationSystem = false;
    this.webService.myService = false;
    this.webService.LMDashboard = false;
    this.webService.orders = false;
    this.webService.labs = false;
    this.webService.reports = false;
    this.webService.Inventory = false;
    this.webService.catalogue = true;
    this.webService.Assets = false; */

    this.webService.currentTab = 'catalogue';
  }



}
