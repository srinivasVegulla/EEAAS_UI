import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
//import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './auth.service'
import { MatSelect } from '@angular/material';
import { ApiService } from "../bare-metal/services/api.service";

import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
@Injectable({ providedIn: 'root' })
export class WebService {
    @ViewChild('mySelect', { static: false }) mySelect: MatSelect;
    // BASE_URL = 'https://10.138.77.70:12399/';
    // SERVICE_URL = 'https://10.138.77.70:12399/';
    // URL = 'https://10.138.77.70:12399/';
    // URL1 = 'https://10.138.77.70:12399/';
    BASE_URL = 'http://192.168.6.2:12311/';
    SERVICE_URL = 'http://192.168.6.2:12311/';
    URL = 'http://192.168.6.2:12311/';
    URL1 = 'http://192.168.6.2:12311/';
    projectInfo = 'project_Info'
    bareMetalData;
    reason: any;
    selectedIndex = 1;
    selectedProject: any;
    public chart: AmChart;
    selectedUserList: any = ['sam'];
    lastDateReservation: any = "";
    todayDateReservation: any = "";

    todayDate: any = ""//=new Date();
    lastDate: any = ""//=  new Date(this.todayDate.getFullYear(), this.todayDate.getMonth() + 1, 0);
    toDateLimit: any = "";

    selectedDelivaryLocation: any = "Hyderabad";
    selectedPlatform: any = "Virtual Machine";
    selectedSoftwareLoad: any = "";
    selectedScenarios: any = "";
    lineManger: any;
    admin: any;
    userslist: any = ['sam', 'alice', 'jill'];
    imageArray: any = [];
    services: any = [];
    message = "Submitted successfully"
    panelOpenStateTwo = false;
    panelOpenStateThree = false
    components: any = []
    connections: any = []
    compName: string;
    envnameValue: string = ""
    versionValue: string
    startDateValue: Date
    endDateValue: Date
    templateValue: string
    down_hosts: string
    projInfoOpened: boolean
    project_name: string
    adminTableData: any;
    currentDate: any = new Date();
    lastTimeReservation: any = "";
    todayTimeReservation: any = "";
    lastDateUtiReservation: any = "";
    todayDateUtiReservation: any = "";
    Dashboard: boolean = false;
    ReservationSystem: boolean = false;
    myService: boolean = false;
    assurance: boolean = false;
    storage: boolean = false;
    reports: boolean = false;
    LMDashboard: boolean = false;
    catalogue: boolean = false;
    orders: boolean = false
    Inventory: boolean = false;
    Assets = false;
    designerDashboard: boolean = false;
    serviceRequest: boolean = false;
    serviceRequestList: boolean = false;
    issues: boolean = false;
    labs: boolean = false;
    devices: boolean = false;
    ReservationList: boolean = false;
    holidays: boolean = false;
    calendar: boolean = false;
    currentTab;
    service_Types: any = ['Continuous Integration', 'Issue Management', 'Code Review', 'Virtual Development Environment', 'Monitoring', 'bare_metal'];
    selectedServiceType: any;
    formats: any = ['Docker', 'qcow2']
    extendTimeReservation: any;
    extendDate: Date;
    selectedFormat: any;
    physicalServiceId: any = "";
    selectedRole: any;
    roles: any = ['PM', 'LM', 'Admin', 'Developer']
    openselect(my) {
        console.log("sajkjas")
        my.toggle();
    }

