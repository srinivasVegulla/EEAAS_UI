import { Component, OnInit,Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import Moment from 'moment';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { deletePopup } from '../pmrequestlist/pmrequestlist.component';
//import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter'

import { DatePipe } from '@angular/common';


@Component({
  selector: 'addorEditHoliday',
  template: ` 
    
  <div class="panel panel-default" style="border-color:#232730;background-color:#232720;height:100%;margin-bottom:0px">
  <div class="panel-heading"><h4 class="text-left">Add/Edit Holiday</h4>
  
  
  <button type="button" mat-dialog-close class="text-right close" style="outline:none;color:#ffffff;opacity:1.2;margin-top:-30px">
  &times;
</button></div>
  <div class="panel-body" style="padding:10px;text-align:center">
  <div class="container-fluid">
  <form  #holidayForm="ngForm">
  <div class="row">
   
<!--    <mat-form-field>
    <input matInput type="text" required placeholder="Name" [(ngModel)]="holidayData.serviceName"  [ngModelOptions]="{standalone: true}">
  </mat-form-field>-->
  <mat-form-field style="width:100%">
  <input matInput [matDatepicker]="picker" [(ngModel)]="holiday_date"
    placeholder="Choose a date"  name="date" #Date="ngModel">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
 
    </div>

    <div class="row">
    <mat-form-field style="width:100%">
    <input matInput type="text" required placeholder="Holiday Reason" [(ngModel)]="holiday_reason" name="description"
    #description="ngModel">
  </mat-form-field>
     
    </div>

  

 


  <button type="submit" class="btn btn-success" [disabled]="!holidayForm.form.valid" (click)="saveHoliday()">Save</button>
  <button type="submit" class="btn btn-error"  (click)="cancel()" >Cancel</button>
</form>
  </div>
</div></div>
  `,
  styles: [`

`]

})
export class addorEditHoliday {
holidayData:any;
holiday_date:any;
holiday_reason:any;

  constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<addorEditHoliday>,public datePipe:DatePipe, @Inject(MAT_DIALOG_DATA) public data: any, public auth: AuthService, private webService: WebService) {
console.log(this.data)
this.holidayData=this.data;
if(this.holidayData.action=="edit"){
  console.log(this.holidayData.data)
  this.holiday_date=this.holidayData.data.holiday_date
  this.holiday_reason=this.holidayData.data.holiday_reason
}

  }
  saveHoliday(){
    console.log(this.holidayData)
    this.dialogRef.close({status:"true",holiday_date:this.datePipe.transform(this.holiday_date, "MM/dd/yyyy"),holiday_reason:this.holiday_reason})
  }
  cancel(){
    this.dialogRef.close({status:"false"})
  }
}
@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css'],
  providers: [DatePipe]
 
  
})
export class HolidaysComponent implements OnInit {
  displayedColumns: string[] = ['s_No', 'holiday_date', 'holiday_reason', 'actions'];
  currenDate: Date;
  tableData: any = [
    { s_No: ' ', holiday_date: new Date("01/15/2019"), holiday_reason: 'Sankranti', actions: '' },
    { s_No: ' ', holiday_date: new Date("05/01/2019"), holiday_reason: 'May Day', actions: '' },
    { s_No: ' ', holiday_date: new Date("06/05/2019"), holiday_reason: 'Ramzon', actions: '' },
    { s_No: ' ', holiday_date: new Date("08/15/2019"), holiday_reason: 'Independance Day', actions: '' },
    { s_No: ' ', holiday_date: new Date("09/02/2019"), holiday_reason: 'Ganesh Charthurdi', actions: '' },
    { s_No: ' ', holiday_date: new Date("10/02/2019"), holiday_reason: 'Gandhi Jyanthi', actions: '' },
    { s_No: ' ', holiday_date: new Date("10/08/2019"), holiday_reason: 'Dussehra', actions: '' },
    { s_No: ' ', holiday_date: new Date("12/25/2019"), holiday_reason: 'Christamas', actions: '' },
    

  ]
dataSource:any;

  constructor(private datePipe: DatePipe,public dialog: MatDialog,public auth:AuthService,public webService:WebService) {
    this.dataSource = new MatTableDataSource(this.tableData);
  
     var date = new Date()
     var myDate = this.datePipe.transform(date, "dd/MM/yyyy");
     console.log(myDate)
   
   }
   addRow() {
    // this.tableData.unshift(
    //   { s_No: ' ', holiday_date: new Date(), holiday_reason: ' ', actions: false })
    // this.dataSource = new MatTableDataSource(this.tableData);
    let dialogRef = this.dialog.open(addorEditHoliday, {
      height: '230px',
      width: '300px',
     data: { action:"add" }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result.status){
            this.tableData.unshift(
      { s_No: ' ', holiday_date: new Date(result.holiday_date), holiday_reason: result.holiday_reason, actions: false })
    this.dataSource = new MatTableDataSource(this.tableData);
       
      }
    })
  }
  Edit(i) {
    // this.tableData.unshift(
    //   { s_No: ' ', holiday_date: new Date(), holiday_reason: ' ', actions: false })
    // this.dataSource = new MatTableDataSource(this.tableData);
    let dialogRef = this.dialog.open(addorEditHoliday, {
      height: '230px',
      width: '300px',
     data: { action:"edit",data:this.tableData[i] }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result.status){
        this.tableData[i].holiday_date=new Date(result.holiday_date);
        this.tableData[i].holiday_reason=result.holiday_reason

 
this.dataSource = new MatTableDataSource(this.tableData);
   
  }
    })
  }
  delete(i) {
    let dialogRef = this.dialog.open(deletePopup, {
      height: '170px',
      width: '450px',
    
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        // this.webService.deleteServiceData(deleteData).subscribe(res => {
        // console.log(res)
        this.tableData.splice(i, 1);
        this.dataSource = new MatTableDataSource(this.tableData)
      
      }
      else{
        console.log("closed");
      }
    });
    }
   
    
   
  
  ngOnInit() {
    this.webService.Dashboard=false;
    this.webService.devices=false;
   this.webService.orders=false;
this.webService.labs=false;
this.webService.reports=false;
    this.webService.Inventory  =false;
this.webService.catalogue=false;
this.webService.calendar=false;
this.webService.holidays=true;
  }

}
