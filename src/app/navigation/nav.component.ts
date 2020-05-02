import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';

@Component({
    selector: 'nav-app',
    templateUrl: './nav.component.html',
    styles: [`

    .badge-danger {
        background:red;
   position:relative;
   top: -7px;
   left: -10px;
    }
    .notification.notify::before {
        -webkit-animation: ring 1.5s ease;
        animation: ring 1.5s ease;
    }
    li.header {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        background-color: #ffffff;
        padding: 7px 10px;
        border-bottom: 1px solid #f4f4f4;
        color: #444444;
        font-size: 14px;
    }
    .dropdown-menu{
        width: 280px;
padding: 0 0 0 0;
margin: 0;
top: 100%;
position: absolute;
right: 0;
left: auto;
    }
    .dropdown-menu > li .menu > li > a {
        color: #444444;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 10px;
    }
    .dropdown-menu > li .menu > li > a{
        display: block;
white-space: nowrap;
border-bottom: 1px solid #f4f4f4;
    }
    .dropdown-menu > li.footer > a
    {
        border-top-left-radius: 0;
border-top-right-radius: 0;
border-bottom-right-radius: 4px;
border-bottom-left-radius: 4px;
font-size: 12px;
background-color: #fff;
padding: 7px 10px;
border-bottom: 1px solid #eeeeee;
color: #444 !important;
text-align: center;
    }
    `]
})
export class NavComponent {
    notifications: any = [];
    constructor(private auth: AuthService, private webService: WebService) { }
    notificationData() {
        var userdata = JSON.stringify({ "login": JSON.parse(this.auth.data), "action": "read", "status": "UNREAD" });
        this.webService.getNotificationsData(userdata).subscribe(res => {
            var response: any = res;
            this.notifications = response.request;

        })
    }
    ngOnInit() {
        this.notificationData();
    }

    removedcontent() {
        //     <div class="dropdown">
        //     <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" style="border:none;background: black;">
        //     <span class="caret"></span></button>
        //     <ul class="dropdown-menu" style="width:200px">
        //       <li><a href="#">Password Management</a></li>
        //       <li><a href="#">My Settings</a></li>
        //     </ul>
        //   </div>    
    }
}
