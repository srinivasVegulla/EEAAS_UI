import { Component, OnInit,Inject,Input,ChangeDetectorRef,ViewChild} from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute,NavigationExtras,ParamMap } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import {MatDialogModule,MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {myPopup,submitPopup,successPopup}from '../admin-request-list/admin-request-list.component';
import { AdminRequestListComponent } from '../admin-request-list/admin-request-list.component';
import { NewRequestComponent } from '../pm-new-request/new-request.component';
import { PmordersummaryComponent } from '../pmordersummary/pmordersummary.component';
import {DatePipe } from '@angular/common';
import {MatSelect} from '@angular/material';

import { TestComponent,testSuccessPopup } from '../test/test.component';
declare var BotChat: any;
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  constructor(public select:MatSelect,public mydialogRef: MatDialogRef <myPopup>,public successdialogRef: MatDialogRef <successPopup>, private DatePipe:DatePipe,@Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog,private cdr: ChangeDetectorRef,public auth:AuthService,private webService :WebService,public dialogRef: MatDialogRef<submitPopup>,
  private router:Router,public dialogRefS: MatDialogRef<testSuccessPopup>  ) { }
  selectedImages:any=[];
  @ViewChild('my', {static: false}) my: MatSelect;
//   downhosts:string;
//   adminData: any;
//   adminDBDataForChatBot=()=> {
//   var data = { "login": JSON.parse(this.auth.data) };
//   this.webService.getAdminDbData(data).subscribe(res => {
//     this.adminData = res
//     this.downhosts=this.adminData.openstack.opn_down_hosts;})
//   }
//   this.adminDBDataForChatBot();
 // this.downhosts
  //= this.webService.down_hosts
  
  launchChatbot = ()=>{
  
      
    var params = BotChat.queryParams(location.search);

    var user = {
        id: this.auth.name,
        name: this.auth.name
        };
    
    var bot = {
        id: params['botid'] || 'botid',
        name: params["botname"] || 'botname'
    };

    window['botchatDebug'] = params['debug'] && params['debug'] === "true";

    var botConnection = new BotChat.DirectLine({
        // secret: '4MRN9VFFpAk.cwA.PEg.v9B4QDgFP6RgKZ8Bl0SysIBnKBb-sGxRSNf9RSEQSYY',            
        secret: 'NRmnsmwEKfs.cwA.yrU.4AdcTDTmH_qk0T-0SD6i_TLFBbUW3IE35R9o5_2g1PQ',
        token: params['t'],
        domain: params['domain'],
        webSocket: false // defaults to true
    });


  
    const speechOptions = {
        speechRecognizer: new BotChat.Speech.BrowserSpeechRecognizer(),
        speechSynthesizer: new BotChat.Speech.BrowserSpeechSynthesizer()
      };
      
    BotChat.App({
        botConnection: botConnection,
        user: user,
        bot: bot,
        speechOptions: speechOptions
    }, document.getElementById("BotChatGoesHere"));
    
    var helloCount = 0;

  
        
        const callMe=(data)=>{
            console.log(data);
                // switch(data.report_type) {
                //     case 'automatedPatterns': 

                //             this.router.navigate([ `/dashboard/${data.report_type}`], { queryParams: 
                //                 {'accountName':this.auth.userData.accountName,'collectionName':this.auth.userData.collectionName,'modelName':'MFFirstPage','nlpFactor':'_Description','user':this.auth.name }
                //             });
                //             break;
                //     case 'benchmarking':
                //             this.router.navigate([ `/dashboard/benchmarking`], { queryParams: 
                //                 { modelName:'overview' ,imageName:this.auth.userData.collectionName, accountName: this.auth.userData.accountName, user:this.auth.name }
                //             });
                //             break;
                //     case 'standardReports':
                //             this.router.navigate([ `/dashboard/standardReports`], { queryParams: 
                //                 { modelName:'overview' ,'imageName':this.auth.userData.collectionName, 'accountName': this.auth.userData.accountName, 'user':this.auth.name, 'divId': 'CapabilityCluster'}
                //             });
                //             break; 
                //     case 'repository':
                //             this.router.navigate([ `/dashboard/repository`]);    
                //             break;
                //     case 'customDrilldown':
                //             this.router.navigate([ `/dashboard/customDrilldown`], { queryParams: 
                //                 { 'modelName':'drilldownold','collectionName':this.auth.userData.collectionName,'accountName':this.auth.userData.accountName,'user':this.auth.name,'wordcloud':'no' }
                //             });
                //             break;               
                //     default:
                //             this.router.navigate([ `/dashboard/${data.report_type}`], { queryParams: 
                //                 { collectionName:this.auth.userData.collectionName, accountName: this.auth.userData.accountName, user:this.auth.name }
                //             });                            
                // }
                    
            }

         const sendHello = (botEvent) => {
           
             console.log(botEvent)
        if(botEvent.botInitiated && botEvent.helloCount == 0){
            botConnection
                .postActivity({type: "event", value: {username: localStorage['name'], 'helloCount': helloCount}, from: {id: localStorage['name'], name: localStorage['name'] }, name: "userLogin"})
                .subscribe(id => console.log("success"));
            console.log("userLogin event send to the bot on receiving botStarted");
            console.log("helloCount in bot:", botEvent.helloCount);
            helloCount++;
        }
        $('.cssload-loader').remove();
        $('#buttonClick').show();
        console.log("helloCount:", helloCount, 'helloCount from bot event ', botEvent.helloCount);
    }


    $(document).ready(function() {
      $( ".messages" ).after( "<div id='BotChatGoesHere'></div>" );
        helloCount = 0;
          //$('#buttonClick').hide();
     
        
        botConnection
        .postActivity({type: "event", value: {username: localStorage['username'], 'helloCount': helloCount}, from: {id: "me" }, name: "userLogin"})
            .subscribe(id => {

           	readyFunct(id);
console.log("userLogin event sent to the bot on document ready");
        helloCount++;
        })

	const readyFunct = (x) => {
        console.log("success", localStorage['role']);
       
	//changes
console.log("Capacity Event sending");
        if(localStorage['role'] == 'PM'){
            botConnection
            .postActivity({type: "event", value: {"greetServices":"Hello Jack, welcome back to CREDO. We have recently added Redmine, VDE-Java and Gerrit . Would you like to see the services? "}, from: {id: "me" }, name: "greetServicesEvent"})
            .subscribe(response => console.log("greetServices"));
            window.speechSynthesis.speak(new SpeechSynthesisUtterance('Hello Jack, welcome back to CREDO. We have recently added Redmine, VDE-Java and Gerrit. Would you like to see the services? '));

            // botConnection
            // .postActivity({type: "event", value: {"budget":" By the way, the project budget has reached 95% of the allocated budget."}, from: {id: "me" }, name: "budgetEvent"})
            // .subscribe(response => console.log("budget"));
        }  
        if(localStorage['role'] == 'Admin'){
        
         botConnection
         .postActivity({type: "event", value: {"alarm":"Hello Parker, Welcome back to CREDO.\n Node five is down. Would you like to see the latest alarms on this node?"}, from: {id: "me" }, name: "alarmEvent"})
         .subscribe(response => console.log("alarm"));
        
         window.speechSynthesis.speak(new SpeechSynthesisUtterance('Hello Parker, Welcome back to CREDO. Node five is down. Would you like to see the latest alarms on this node?'));
        
        }       

            //changes
            // botConnection
            // .postActivity({type: "event", value: {"alarm":"Node five is down. Would you like to see the latest alarms on this node?"}, from: {id: "me" }, name: "alarmEvent"})
            // .subscribe(response => console.log("alarm"));
            // botConnection
            // .postActivity({type: "event", value: {"pendingRequest":"There is a new pending request from project NextGen 5G. Can I bring up the details for you?"}, from: {id: "me" }, name: "pendingRequestEvent"})
            // .subscribe(response => console.log("pendingRequest"));
            // botConnection
            // .postActivity({type: "event", value: {"provisionYes":"Yes"}, from: {id: "me" }, name: "provisionYesEvent"})
            // .subscribe(response => console.log("provisionYes"));
            // botConnection
            // .postActivity({type: "event", value: {"provisionNo":"No"}, from: {id: "me" }, name: "provisionNoEvent"})
            // .subscribe(response => console.log("provisionNo"));
            // botConnection
            // .postActivity({type: "event", value: {"capacity":"The storage capacity in the cluster has reached 80%.It is suggested that you plan for a backup activity as we see heavy utilization of the cluster."}, from: {id: "me" }, name: "capacityEvent"})
            // .subscribe(response => console.log("capacity"));
            // //changes end
            



	 




	/*botConnection.postActivity({
	   from: { id: 'me' },
	   name: 'buttonClicked',
	    type: 'event',
	    value: 'someValue'
	})*/










	}
//        console.log("userLogin event sent to the bot on document ready");
  //      helloCount++;            
    });

     
//changes
/*
            botConnection
                .postActivity({type: "event", value: {"capacity":"75%"}, name: "capacityEvent"})
                .subscribe(response => {
           	 newFunc(response);
		helloCount++;
       		});
            
        

const newFunc = (x) => {

console.log(x)

}*/
//changes ends


    // botConnection.activity$.filter(activity => activity.type === "event" && activity.name === "botStarted")
    //     botConnection.activity$.subscribe(activity => {
    //         console.log(activity)
    //         sendHello(activity.value)
    //     });
        botConnection.activity$
        .filter(activity => activity.type === "event")
        .subscribe(activity => {
           
            setValuesinForm(activity)
        }
    
    
    );
        const setValuesinForm = (x) => {   
            console.log('event ', x);
           // var tableData=JSON.parse(localStorage.getItem(this.auth.a_Data))
            //console.log(tableData[0],"m not der")  
            //var proj_Name=tableData[0].project_name;
            
            if(x.value.openOrdersPage){
               
            this.router.navigate([ `/AdminDashboard/orders`])
            var adminReqList = new AdminRequestListComponent(this.mydialogRef,this.data,this.dialog,this.auth,this.webService,undefined)
            adminReqList.requestListData();
            botConnection
            .postActivity({type: "event", value: {"provisionYes":"Great!"}, from: {id: "me" }, name: "provisionYesEvent"})
            .subscribe(response => console.log("provisionYes"));

         console.log("myconsole")
         setTimeout(() => {
            adminReqList.viewRequest('01')
           },2000)
            
            }
            if(x.value.MapOrderId){
              
              var adminReqList = new AdminRequestListComponent(this.mydialogRef,this.data,this.dialog,this.auth,this.webService,undefined)
          
      
         
            adminReqList.viewRequest(x.value.OrderId)
         
    
    }  
    if(x.value.hasOwnProperty('sendPendingRequest')){
        console.log('event value: ', x.value);
        if(x.value.sendPendingRequest){
            var adminReqList = new AdminRequestListComponent(this.mydialogRef,this.data,this.dialog,this.auth,this.webService,undefined)
            adminReqList.getProjectName();
            setTimeout(() =>{
                botConnection
            .postActivity({type: "event", value: {"pendingRequest":"There is a new pending request from project "+this.webService.project_name+". Can I bring up the details for you?"}, from: {id: "me" }, name: "pendingRequestEvent"})
            .subscribe(response => console.log("pendingRequest"));
             
            },2000)
            
        }
    }
    // else if(x.value.hasOwnProperty('provisionCheck')){
    //     if(x.value.provisionCheck){
    //         botConnection
    //         .postActivity({type: "event", value: {"provisionYes":"Great!"}, from: {id: "me" }, name: "provisionYesEvent"})
    //         .subscribe(response => console.log("provisionYes"));

    //     }
    // }
   if(x.value.hasOwnProperty('provision')){

        if(x.value.provision){
        // console.log( this.dialogRef)
        // this.dialogRef.close();

        var provision = new myPopup(this.auth,this.webService,this.mydialogRef,this.dialogRef,this.auth.orderData,this.dialog,this.router)
    //     console.log("this.mydialogRef")
    //     console.log(this.mydialogRef)
    //  this.mydialogRef.close()
        provision.ProvisionRequest();
      // provision.closeFunc();
         
        }
        else{
            var provision = new myPopup(this.auth,this.webService,this.mydialogRef,this.dialogRef,this.auth.orderData,this.dialog,this.router)
          console.log(this.mydialogRef)
            provision.rejectRequest();
         
            //  let dialogRef = this.dialog.open(submitPopup, {
            // height: '250px',
            // width: '400px',
            // data: this.auth.orderData
            // })
        }
    }
    if(x.value.hasOwnProperty('stackCluster')){
        if(x.value.stackCluster){
               botConnection
            .postActivity({type: "event", value: {"capacity":"The storage capacity in the cluster has reached 90%.It is suggested that you plan for a backup activity as we see heavy utilization of the cluster."}, from: {id: "me" }, name: "capacityEvent"})
            .subscribe(response => console.log("capacity"));
            this.webService.storage=true;
            this.router.navigate([ '/AdminDashboard'])
          
         //   window.speechSynthesis.speak(new SpeechSynthesisUtterance('The storage capacity in the cluster has reached 80%.It is suggested that you plan for a backup activity as we see heavy utilization of the cluster.'));
        
        }
    }
    if(x.value.hasOwnProperty('RejectedReason')){

        var reject = new submitPopup(this.router,this.dialog,this.dialogRef,this.auth.orderData,this.auth,this.webService)
       this.webService.reason=x.value.RejectedReason;
       setTimeout(() => {
        // reject.reason=x.value.RejectedReason;
        reject.ProvisionReject()
       },3000)
    }
    if(x.value.hasOwnProperty('servicespage1')){
        if(x.value.servicespage1){
            
            this.router.navigate([ `/dashboard/Myservices/NewRequest`])
            var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
            setTimeout(() => {
               
                newRequest.openNewServices();
                    },2000)
            
        }
      

    }
    if(x.value.hasOwnProperty('servicespage')){
        if(x.value.servicespage){
            
            this.router.navigate([ `/dashboard/Myservices/NewRequest`])
            
        }
      

    }



    if(x.value.hasOwnProperty('next') && x.value.next ){
        //      var images = [];
        //             for(var j = 0; j < this.selectedImages.length; j++){
        //                 if(images.indexOf(this.selectedImages[j]) == -1){
        //                     images.push(this.selectedImages[j]);
        //                 }
        //             }
        //             console.log(images)
         var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
       
        // newRequest.checkButton(images)
        newRequest.submit();

       // this.router.navigate([ `/dashboard/orderList`]) 
       // this.router.navigate([ `/dashboard/Myservices/NewRequest`])
        //this.webService.selectedProject=
        }

        if(x.value.hasOwnProperty('Project') ){
            if(!this.webService.projInfoOpened){
                var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
                newRequest.openProjInfo()
                 
            }
            if(x.value.Project.length>0){

                if(x.value.Project[0].toUpperCase() == 'PACKET CORE'){
                     this.webService.selectedProject='Packet core'
                }
                if(x.value.Project[0].toUpperCase() == 'MOBILE TRANSPORT'){
                    this.webService.selectedProject='Mobile transport'
                }
                if(x.value.Project[0].toUpperCase() == 'RADIO NETWORK'){
                this.webService.selectedProject='Radio network'
                }
                if(x.value.Project[0].toUpperCase() == 'NETWORK CORE PLATFORM'){
                    this.webService.selectedProject='Network core platform'
                }

            //this.webService.selectedPlatform=x.value.Platform
            var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
            newRequest.userList(x.value.Project[0])
            setTimeout(() => {
                newRequest.openToggle()
                },2000)
        //    newRequest.openToggle()
        //    newRequest.openServiceTab(Object.keys(x.value))
         // newRequest.openToggle()
          
            }
        
            }
            // if(x.value.hasOwnProperty('Platform') ){
           
            //     this.webService.selectedPlatform=x.value.Platform.entity
            // }
            // if(x.value.hasOwnProperty('Delivery') ){
           
            //     this.webService.selectedDelivaryLocation=x.value.Delivery.entity
            // }
            if(x.value.hasOwnProperty('Users') ){
                if(!this.webService.projInfoOpened){
                    var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
                    newRequest.openProjInfo()
                     
                }
                if(x.value.Users.length>0){
                if(x.value.Users=="All"){
                    this.webService.selectedUserList=this.webService.userslist
                }
               else if(x.value.Users.length == 1){
                var lowerCaseArr = [];
                lowerCaseArr[0]=x.value.Users[0].toLowerCase()
                // for (var i = 0; i < x.value.Users.length; i++) {
                //     lowerCaseArr.push(x.value.Users[i].toLowerCase());
                // }
                this.webService.selectedUserList=lowerCaseArr//x.value.Users;//.replace(/ +/g, "")];
                console.log("userssssssssssssss")
                
                 
               }
                console.log(this.webService.selectedUserList)
                var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
            
                setTimeout(() => {
                    newRequest.openToggle()
                    },5000)
            }
            }
            if(x.value.hasOwnProperty('startdate') ){
                if(!this.webService.projInfoOpened){
                    var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
                    newRequest.openProjInfo()
                     
                }
               
                 x.value['startdate']=x.value['startdate'].replace("2018", "2019");
              
                var strtD = new Date(x.value['startdate']);
                
               console.log(strtD.getFullYear())
                this.webService.todayDate=strtD
            }
            if(x.value.hasOwnProperty('enddate') ){
                if(!this.webService.projInfoOpened){
                    var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
                    newRequest.openProjInfo()
                     
                }
                 x.value['enddate']=x.value['enddate'].replace("2018", "2019");
              
                var lastD = new Date(x.value['enddate']);
                this.webService.lastDate=lastD
                var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
              
                setTimeout(() => {
                newRequest.openToggle()
                },2000)
    
            }

            if(x.value.hasOwnProperty('DeveloperWorkstation')){
                var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
                newRequest.openServiceTab(Object.keys(x.value))
    
            }
            if(x.value.hasOwnProperty('AnalyticsServices')){
                var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
                newRequest.openServiceTab(Object.keys(x.value))
    
            }
            if(x.value.hasOwnProperty('ApplicationServices')){
                var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
                newRequest.openServiceTab(Object.keys(x.value))
    
            }
            if(x.value.hasOwnProperty('OpenDevOps')){
                var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
                newRequest.openServiceTab(Object.keys(x.value))
    
            }
            if(x.value.hasOwnProperty('MLFramework')){
                var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
                newRequest.openServiceTab(Object.keys(x.value))
    
            }
             if(x.value.hasOwnProperty('Services')){
                if(x.value.Services.length>0){
                  var listOfServices:any=x.value.Services;
                 
              console.log(x.value.Services)
                  var newRequest=new NewRequestComponent(this.select,this.dialog,this.cdr,this.auth,this.webService,this.router,this.DatePipe)
                  for(var i=0;i<listOfServices.length;i++){
                    this.selectedImages.push(listOfServices[i])
                   
                }
                var images = [];
                    for(var j = 0; j < this.selectedImages.length; j++){
                        if(images.indexOf(this.selectedImages[j]) == -1){
                            images.push(this.selectedImages[j]);
                        }
                    }
                    console.log(images)
                    newRequest.checkButton(images)
                console.log(this.selectedImages)
                console.log(listOfServices)
                // if(listOfServices[0].entity=="done"){
                 
            }   
                //     newRequest.submit()
                //   }
                //   else{
                   
                    
                //     var images = [];
                //     for(var j = 0; j < this.selectedImages.length; j++){
                //         if(images.indexOf(this.selectedImages[j]) == -1){
                //             images.push(this.selectedImages[j]);
                //         }
                //     }
                //     console.log(images)
                //     newRequest.checkButton(images)
                //   }
      

             }
             if(x.value.hasOwnProperty('budget1')){
                if(x.value.budget1){
             botConnection
             .postActivity({type: "event", value: {"budget":" By the way, the project budget has reached 95% of the allocated budget, You would need to reach out to Alex for additional budget."}, from: {id: "me" }, name: "budgetEvent"})
             .subscribe(response => console.log("budget"));
          this.webService.storage=true;
        // this.router.navigate([ '/dashboard/'])
                }
             }
             if(x.value.hasOwnProperty('create')){
                var orderSummary=new PmordersummaryComponent(this.dialog,this.successdialogRef,this.data,this.router,this.auth,this.webService,this.DatePipe)
                if(x.value.create){
                    orderSummary.submit()
                }
                else{
                    orderSummary.cancelRequest()
                }
             }
             if(x.value.SelectedEnvironment){
                // alert("hi")
                 var MyTestComponent= new TestComponent(this.webService,this.dialogRefS,this.dialog)
                // MyTestComponent.panelOpenStateTwo = true
                 this.webService.panelOpenStateTwo=true;
                 this.webService.compName=x.value.SelectedEnvironment
                 console.log(MyTestComponent);
                 MyTestComponent.showConnectOnClick(x.value.SelectedEnvironment)
                 console.log(MyTestComponent);
              // this.showConnectOnClick(x.value.SelectedEnvironment)
                 
             }
             else if(x.value.Accept){
                 var MyTestComponent= new TestComponent(this.webService,this.dialogRefS,this.dialog)
                // MyTestComponent.jsPlumbInstance.reset()
                 this.webService.panelOpenStateThree=true;
             }
             else if(x.value.EnvironmentName){
                // this.webService.panelOpenStateThree=true;
                 this.webService.envnameValue=x.value.EnvironmentName
             }
             else if(x.value.BuildVersion){
                 this.webService.versionValue=x.value.BuildVersion
             }
             else if(x.value.Template){
                 this.webService.templateValue=x.value.Template
             }
             else if(x.value["Environment Start Date"]){
                 this.webService.startDateValue=x.value["Environment Start Date"]
                 
             }
             else if(x.value["Environment End Date"]){
                 this.webService.endDateValue=x.value["Environment End Date"]
             }
             else if(x.value.Submit){
                 var MyTestComponent= new TestComponent(this.webService,this.dialogRefS,this.dialog)
                 
                 MyTestComponent.reserve(this.webService.envnameValue, this.webService.startDateValue, this.webService.endDateValue)
                 MyTestComponent.successMsg()
                 
             }
            //  if(x.value.hasOwnProperty('Services')){
            //     var submit:any=x.value.Services
            // if(submit[0].entity=="done"){
            //   var newRequest=new NewRequestComponent(this.select,this.cdr,this.auth,this.webService,this.router)
             
            //   newRequest.submit()
            // }

          // }
            //     switch(x.value.Services.toLowerCase()){

            //         case "ubuntu":
            //             $("#ubuntu1").prop("checked", true);
            //         break;

            //         case "windows":
            //             $("#ubuntu2").prop("checked", true);
            //         break;

            //         case "Linux":
            //             $("#ubuntu3").prop("checked", true);
            //         break;

            //         case "gerrit":
            //             $("#coderev1").prop("checked", true);
            //         break;
                    
            //         case "collaborator":
            //             $("#coderev2").prop("checked", true);
            //         break;

            //         case "subversion":
            //             $("#coderev2").prop("checked", true);
            //         break;

            //         case "sub version":
            //             $("#coderev2").prop("checked", true);
            //         break;

            //         case "gitlab":
            //             $("#srcCodeMgmt").prop("checked", true);
            //         break;

            //         case "jenkins":
            //             $("#contInt1").prop("checked", true);
            //         break;

            //         case "travis ci":
            //             $("#contInt2").prop("checked", true);
            //         break;

            //         case "bamboo":
            //             $("#contInt3").prop("checked", true);
            //         break;

            //         case "redmine":
            //             $("#projMgmt1").prop("checked", true);
            //         break;

            //         case "red mine":
            //             $("#projMgmt1").prop("checked", true);
            //         break;

            //         case "openproject":
            //         case "open project":
            //             $("#projMgmt2").prop("checked", true);
            //         break;

            //     }
            // }
            // if(x.value.hasOwnProperty('OpenDevOps')){
            //     var newRequest=new NewRequestComponent(this.select,this.cdr,this.auth,this.webService,this.router)
            //     newRequest.openServiceTab(Object.keys(x.value))
    
            // }
        // else if(!x.value.provision){
        //     // console.log( this.dialogRef)
        // // this.mydialogRef.close();
        // let dialogRef = this.dialog.open(submitPopup, {
        //     height: '250px',
        //     width: '400px',
        //     data: this.auth.orderData
        //     })
        //     // var provision = new myPopup(this.auth,this.webService,this.dialogRef,this.mydialogRef,this.auth.orderData,this.dialog,this.router)
            
        //     //  provision.rejectRequest();
          
             
        //     }
        }
        // botConnection.activity$.subscribe(activity => {
           

        // if(activity.type === "message"){
        //         botConnection
        //         .postActivity({type: "event", value: {username: localStorage['username'], 'helloCount': helloCount}, from: {id: localStorage['username'], name: localStorage['username'] }, name: "userLogin"})
        //         .subscribe(id => console.log("success"));
        //     }else if(activity.type === "event" && activity.name==="UI_Changes" && activity.value.hasOwnProperty('report_type')){
        //         console.log(activity.value);
        //       //  callMe(activity.value) ;
        //     }else{
        //        // this.router.navigate([ '/dashboard/**'])
        //        return;
        //     }
        // })
  }

  close() {
    this.mydialogRef.close();
  }
  

  ngOnInit() {
    setTimeout(function(){
      $("#BotChatGoesHere").addClass('showDiv'); 
      },200);


      
       setTimeout(function(){ 
            $(".wc-message-wrapper .wc-message-from-bot span").empty();
            $(".wc-header span").empty();
            var heading = "CREDO Bot"
            $(".wc-header").append("<div class='headingChat'><img src='./assets/newimages/header-bot.png' width=32px height=32px><span style='margin: 10px;font-weight:bold;font-size:22px'>"+ heading + "</span><span style='float:right'  id='minimizeOpt'><h1 style='margin-top: -25px; font-size: 70px;cursor: pointer;'>-</h1></div>");
           // $(".wc-header").append("<div class='btn minimizeOpt' id='minimizeOpt' ><img src='./assets/images/cancel_32x32.png'></div>");
            $('#minimizeOpt').click(function(){
                $("#BotChatGoesHere").toggleClass('showDiv');
                $("#buttonClick").toggleClass('hide');
           //     $("#buttonClick").toggle('scale');    
          })
           
        }, 200);
     
     
     $("#buttonClick").click(function() {           
       //$("#buttonClick").toggle('scale');
 })
    
 $("#buttonClick").toggleClass('hide');

     
     $('#buttonClick').click(function(){
            $("#BotChatGoesHere").toggleClass('showDiv');  
            $("#buttonClick").toggleClass('hide');
            
     })
    
      $('#minimizeOpt').click(function(){
           $("#BotChatGoesHere").toggleClass('showDiv');
           $("#buttonClick").toggleClass('hide');
           //$("#buttonClick").toggle('scale');

     })
      
   //  this.launchChatbot();
  }

}
