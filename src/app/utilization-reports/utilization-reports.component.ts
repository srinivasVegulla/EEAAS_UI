import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTab } from '@angular/material';
import { WebService } from '../services/web.service';
@Component({
  selector: 'app-utilization-reports',
  templateUrl: './utilization-reports.component.html',
  styleUrls: ['./utilization-reports.component.css']
})
export class UtilizationReportsComponent implements OnInit {
  enddateVal;
  startdateVal;
  utilizationData: any = [];
  public tableData: any = [];
  dataSource: any;
  displayedColumns: string[]=["serverName","totalDays","days","utiPercent"];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  showTable=false;


  showData() {
    this.showTable=true;
    this.utilizationData=[];
    this.startdateVal = (new Date(this.webService.todayDateUtiReservation).getMonth() + 1) + "/" + new Date(this.webService.todayDateUtiReservation).getDate() + "/" + new Date(this.webService.todayDateUtiReservation).getFullYear() + " " + new Date(this.webService.todayDateUtiReservation).getHours() + ":" + new Date(this.webService.todayDateUtiReservation).getMinutes() + ":" + new Date(this.webService.todayDateUtiReservation).getSeconds();
    this.enddateVal = (new Date(this.webService.lastDateUtiReservation).getMonth() + 1) + "/" + new Date(this.webService.lastDateUtiReservation).getDate() + "/" + new Date(this.webService.lastDateUtiReservation).getFullYear() + " " + new Date(this.webService.todayDateUtiReservation).getHours() + ":" + new Date(this.webService.todayDateUtiReservation).getMinutes() + ":" + new Date(this.webService.lastDateUtiReservation).getSeconds();
    //var diff=this.enddateVal - this.startdateVal;
    var timeDiff = Math.abs(this.webService.lastDateUtiReservation.getTime() - this.webService.todayDateUtiReservation.getTime());
    var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24))+1;
    var data = {
      "start_date": this.startdateVal,
      "end_date": this.enddateVal,

    }
    console.log(dayDifference)
    //  var data={
    //     "end_date":	"4/30/2019 00:00:00",
    //     "start_date":	"4/1/2019 00:00:00"
    //   }
    this.webService.getUtilizationReports(data).subscribe(res => {
     
      this.utilizationData.push(res);
      console.log(this.utilizationData[0])
      for(var i=0;i<this.utilizationData[0].length;i++){
        this.tableData[i]={//"serverId":this.utilizationData[i].server_id,
        "serverName":this.utilizationData[0][i].server_name,
	"totalDays":dayDifference,
        "days":this.utilizationData[0][i].days,
        "utiPercent":Math.ceil((this.utilizationData[0][i].days/dayDifference)*100)
      }
     // this.totalBill=this.totalBill+this.tableData[i].total_amount;
     //   console.log(this.totalBill)
        }
     
    
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  constructor(private webService: WebService) { }

  ngOnInit() {
    // this.showData();
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
