


import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
   userdata = JSON.parse(this.auth.data);

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
  projectsData() {
    console.log(this.userdata)
    var data = {"login": this.userdata,"action":"custom"};
    //JSON.parse(this.auth.data);
  //  data.action = "read";

    this.webService.getProjectInfo(data).subscribe(res => {
      var response: any = res;
      this.listOfRequests = response.data;
      console.log(this.listOfRequests);
    //  this.listOfRequests.sort((a, b) => a.serial_no.localeCompare(b.serial_no));
      //this.displayedColumns=["sNo","request_id","project_name","pm_name","admin_name","location_id","start_date","end_date","status","price"];
      this.displayedColumns = ["projectId", "projectName", "businessUnit", "teamSize", "startDate", "endDate", "startedDate", "closedDate", "totalBudget", "availableBudget"];
      var len = this.listOfRequests.length;
      var j = 0;
      for (var i = len - 1; i >= 0; i--) {
        this.tableData.push(
          {
            "projectId":  this.listOfRequests[i][0],
            "projectName": this.listOfRequests[i][2],
            "businessUnit": this.listOfRequests[i][3],
            "teamSize": this.listOfRequests[i][4],
            "startDate": this.listOfRequests[i][5] ,
            "endDate" :this.listOfRequests[i][6],
            "startedDate": this.listOfRequests[i][7],
            "closedDate": this.listOfRequests[i][8],
            "totalBudget": this.listOfRequests[i][9],
            "availableBudget": this.listOfRequests[i][10]
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

    this.projectsData();
    this.paginator._intl.itemsPerPageLabel = 'Show';

    this.webService.Dashboard = false;
    this.webService.myService = true;
  }



}

