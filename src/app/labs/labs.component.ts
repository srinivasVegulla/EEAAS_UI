import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent implements OnInit {

  hydLocation: boolean;
  labName: string = '';
  listOfRequests: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private auth: AuthService,
    private webService: WebService, private router: Router) { }
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
  openAdd(){
    this.auth.addLabService();
  }
  getFilteredData() {
    console.log(this.webService.todayDateReservation)
    console.log(this.webService.lastDateReservation)

    let stDate = new Date(this.webService.todayDateReservation);
    let enDate = new Date(this.webService.lastDateReservation);

    if(this.hydLocation == false) {
      var data = {
        "start_date": stDate,
        "end_date": enDate,
        "location":"PDI_SKYVIEW"
      }
    } else if (this.hydLocation == true) {
      var data = {
        "start_date": stDate,
        "end_date": enDate,
        "location":"COLO-HYD"
      }
    }

    // var data = {
    //   "start_date": stDate,
    //   "end_date": enDate,
    //   "location":"all"
    // }

    this.webService.getFilteredReservationData(data).subscribe(res => {
      console.log(res)
    })
  }


  reservationSystemData() {
    var data:any;

    // var data = {
    //             "start_date": "",
    //             "end_date": ""
    //             }
    //JSON.parse(this.auth.data);
    //  data.action = "read";
    if(this.hydLocation == false) {
      data = {
        "location":"ODC3",
        "action":"read"
      }
    } else  {
      data = {
        "location":"ODC1",
        "action":"read"
      }
    }
    // var data = {
    //   "start_date": stDate,
    //   "end_date": enDate,
    //   "location":"all"
    // }
    console.log(data)

    this.webService.getReservationListLocation(data).subscribe(res => {
    // this.webService.getReservationList().subscribe(res => {
      var response: any = res;
      this.listOfRequests = response.opnfv;
      console.log(this.listOfRequests);
      //  this.listOfRequests.sort((a, b) => a.serial_no.localeCompare(b.serial_no));
      //this.displayedColumns=["sNo","request_id","project_name","pm_name","admin_name","location_id","start_date","end_date","status","price"];
      this.displayedColumns = ["S_No","asset_id","model", "cpu","ram","allocation_type", "ip_address","team","start_date","end_date"];
      // this.displayedColumns = ["name", "status", "model"];
      var len = this.listOfRequests.length;
      var j = 0;
      // for (var i = len - 1; i >= 0; i--) {
      for (var i = 0; i < len; i++) {

        this.tableData.push(
          {
            "S_No": this.listOfRequests[i].op_id,
            "asset_id": this.listOfRequests[i].asset_id,//inventoryData.specs[0].name,
            "model": this.listOfRequests[i].model,
            "ram": this.listOfRequests[i].ram,
            "cpu": this.listOfRequests[i].cpu,
            //"model": inventoryData.specs[0].model,
            //"storage": this.listOfRequests[i].storage,
            "allocation_type": this.listOfRequests[i].allocation_type,
            "ip_address": this.listOfRequests[i].ip_address,
            "team": this.listOfRequests[i].team,
            "start_date":this.listOfRequests[i].start_date,
            "end_date" :this.listOfRequests[i].end_date,
            // "reservedBy": this.listOfRequests[i].consumer,
            // "allocatedTo": this.listOfRequests[i].project,
            // "actions": this.listOfRequests[i].consumer

          })
        j = j + 1;
      }
      console.log("loop outside")
      console.log("table data",this.tableData)

      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  viewRequest(reqId) {
    this.webService.physicalServiceId= reqId;

    if(this.router.url == '/dashboard/lab1') {
      this.router.navigate(['/dashboard/Myservices/NewRequest/service']);
    } else if (this.router.url == '/dashboard/lab2') {
      this.router.navigate(['/dashboard/Myservices/NewRequest/service']);
    }else if(this.router.url == '/AdminDashboard/lab1') {
      this.router.navigate(['/AdminDashboard/services']);
    } else if (this.router.url == '/AdminDashboard/lab2') {
      this.router.navigate(['/AdminDashboard/services']);
    }else if(this.router.url == '/lmdashboard/lab1') {
      this.router.navigate(['/lmdashboard/services']);
    } else if (this.router.url == '/lmdashboard/lab2') {
      this.router.navigate(['/lmdashboard/services']);
    }
    // this.router.navigate(['/dashboard/Myservices/NewRequest/service']);
  }

  ngOnInit() {

    this.paginator._intl.itemsPerPageLabel = 'Show';

    // this.webService.Dashboard = false;
    // this.webService.myService = true;

    if(this.router.url == '/dashboard/lab1') {
      this.hydLocation = false;
    } else if (this.router.url == '/dashboard/lab2') {
      this.hydLocation = true;
    }else if(this.router.url == '/AdminDashboard/lab1') {
      this.hydLocation = false;
    } else if (this.router.url == '/AdminDashboard/lab2') {
      this.hydLocation = true;
    }else if(this.router.url == '/lmdashboard/lab1') {
      this.hydLocation = false;
    } else if (this.router.url == '/lmdashboard/lab2') {
      this.hydLocation = true;
    }
    this.reservationSystemData();
    console.log(this.router.url);
    this.webService.Dashboard  =false;
    this.webService.ReservationSystem  =false;
    this.webService.myService  =false;
    this.webService.devices  =false;
    this.webService.ReservationList  =false;
    this.webService.Dashboard  =false;
    this.webService.ReservationSystem  =false;
    this.webService.myService  =false;
this.webService.LMDashboard=false;
this.webService.orders=false;
this.webService.labs=true;
this.webService.reports=false;
    this.webService.Inventory  =false;
this.webService.catalogue=false;
this.webService.calendar=false;
this.webService.holidays=false;

  }


}
