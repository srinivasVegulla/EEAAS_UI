import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuComponent } from '../pmsidebar/menu.component';
import { ApiService } from "../bare-metal/services/api.service";
import * as $ from 'jquery';

@Injectable()
export class AuthService {
  resp;
  userid;
  BASE_URL = 'http://192.168.6.2:12311'; // 'https://192.168.6.2:12311' //  'https://10.138.77.70:12399';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token'
  errorMessage: any;
  EEaaS_role = "role";
  userInfo = 'data';
  p_Name = 'projectName'
  o_Data = 'orderData'
  a_Data = 'adminData'
  constructor(private http: HttpClient, private router: Router, private api: ApiService) {
    this.BASE_URL = this.api.API;
  }

  get name() {
    console.log("hi vegu")
    return localStorage.getItem(this.NAME_KEY);

  }
  get data() {
    return localStorage.getItem(this.userInfo);

  }
  get role() {
    return localStorage.getItem(this.EEaaS_role);

  }
  get projectName() {
    return localStorage.getItem(this.p_Name);

  }
  get orderData() {
    return localStorage.getItem(this.o_Data);

  }
  get adminData() {
    return localStorage.getItem(this.a_Data);

  }
  get isAuthenticated() {
    return !!localStorage.getItem(this.NAME_KEY);
  }

  /* get tokenHeader() {
    var header = new HttpHeaders ({ 'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY) })
    return new HttpRequest({ headers: header });
  } */

  login(loginData) {
    this.http.post(this.BASE_URL + '/login', loginData).subscribe(res => {

      this.authenticate(res);
      // var response:any = res;
      // console.log(JSON.parse(response.data))
      // console.log(JSON.parse(response))

    })
  }

  // register(user) {
  //     delete user.confirmPassword;
  //     this.http.post(this.BASE_URL + '/register', user).subscribe(res => {
  //     this.authenticate(res);

  //     });
  // }

  logout() {
    window.localStorage.clear()
    // localStorage.removeItem(this.NAME_KEY);
    // localStorage.removeItem(this.EEaaS_role);
    // localStorage.removeItem(this.userInfo);
    // localStorage.removeItem(this.p_Name);
    // localStorage.removeItem(this.o_Data);
    // localStorage.removeItem(this.a_Data);

    this.router.navigate(['/login']);
    // window.location.reload();
    //localStorage.removeItem(this.TOKEN_KEY);
  }
  setProjectName(name) {
    localStorage.setItem(this.p_Name, JSON.stringify(name))
  }
  setOrderData(data) {
    localStorage.setItem(this.o_Data, JSON.stringify(data))
  }
  setadminTableData(data) {
    console.log(data, "m der")
    localStorage.setItem(this.a_Data, JSON.stringify(data))
  }
  authenticate(res) {
    var response = res;
console.log("hiiiiiiiiiiiiiiii",response )
    //  localStorage.setItem(this.EEaaS_user,response.user_name);


    if (response.job == true) {
      localStorage.setItem(this.NAME_KEY, response.user_name)
      localStorage.setItem(this.EEaaS_role, response.role);
      localStorage.setItem(this.userInfo, JSON.stringify(response));
      console.log(localStorage)
      console.log(JSON.parse(localStorage.data))
      this.resp = JSON.parse(localStorage.data)
      this.userid = this.resp.user_id
      console.log(this.userid)

      if (response.role == "PM") {

        this.router.navigate(['home/dashboard']);

      }
      else if (response.role == "Admin") {
        this.router.navigate(['home/AdminDashboard']);
      }
      else if (response.role == "Tester") {
        this.router.navigate(['/TesterDashboard']);
      }
      else if (response.role == "Developer") {
        this.router.navigate(['/Developer']);
      }
      else if (response.role == "Designer") {
        this.router.navigate(['/DesignerDashboard']);
      }
      else if (response.role == "LM") {
        this.router.navigate(['home/lmdashboard']);
      }

      //   else if(response.data.role=="Developer"){
      //      location.href="pages/developer/dashboard.html";
      //  } else if(response.data.role=="LM"){
      //      location.href="lm-dashboard.html";

      //  } else if(response.data.role=="Designer"){
      //      location.href="pages/service/dashboard.html";
      //  }
      //   else if(response.data.role=="Tester"){
      //      location.href="pages/tester/dashboard.html";
      //  }
    }
    else {
      this.errorMessage = "Invalid Username or Password";
    }
    // if(!authResponse.token)
    //     return;

    // localStorage.setItem(this.TOKEN_KEY, authResponse.token)
    // localStorage.setItem(this.NAME_KEY, authResponse.firstName)
    // this.router.navigate(['/dashboard']);
  }
  addCatalogueService() {
    this.router.navigate(['/home/AdminDashboard/DesignerDashboard/serviceRequest']);
  }
  addLabService() {
    this.router.navigate(['/home/AdminDashboard/serviceRequest']);
  }
} 
