import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import {MatDialogModule,MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-assurance',
  templateUrl: './assurance.component.html',
  styleUrls: ['./assurance.component.css']
})
export class AssuranceComponent implements OnInit {
  displayedColumns: string[];
  tableData:any=[];
  dataSource:any;
  constructor(public auth:AuthService,private webService :WebService, @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private router:Router){ }
  assurancedata(){
    this.displayedColumns=["sNo","request_id","project_name","start_date","end_date","status","price"];
    this.tableData.push(
      {"sNo":1,
    "request_id" :"req_1",
   "project_name" :"core",
    
    // "location_id" :this.listOfRequests[i].location_id,
     "start_date" :new Date(),
     "end_date" :new Date(),
   "status":"APPROVED",
     "price":'$20'
   })
   this.dataSource = new MatTableDataSource(this.tableData);
  }
  ngOnInit() {
    this.webService.Dashboard=false;
    this.webService.orders=false;
    this.webService.assurance=true;
    this.assurancedata();
  }

}
