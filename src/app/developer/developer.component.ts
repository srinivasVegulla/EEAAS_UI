import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {
developerInfo:any={};
snapshot:any;
testvalue:any;
showVde:boolean;
vdename:any;
      
vde_status:any;
vde_id:any;
vde_zone:any;
Flavor:any;
ram :any;
cpu :any;
disk :any;
vde_addr:any;
  constructor(private loader: Ng4LoadingSpinnerService,private auth: AuthService, private webService: WebService, private router: Router) { }
  developerData(){
  var userdata=JSON.stringify({"login":JSON.parse(this.auth.data),"action":"read","status":"UNREAD"});
  this.webService.getVdes(userdata).subscribe(res => {
    var response:any=res;
    this.developerInfo=response.request[0];
    console.log(this.developerInfo)
  })
}
 hideVm(instance_type){

  if(instance_type == "container"){
     document.getElementById("sus").style.display="none";
     document.getElementById("rsm").style.display="none";
     document.getElementById("pwr").style.display="none";
     document.getElementById("pof").style.display="none";
     document.getElementById("rbt").style.display="none";
  }
 }
 ubuntusnapshot(){
  
  var data={"login": JSON.parse(this.auth.data),"name": this.snapshot,"action":"snapshot"}
  this.webService.devoperModal(data).subscribe(res => {
    alert("snapshot created successfully");
    $("#suspend").show();     
  });

 }

 suspendubun(){  



  var data={"login": JSON.parse(this.auth.data),"action":"suspend"}
  this.webService.devoperModal(data).subscribe(res => {
    this.testvalue="Suspended Successfully";  
    $("#suspend").show();
  });
};
resumeubun(){  
  var data={"login": JSON.parse(this.auth.data),"action":"resume"}
  this.webService.devoperModal(data).subscribe(res => {
    this.testvalue="Resumed Successfully";  
    $("#suspend").show();
  });
    
};
rebootubun(){  

  var data={"login": JSON.parse(this.auth.data),"action":"reboot"}
  this.webService.devoperModal(data).subscribe(res => {
    this.testvalue="Rebooted  Successfully";  
    $("#suspend").show();
  });
};
poweronubun(){ 
  
  var data={"login": JSON.parse(this.auth.data),"action":"start"}
  this.webService.devoperModal(data).subscribe(res => {
    this.testvalue="started successfully";  
    $("#suspend").show();
  });

};
poweroffubun(){  
  var data={"login": JSON.parse(this.auth.data),"action":"stop"}
  this.webService.devoperModal(data).subscribe(res => {
    this.testvalue="stopped successfully";  
    $("#suspend").show();
  });

};
details(){  
 
  if(this.developerInfo.instance_type == "vm"){
    var data={"login": JSON.parse(this.auth.data),"action":"info"}
    this.webService.devoperModal(data).subscribe(res => {
      var response:any=res;
     
   
  
      this.vdename=response.server.name;
      
      this.vde_status=response.server.status;
      this.vde_id=response.server.id;
      this.vde_zone=response["server"]["OS-EXT-AZ:availability_zone"]; 
      this.vde_addr=response.server.addresses.private[0].addr;
      this.Flavor = response.server.flavor.name;
      this.ram = response.server.flavor.ram+" MB";
      this.cpu = response.server.flavor.cpu;
      this.disk = response.server.flavor.disk + " GB";
    });
     } else {
 
      var data={"login": JSON.parse(this.auth.data),"action":"info"}
      this.webService.devoperModal(data).subscribe(res => {
        var response:any=res;
      
       
     
      this.vdename=response.metadata.name;
     
      this.vde_status=response.status.phase;
      this.vde_id=response.status.containerStatuses[0].containerId;
      this.vde_zone=response.spec.nodeName;
      this.vde_addr=response.status.hostIP;
      this.Flavor ="MEDIUM";
      this.ram =response.spec.containers[0].resources.limits.memory;
      this.cpu =response.spec.containers[0].resources.limits.cpu;
      this.disk ="30GB";
      $("#suspend").show();
  
    });
  } 
 
};
launch() {
  var data={"login": JSON.parse(this.auth.data),"action":"launch"}
      this.webService.launchInstance(data).subscribe(res => {
        this.consoleurl();
      });


};
ubuntuupdate(){  
  var data={"name":"ubuntu"}
  this.webService.update_vde(data).subscribe(res => {
    this.testvalue="ubuntu updated successfully";  
    $("#suspend").show();
  });
 
};

console:any;
consoleurl(){  
  $("#displayDiv").hide();
  this.showVde=true;
  this.loader.show();
  var data={"login":JSON.parse(this.auth.data),"action":"console","instance_type":this.developerInfo.instance_type};
  this.webService.devoperModal(data).subscribe(res => {
    var data:any=res;
    this.loader.hide();
   
    this.console= document.getElementById('myIframe');
   
    this.console.src=data.console; 
    
  
  });
 
};
windowsupdate(){ 
  var data={"name":"test"}
  this.webService.update_vde(data).subscribe(res => {
    this.testvalue="windows updated successfully";  
    $("#suspend").show();
  }); 

}; 


  ngOnInit() {
    this.developerData();
  }

}
