import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {DataSource} from '@angular/cdk/table';
import { CdkTableModule } from '@angular/cdk/table';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { WebService } from '../services/web.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent  implements OnInit  {
 projectInfo:any=JSON.parse(this.webService.project_Info);
 catalogueData:any=[];
 tableInfo:any=[];
 duration:any;
 dataSource:any;
  constructor(private auth:AuthService,private webService :WebService) {
    
   }

   serviceData(){
    var data={"action":"read","status":"AVAILABLE"}
    this.webService.getServiceData(data).subscribe(res => {
   this.catalogueData=res;
   console.log(this.catalogueData);

   for(var i=0;i<this.catalogueData.catalogue.length;i++){
   
   if(this.projectInfo.imageType == this.catalogueData.catalogue[i].service_name && this.projectInfo.platform == this.catalogueData.catalogue[i].image_type){
    this.tableInfo.push(this.catalogueData.catalogue[i])
   
   }
  }
  console.log( this.tableInfo);

if(this.projectInfo.platform == 'vm'){
  this.displayedColumns = ['serviceName', 'serviceType', 'No_ofInstances','ram','cpu','hardDisk','pricePerDay','duration','totalprice'];
}
else{
  this.displayedColumns = ['serviceName', 'serviceType', 'No_ofInstances','pricePerDay','duration','totalprice'];
}
 if(this.tableInfo[0].service_type == "VDE"){
  this.tableData=[{
    "serviceName":this.tableInfo[0].service_name, "serviceType":this.tableInfo[0].service_type, "No_ofInstances":this.projectInfo.users.length,"ram":2,"cpu":1,"hardDisk":20,
    'pricePerDay':parseInt(this.tableInfo[0].price_per_hr)*24,'duration':this.projectInfo.duration,
    'totalprice':parseInt(this.tableInfo[0].price_per_hr)*24*parseInt(this.projectInfo.duration)
  }];
}
else{
  this.tableData=[{
    "serviceName":this.tableInfo[0].service_name, "serviceType":this.tableInfo[0].service_type, "No_ofInstances":1,"ram":2,"cpu":1,"hardDisk":20,
    'pricePerDay':parseInt(this.tableInfo[0].price_per_hr)*24,'duration':this.projectInfo.duration,
    'totalprice':parseInt(this.tableInfo[0].price_per_hr)*24*parseInt(this.projectInfo.duration)
  }];
}
  this.dataSource = new MatTableDataSource(this.tableData);
  console.log(this.tableData);
    });
   }

  ngOnInit() {
    this.serviceData();
   console.log(this.projectInfo)
  }
  public tableData:any
   
  displayedColumns: string[] 
  
}
