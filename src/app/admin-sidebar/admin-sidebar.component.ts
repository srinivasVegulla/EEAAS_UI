import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { WebService } from '../services/web.service'

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  constructor( private webService: WebService) { }
//   menuOpen(){
   
       
//     $('#sidebar').toggleClass('active');
//     $('#sidebarCollapse').hide();

// };
// menuClose(){


//     $('#sidebar').toggleClass('active');
//     $('#sidebarCollapse').show();
 
 
// };
ngOnInit(){
//   $(' li.active').removeClass('active');
//   //   $("div.tab-content").removeClass("active");  
//      $("#DeveloperWs").addClass("active").siblings().removeClass("active");
//      $('#Developer').addClass('active');
// //$('#sidebarCollapse').hide();
   this.webService.Dashboard  =false;
    this.webService.ReservationSystem  =false;
    this.webService.myService  =false;
    this.webService.devices  =true;
    this.webService.ReservationList  =false;
    this.webService.Dashboard  =false;
    this.webService.ReservationSystem  =false;
    this.webService.myService  =false;
this.webService.LMDashboard=false;
this.webService.orders=false;
this.webService.labs=false;
this.webService.reports=false;
    this.webService.Inventory  =false;
    this.webService.catalogue = true;
    this.webService.myService = false;
}
}
