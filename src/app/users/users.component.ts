import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { successPopup } from '../admin-request-list/admin-request-list.component';

@Component({
  selector: 'myAddPopup',
  template: `

  <div class="panel panel-default" style="border-color:#232730;background-color:#232720;height:100%;margin-bottom:0px">
  <div class="panel-heading"><h4 class="text-left">Add User</h4>


  <button type="button" mat-dialog-close class="text-right close" style="outline:none;color:#ffffff;opacity:1.2;margin-top:-30px">
  &times;
</button></div>
<div class="panel-body">
        <form (ngSubmit)="onSubmit()" #addForm="ngForm">
          <div class="row">
            <div class="col-sm-3">
              <label for="name">User Id</label>
              <input type="text" class="form-control" id="name" required [(ngModel)]="userId" name="id" #id="ngModel">
              <!-- <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
              Name is required
            </div> -->
            </div>

            <div class="col-sm-3">
              <label for="description">User Name</label>
              <input type="text" class="form-control" id="description" required [(ngModel)]="userName" name="name"
                #name="ngModel">
              <!-- <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
              Description is required
            </div> -->
            </div>
            <div class="col-sm-3">
              <label for="description">Password</label>
              <input type="text" class="form-control" id="password" required [(ngModel)]="password1" name="password"
                #password="ngModel">
              <!-- <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
              Description is required
            </div> -->
            </div>
	    <div class="col-md-3">
              <mat-form-field>
                <mat-select placeholder="Role" #mySelect1 [(ngModel)]="webService.selectedRole" name="role">

                  <div class="right-inner-addon">

                    <i class="glyphicon glyphicon-search"></i>

                    <input matInput type="search" [(ngModel)]="searchRole" [ngModelOptions]="{standalone: true}"
                      class="searchInput" placeholder="Search" />
                  </div>

                  <mat-option *ngFor="let rl of webService.roles| search: searchRole: 'role'" [value]="rl">{{rl}}</mat-option>
                </mat-select>
                <!-- <mat-error *ngIf="toppings.hasError">You must select atleast two Accounts</mat-error> -->
              </mat-form-field>
            </div>
</div>
	
	</form>
</div>

  <div style="float:right;margin:10px;">
  <button mat-raised-button type="button" class="btn btn-success" [mat-dialog-close]="true" [disabled]="!addForm.form.valid" (click)="addUser(addForm)">Add</button>
   <button mat-raised-button type="button" class="cancel" [mat-dialog-close]="false" (click)="cancel()" style="background-color:white;color:red; margin:5px;border-radius:6px;border:1px solid #efecec">Cancel</button>

   </div>

 
    `,
  styles: [`
  mat-row:nth-child(even){
    background-color:white;
    }
    .col-md-2{
      width:20%
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

    }miss
    mat-header-cell{

     font-weight:bold;
     font-size:12px;

    }
    mat-row{
      border-bottom-width: 0px;
      border-bottom-style: none;
      min-height: 40px;
    }
    .mat-raised-button[disabled]{
      cursor:not-allowed;
      color:white;
    }


    `]
})


export class myAddPopup {

  public role: any = [];
  userName: any = "";
  userId: any = "";
  searchRole: any = "";
  password1: any = "";
  tableData: any = [];
  displayedColumns: string[];
  dataSource;
  constructor(public auth: AuthService, private dialogRef: MatDialogRef<successPopup>, private webService: WebService, public mydialogRef: MatDialogRef<myAddPopup>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private router: Router) {
    // this.orderData=data;
    // console.log(this.orderData);
  }

  addUser(formData) {
    console.log(formData)
    let userData = formData.form.value;
    var data = {
      "action": "create",
      "role": userData.role,
      "user_id": userData.id,
      "user_name": userData.name,
      "password": userData.password
    }
    // var userObj=new UsersComponent(this.dialog,this.auth,this.webService);

    this.webService.setUsersInfo(data).subscribe(res => {
      console.log("data", res);
      this.dialog.closeAll()
      // this.router.navigate([`/AdminDashboard/lab1`])
      //this.router.navigate([`/DesignerDashboard`])
      let dialogRef = this.dialog.open(successPopup, {
        height: '100px',
        width: '400px'
      })
      setTimeout(() => {

        dialogRef.close()

      }, 3000)

    })


    // userObj.usersData();

  }

  cancel() {
    this.dialog.closeAll()
    //  console.log("rejected")
    //  this.mydialogRef.close()

    // let dialogRef = this.dialog.open(submitPopup, {
    //   height: '250px',
    //   width: '400px',
    //  // data:this.auth.orderData
    //   })

    // setTimeout(() => {

    //   dialogRef.close()
    // },1000)
  }
  ngOnInit() {

    //   this.requestServiceData();
    // $("#suc").hide();
    // $("#fai").hide();

  }
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {


  listOfUsers: any;
  constructor(public dialog: MatDialog, private auth: AuthService, private webService: WebService) { }
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

  openDialog() {
    let dialogRef = this.dialog.open(myAddPopup, {
      width: '800px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //  console.log(result);
      // // this.dialogResult = result;
      // if(result){
      this.usersData();
      // }
    });
  }
  dsData;
  deleteUser(rowData) {

    var deleteData = { "user_id": [rowData.userId], "action": "delete" }
    console.log(rowData)
    this.webService.setUsersInfo(deleteData).subscribe(res => {
      console.log(res)
      //////////////////////////
      this.dsData = this.dataSource.data;
      const itemIndex = this.dsData.findIndex(obj => obj === rowData);
      this.dataSource.data.splice(itemIndex, 1);
      this.dataSource.paginator = this.paginator;
      //////////////////////////////
      this.usersData();
    });

  }
  // getFilteredData(){
  //   console.log(this.webService.todayDateReservation)
  //   console.log(this.webService.lastDateReservation)

  //   let stDate = new Date(this.webService.todayDateReservation);
  //   let enDate = new Date(this.webService.lastDateReservation);
  //   var data = {
  //     "start_date": stDate,
  //     "end_date": enDate
  //     }
  //   this.webService.getFilteredReservationData(data).subscribe(res => {
  //     console.log(res)
  //   })
  // }


  usersData() {

    var data = {
      "action": "custom"
    }
    //JSON.parse(this.auth.data);
    //  data.action = "read";

    this.webService.getUsersInfo(data).subscribe(res => {
      this.tableData = [];
      var response: any = res;
      this.listOfUsers = response.data;
      console.log("hi this.listOfUsers", this.listOfUsers);
      //  this.listOfUsers.sort((a, b) => a.serial_no.localeCompare(b.serial_no));
      this.displayedColumns = ["userId", "userName", "role", "actions"];
      // this.displayedColumns = ["name", "status", "model"];
      var len = this.listOfUsers.length;
      var j = 0;
      // for (var i = len - 1; i >= 0; i--) {
      for (var i = 0; i < len; i++) {
        // console.log(JSON.parse(this.listOfUsers[i].configurations.replace(/'/g, '"'))); 

        // var inventoryData=JSON.parse(this.listOfUsers[i].configurations.replace(/'/g, '"')); 


        this.tableData.push(
          {
            "userId": this.listOfUsers[i][0],
            "userName": this.listOfUsers[i][2],
            "role": this.listOfUsers[i][3]

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

  ngOnInit() {

    this.usersData();
    this.webService.currentTab = 'Inventory';
  }


}
