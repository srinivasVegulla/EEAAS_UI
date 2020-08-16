import { Component, OnInit, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { WebService } from '../services/web.service';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { successPopup } from '../admin-request-list/admin-request-list.component';
@Component({
  selector: 'app-pmordersummary',
  templateUrl: './pmordersummary.component.html',
  styleUrls: ['./pmordersummary.component.scss']
})
export class PmordersummaryComponent implements OnInit {

  platform: string;
  projectInfo: any = JSON.parse(this.webService.project_Info);
  userData: any = JSON.parse(this.auth.data);
  catalogueData: any = [];
  tableInfo: any = [];
  bareMetalTableInfo: any = [];
  duration: any;
  dataSource: any;
  bareMetalDataSource: any;
  services: any = [];
  selectedBareMetal = localStorage.getItem(this.webService.bareMetalData);
  selectedBareMetalJSON = JSON.parse(this.selectedBareMetal);
  constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<successPopup>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private auth: AuthService, private webService: WebService, private DatePipe: DatePipe) {
    console.log("baremetal");
    console.log(this.selectedBareMetalJSON)
  }

  serviceData() {
    var data = { "action": "read", "status": "AVAILABLE" }
    this.tableData = [];
    this.tableInfo = [];
    this.webService.getServiceData(data).subscribe(res => {
      this.catalogueData = res;

      console.log(this.catalogueData)
      console.log(this.projectInfo)
      //var setDob = this.DatePipe.transform(this.projectInfo.endDate, 'MM/dd/yyyy');

      // for(var i=0;i<this.catalogueData.catalogue.length;i++){
      this.catalogueData.catalogue.forEach(catalogueData => {
        for (var j = 0; j < this.projectInfo.imageType.length; j++) {


          if (this.projectInfo.imageType[j].toLowerCase() == catalogueData.service_name.toLowerCase() && this.projectInfo.platform == catalogueData.image_type) {
            this.tableInfo.push(catalogueData)


          }
        }
      })
      console.log(this.tableInfo);
      console.log("projectInfo.platform" + this.projectInfo.platform);
      // if (this.projectInfo.platform != 'physical') {
      for (var k = 0; k < this.tableInfo.length; k++) {
        console.log(this.tableInfo[k])
        if (this.projectInfo.platform == 'vm') {
          this.displayedColumns = ['serviceName', 'serviceType', 'No_ofInstances', 'ram', 'cpu', 'hardDisk', 'pricePerDay', 'duration', 'totalprice'];
          this.webService.services.push(JSON.stringify({
            "service_type": this.tableInfo[k].service_type, "service_id": this.tableInfo[k].service_id,
            "ram": "2", "cpu": "1", "hdd": "20"
          }))
        }
        else {
          this.displayedColumns = ['serviceName', 'serviceType', 'No_ofInstances', 'pricePerDay', 'duration', 'totalprice'];
          //this.services={"service_type":this.tableInfo[k].service_type,"service_id":this.tableInfo[k].service_id}
          this.webService.services.push(JSON.stringify({
            "service_type": this.tableInfo[k].service_type, "service_id": this.tableInfo[k].service_id,
            "ram": "2", "cpu": "1", "hdd": "20"
          }));
        }
        if (this.tableInfo[k].service_type == "VDE") {
          this.tableData.push({
            "serviceName": this.tableInfo[k].service_name, "serviceType": this.tableInfo[k].service_type, "No_ofInstances": 1, "ram": 2, "cpu": 1, "hardDisk": 20,
            'pricePerDay': (this.tableInfo[k].price_per_hr * 8).toFixed(2), 'duration': this.projectInfo.duration,
            'totalprice': (this.tableInfo[k].price_per_hr * 8 * parseInt(this.projectInfo.duration)).toFixed(2)
          });
        }
        else {
          this.tableData.push({
            "serviceName": this.tableInfo[k].service_name, "serviceType": this.tableInfo[k].service_type, "No_ofInstances": 1, "ram": 2, "cpu": 1, "hardDisk": 20,
            'pricePerDay': (this.tableInfo[k].price_per_hr * 24).toFixed(2), 'duration': this.projectInfo.duration,
            'totalprice': (this.tableInfo[k].price_per_hr * 24 * parseInt(this.projectInfo.duration)).toFixed()
          });
        }
      }
      // }
      // else {
      //   this.displayedColumns = ['serviceName', 'serviceType', 'No_ofInstances', 'pricePerDay', 'duration', 'totalprice'];
      //   this.webService.services.push(JSON.stringify({
      //     "service_type": "this.tableInfo[k].service_type", "service_id": "this.tableInfo[k].service_id",
      //     "ram": "2", "cpu": "1", "hdd": "20"
      //   }));
      // this.tableData.push({
      //   "serviceName": "this.selectedBareMetalJSON[0].name", "serviceType": "Bare Metal", "No_ofInstances": 1, "ram": 2, "cpu": 1, "hardDisk": 20,
      //   'pricePerDay': 24, 'duration': 24,
      //   'totalprice': 24.00
      // });
      // }
      for (let m = 0; m < this.selectedBareMetalJSON.length; m++) {
        this.platform = "physical";
        console.log(this.selectedBareMetalJSON[m])

        this.displayedColumns = ['serviceName', 'serviceType', 'No_ofInstances', 'pricePerDay', 'duration', 'totalprice'];

        // this.bareMetalDisplayedColumns = ['serviceName', 'serviceType', 'No_ofInstances','ram','cpu','hardDisk','pricePerDay','duration','totalprice'];

        this.tableData.push({
          "serviceName": this.selectedBareMetalJSON[m].name,
          "serviceType": "Bare Metal", "No_ofInstances": 1,
          "ram": 2, "cpu": 1, "hardDisk": 20,
          'pricePerDay': (parseInt(this.selectedBareMetalJSON[m].pricePerHr) * 8).toFixed(2), 'duration': 24,
          'totalprice': (24 * 8 * parseInt(this.selectedBareMetalJSON[m].pricePerHr)).toFixed()
        });
        // this.tableData = [];
        this.webService.services.push(JSON.stringify({
          "service_type": "bare_metal", "service_id": this.selectedBareMetalJSON[m].serviceid, "ram": "2", "cpu": "1", "hdd": "20"
        }))
      }

      this.dataSource = new MatTableDataSource(this.tableData);
      console.log(this.tableData);
      console.log(this.dataSource);
    });
  }
  // bareMetalData(){
  //   console.log(this.selectedBareMetalJSON);

  //   //console.log(this.selectedBareMetal.length);

  //   for(let m=0;m<this.selectedBareMetalJSON.length;m++){
  //     console.log(this.selectedBareMetalJSON[m])
  //     this.bareMetalDisplayedColumns = ['serviceName', 'serviceType', 'No_ofInstances','ram','cpu','hardDisk','pricePerDay','duration','totalprice'];

  //     this.bareMetalTableInfo.push({
  //       "serviceName":this.selectedBareMetalJSON[m].name, "serviceType":"Bare Metal", "No_ofInstances":1,"ram":2,"cpu":1,"hardDisk":20,
  //       'pricePerDay':(200*24).toFixed(2),'duration':24,
  //       'totalprice':(25*24*parseInt(this.projectInfo.duration)).toFixed()
  //     });
  //   }
  //   this.bareMetalDataSource = new MatTableDataSource(this.bareMetalTableInfo);
  //   console.log(this.bareMetalTableInfo)

  // }
  cancelRequest() {
    //  this.webService.imageArray.length=0;
    if (this.platform == "physical") {
      this.router.navigate(['/dashboard/reservationSystem']);
    } else {
      this.router.navigate(['/dashboard/Myservices/NewRequest']);
    }
  }
  submit() {
    var projectData = JSON.parse(this.webService.project_Info);
    console.log(projectData)
    console.log(this.webService.imageArray)
    console.log(this.webService.services)
    var data = {
      "order_details": {
        "project_name": JSON.parse(this.auth.projectName),
        "location": projectData.delivaryLocation,
        "project_admin": this.webService.lineManger,
        "pm_name": this.auth.name,
        "instance_type": projectData.platform,
        "estimated_no_of_users": projectData.users.length,
        "duration": projectData.duration.toString(),
        "start_date": this.DatePipe.transform(projectData.startDate, 'MM/dd/yyyy HH:mm:ss'),
        "end_date": this.DatePipe.transform(projectData.endDate, 'MM/dd/yyyy HH:mm:ss'),
        "order_items": "1",
        "status": "REQUESTED",
        "userlist": projectData.users
      },
      "service_details": this.webService.services,
      "action": "create",
      "login": JSON.parse(this.auth.data)
    }
    console.log(data)
    this.webService.saveRequestData(data).subscribe(resp => {
      console.log(resp, 'res')
      var res: any = resp;
      var response = res;

      console.log(response)
      if (response.job == true) {
        this.webService.message = "Submitted Successfully"

        let dialogRef = this.dialog.open(successPopup, {
          height: '100px',
          width: '400px'
        })
        setTimeout(() => {
          //  window.location.reload();
          this.router.navigate(['/dashboard/Myservices/RequestList']);
          dialogRef.close()
        }, 3000)
        console.log(response);
      }
      else {
        this.webService.message = "Server is not available"
        let dialogRef = this.dialog.open(successPopup, {
          height: '100px',
          width: '400px'
        })

        setTimeout(() => {
          //  window.location.reload();
          this.router.navigate(['/dashboard']);
          dialogRef.close()
        }, 3000)
        console.log(response);
        //  this.router.navigate(['/dashboard/Myservices/RequestList']);
      }
    })
  }
  cancel() {

    this.webService.selectedProject = null;
    //    this.webService.selectedUserList = null;
    this.webService.lineManger = null;
    this.webService.admin = null;

    this.webService.todayDate = null;
    this.webService.lastDate = null;
    this.webService.todayDateReservation = null;
    this.webService.lastDateReservation = null;

    this.router.navigate(['/dashboard']);


  }
  ngOnInit() {
    this.serviceData();
    this.tableData = [];
    //  this.bareMetalData();
    this.webService.services.length = 0

  }
  public tableData: any = []

  displayedColumns: string[];
  // displayedColumns: string[] = ['serviceName', 'serviceType', 'No_ofInstances', 'pricePerDay', 'duration', 'totalprice'];
  bareMetalDisplayedColumns: string[]

}
