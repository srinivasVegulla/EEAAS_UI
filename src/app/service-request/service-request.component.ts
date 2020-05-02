import { Component, OnInit,ViewChild,ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';
import {MatSelect} from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit {
  public serviceTypes:any=[];
  public format:any=[];
  serviceName:any="";
  serviceDescription:any="";
  searchServiceType:any="";
  versions:any="";
  searchFormat:any="";
  pricePerHour:any="";
  ram:any="";
  hardDisk:any="";
  cpu:any="";
  createService(formData){
    console.log(formData.form.value)
    let serviceData=formData.form.value;
    var data={
              "action":"create",
              "description":serviceData.description,
              "image_type":serviceData.servT,
              "price_per_hr":serviceData.pricePerHour,
              "provider_id": "Designer",
              "service_name":serviceData.name,
              "service_type":serviceData.servT,
              "status":"Available",
              "versions":serviceData.versions
            };


            this.webService.setServiceData(data).subscribe(res => {
              console.log("data",res);
             // this.router.navigate([`/AdminDashboard/lab1`])
              this.router.navigate([`/DesignerDashboard`])
            })

  }
  constructor(public mySelect:MatSelect,public dialog: MatDialog,public cdr: ChangeDetectorRef,private auth:AuthService,private webService :WebService,private router:Router) { }

  ngOnInit() {
  }

}
