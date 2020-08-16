import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //Check Usage of notificationData
  notifications: any = [];
  logedInUser;
  logedInUserRole;
  constructor (
    private auth: AuthService, 
    private webService: WebService,
    private router: Router
  ) { }

  ngOnInit() {
    this.logedInUser = this.auth.name;
    this.logedInUserRole =  this.auth.role;
    this.notificationData();
  }

  logout() {
    window.localStorage.clear()
    this.router.navigate(['/login']);
  }

  notificationData() {
      var userdata = JSON.stringify({ "login": JSON.parse(this.auth.data), "action": "read", "status": "UNREAD" });
      this.webService.getNotificationsData(userdata).subscribe(res => {
          var response: any = res;
          this.notifications = response.request;

      })
  }
}
