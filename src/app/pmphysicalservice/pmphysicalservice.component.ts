import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { AuthService } from '../services/auth.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-pmphysicalservice',
  templateUrl: './pmphysicalservice.component.html',
  styleUrls: ['./pmphysicalservice.component.css']
})
export class PmphysicalserviceComponent implements OnInit {

  serverDetails:any=[];
  serverDetails1:any;
  // serverDetailsCol;
  // serverDetailsCol1 = ['FIPS_Card','Facility','Facility_Location','Lab_location','License','Make','Memory','Model'];
  // serverDetailsCol2 = ['Network_Mask','Password','Prototype','Reserved','Reserved_By','SSL_Card','Username','console_urls'];
  // serverDetailsCol3 = ['description','driver','name','out_of_service','service_id','tags','template'];
  assets;
  assetsCol = [];
  iP_address_blade;
  iP_address_chassis_2_blade;
  dataSource;
  dataSource1;
  chassis;
  chassis2;
  

  serviceid: any;

  constructor(public webService: WebService,public auth:AuthService) { }

  ngOnInit() {
    var data = { "action": "display", "service_id": this.webService.physicalServiceId }
    this.webService.getServerDetails(data).subscribe(res => {
      var response:any = res;
      console.log(response.server_details)
      this.assets = response.server_details[0]
      this.iP_address_blade = response.server_details[1]
      this.iP_address_chassis_2_blade = response.server_details[2]
      this.chassis = response.server_details[3]
      this.chassis2 = response.server_details[4]
      this.serverDetails = response.server_details[5]
      // this.dataSource1 = new MatTableDataSource(this.serverDetails1);
      // this.dataSource = new MatTableDataSource(this.serverDetails);
    })
  }

}