    gauge(id, num, max, color) {
        if ((id == "chartdiv2" || id == "chartdiv5") && num >= 1.8) {
            console.log("nabs")
            this.chart = this.AmCharts.makeChart(id, {

                "type": "gauge",
                "axes": [{
                    "topTextFontSize": 20,
                    "topTextYOffset": 70,
                    "color": "#ffffff",
                    "labelOffset": -20,
                    "axisColor": "#31d6ea",
                    "axisThickness": 1,
                    "endValue": 2,
                    "axisAlpha": 0,
                    "tickAlpha": 1,

                    "radius": "50%",
                    // "valueInterval": 100,
                    "tickColor": "rgba(20,21,40,1)",
                    "startAngle": -145,
                    "endAngle": 145,
                    "unit": " ",

                    "bands": [
                        {
                            "color": "red",
                            "endValue": max,

                            "innerRadius": "125%",
                            "radius": "160%",

                            "startValue": num
                        },
                        //       {
                        //     "color": "red",
                        //     "endValue": num,

                        //     "innerRadius": "125%",
                        //     "radius": "160%",

                        //     "startValue": 1.6
                        //   },
                        {
                            "color": color,
                            "endValue": num,
                            "innerRadius": "125%",
                            "radius": "160%",
                            //   "gradientRatio": [0.6, 0, -0.6],
                            "startValue": 0
                        }]
                }],
                "arrows": [{
                    "alpha": 1,
                    "innerRadius": "35%",
                    "nailRadius": 0,
                    "radius": "160%",
                    "value": num,
                    "color": "rgba(255,255,255,1)"
                }]
            });
        }
        else {
            this.chart = this.AmCharts.makeChart(id, {

                "type": "gauge",
                "axes": [{
                    "topTextFontSize": 20,
                    "topTextYOffset": 70,
                    "color": "#ffffff",
                    "labelOffset": -20,
                    "axisColor": "#31d6ea",
                    "axisThickness": 1,
                    "endValue": max,
                    "axisAlpha": 0,
                    "tickAlpha": 1,

                    "radius": "50%",
                    // "valueInterval": 100,
                    "tickColor": "rgba(20,21,40,1)",
                    "startAngle": -145,
                    "endAngle": 145,
                    "unit": " ",

                    "bands": [{
                        "color": "#555d6a",
                        "endValue": max,

                        "innerRadius": "125%",
                        "radius": "160%",

                        "startValue": num
                    }, {
                        "color": color,
                        "endValue": num,
                        "innerRadius": "125%",
                        "radius": "160%",
                        //   "gradientRatio": [0.6, 0, -0.6],
                        "startValue": 0
                    }]
                }],
                "arrows": [{
                    "alpha": 1,
                    "innerRadius": "35%",
                    "nailRadius": 0,
                    "radius": "160%",
                    "value": num,
                    "color": "rgba(255,255,255,1)"
                }]
            });
        }

        // setInterval(()=>{
        //   var value = num;
        //   this.chart.arrows[0].setValue(num);
        // this.chart.axes[0].setTopText(value + " %");
        // adjust darker band to new value
        //   this.chart.axes[0].bands[1].setEndValue(num);
        // },2000)
    }
    get project_Info() {
        return localStorage.getItem(this.projectInfo);

    }
    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private AmCharts: AmChartsService,
        private api: ApiService
    ) {
        this.BASE_URL = this.api.API + "/"; // 'https://192.168.6.2:12311/';
        this.SERVICE_URL = this.api.API + "/";
        this.URL = this.api.API + "/";
        this.URL1 = this.api.API + "/";
    }

    getTopologyData(data) {
        return this.http.post(this.URL + 'componentInfo', data);
    }

    getCreateReservation(data) {
        return this.http.post(this.URL + 'create_reservation', data);
    }

    getDeploy(data) {
        return this.http.post(this.URL + 'deploy', data);
    }

    getReservation(data) {
        return this.http.post(this.URL + 'update_reservation', data);
    }

    getvmInfo(data) {
        return this.http.post(this.URL + 'vminfo', data);
    }


    getPMServiceData(data) {
        return this.http.post(this.BASE_URL + 'dashboard', data);
    }
    getNotificationsData(data) {
        return this.http.post(this.BASE_URL + 'notifications', data);
    }
    getProjectInfo(data) {

        return this.http.post(this.BASE_URL + 'projectInfo', data);
    }
    getUsersInfo(data) {
        return this.http.post(this.BASE_URL + 'userInfo', data);
    }
    setUsersInfo(data) {
        return this.http.post(this.BASE_URL + 'userInfo', data);
    }
    getServiceData(data) {
        return this.http.post(this.SERVICE_URL + 'catalogue', data);
    }
    setProjectInfo(data) {

        localStorage.setItem(this.projectInfo, JSON.stringify(data));
        return true;
    }
    setBareMetalData(data) {

        localStorage.setItem(this.bareMetalData, JSON.stringify(data));
        return true;
    }
    saveRequestData(data) {
        return this.http.post(this.SERVICE_URL + 'requestInfo', data);
    }
    RequestData(data) {
        return this.http.post(this.SERVICE_URL + 'requestInfo', data);
    }
    getRequestServiceData(data) {
        return this.http.post(this.SERVICE_URL + 'requests', data);
    }
    getAdminDbData(data) {
        return this.http.post(this.SERVICE_URL + 'dashboard', data);
    }
    getVdes(data) {
        return this.http.post(this.BASE_URL + 'vdes', data);
    }
    devoperModal(data) {
        return this.http.post(this.BASE_URL + 'manageVde', data);
    }
    launchInstance(data) {
        return this.http.post(this.BASE_URL + 'launchInstance', data);
    }
    update_vde(data) {
        return this.http.post(this.BASE_URL + 'update_vde', data);
    }
    getReservationList() {
        return this.http.get(this.URL1 + 'inventoryList');
    }
    getCatologueData() {
        return this.http.get(this.URL1 + 'catalogue');
    }

    getCatalogueList(data) {
        return this.http.post(this.URL1 + 'catalogue', data);
    }
    getFilteredReservationData(data) {
        return this.http.post(this.URL1 + 'inventoryList', data);
    }
    getReservationListLocation(data) {
        return this.http.post(this.URL1 + 'inventoryList', data);
    }
    setServiceData(data) {
        return this.http.post(this.SERVICE_URL + 'catalogue', data);
    }
    deleteServiceData(data) {
        return this.http.post(this.SERVICE_URL + 'catalogue', data);
    }
    getBillingData(data) {
        return this.http.post(this.SERVICE_URL + 'priceReports', data);
    }
    getServerDetails(data) {
        return this.http.post(this.SERVICE_URL + 'serverList', data);
    }
    getUtilizationReports(data) {
        return this.http.post(this.SERVICE_URL + 'utilizationReports', data);
    }

    getAssetsData() {
        return this.http.get(this.URL1 + 'assets');
    }

    submitAssetDetails(data) {
        return this.http.post(this.SERVICE_URL + 'newasset', data);
    }

    getassetUsageHistory(data) {
        return this.http.post(this.SERVICE_URL + 'usagehistory', data);
    }

    getUsersData() {
        return this.http.get(this.URL1 + 'getusers');
    }
    submitUserDetails(data) {
        return this.http.post(this.SERVICE_URL + 'newuser', data);
    }

    getAssetsUsageBar() {
        return this.http.get(this.URL1 + 'assetdashboard');
    }


    // private messageStore = [];

    // private messageSubjet = new Subject();
    //  showNav = false;
    // messages = this.messageSubjet.asObservable();

    // constructor(private http: Http, private sb: MatSnackBar, private auth: AuthService) {
    //     this.getMessages(null);
    // }

    // getMessages(user) {
    //     user = (user) ? '/' + user : '';
    //     this.http.get(this.BASE_URL + '/messages' + user).subscribe(response => {
    //         this.messageStore = response.json();
    //         this.messageSubjet.next(this.messageStore);
    //         this.showNav = true;
    //     }, error => {
    //         this.handleError("Unable to get messages");
    //     });
    // }

    // async postMessage(message) {
    //     try {
    //         var response = await this.http.post(this.BASE_URL + '/messages', message).toPromise();
    //         this.messageStore.push(response.json());
    //         this.messageSubjet.next(this.messageStore);
    //     } catch (error) {
    //         this.handleError("Unable to post message");
    //     }

    // }

    // getUser(){
    //     return this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader).map(res => res.json());
    // }

    // saveUser(userData){
    //     return this.http.post(this.BASE_URL + '/users/me',userData, this.auth.tokenHeader).map(res => res.json());
    // }


    // private handleError(error) {
    //     console.error(error);
    //     this.sb.open(error, 'close', { duration: 2000 });
    // }
}
