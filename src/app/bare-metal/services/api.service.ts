import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/of';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
//import 'rxjs/add/observable/of';
import { of as observableOf } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import * as $ from 'jquery';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private _location: Location
    ) {
        // this.showSuccess()
    }
    API = 'http://10.138.77.70:12399'; //'https://192.168.6.2:12311';
    commonError = "Something went wrong. Please try again.";
    // utils 

    bytesToSize(bytes) {
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        let i = Math.floor(Math.log(bytes) / Math.log(1024)).toFixed();
        // let i= parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, Number(i))) + ' ' + sizes[i];
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getColor4Pie(name) {
        name = name.toLowerCase();
        if (name == 'switch')
            return '#f89456'//  '#fab387'; //  'red';
        else if (name == 'bare_metal')
            return '#56baf8'; // '#87cefa'; //  'blue';
        else if (name == 'service')
            return '#f8e556'; // '#faed87' // 'orange';
        else if (name == 'VDE')
            return '#56f894'; // '#87fab3'; // 'yellow';
        else return '#cefa87'; // 'green';
    }

    getItem(key) {

        let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null;
        if (data) {
            return data[key];
        } else {
            return null;
        }

    }

    humanize(str) {

        var frags = str.split('_');
        for (let i = 0; i < frags.length; i++) {
            frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(' ');
    }

    getRandomNumber() {
        return Math.floor(Math.random() * (999999 - 100000)) + 100000;
    }

    add_units_to_server_details(value, label) {
        if (String(label).toLowerCase() == 'ram' || String(label).toLowerCase() == 'disk') {
            if (!String(value).includes("GB"))
                return `${value} GB`;
            else return value;
        } else if (String(label).toLowerCase() == 'cpu') {
            if (!String(value).includes("Cores"))
                return `${value} Cores`;
            else return value;
        } else {
            return value;
        }
    }

    hideAmchartsIcon() {
        setTimeout(() => {
            let list = $("rect");
            list.map((item) => {
                let it = $(list[item]);
                if (it.attr("width") == '66' && it.attr("height") == '21') {
                    it.parent().parent().remove();
                }
            });
        }, 1000);
    }

    // utils ends

    // pm api calls
    getDashboardData() {
        let data = { "login": { "project_id": ["proj_0018", "IoT", "NextGen"], "user_name": "Sam", "user_id": "Sam", "job": true, "role": "PM" } };
        return this.http.post(`${this.API}/dashboard`, data)
        // return Observable.of({"PM": {"bg_server_free": 13, "bg_server_count": 23, "reservations_expiring": 38, "pm_requested_bill": 7344.0, "approved_requests": 2, "pending_requests": 9, "bg_server_use": 10, "pm_utilised_bill": 7800.0, "vm_pen_count": 0}, "openstack": {"services": 6, "running_vms": 80, "memory_mb_used": 185032, "projects": 2, "local_gb_used": 1593, "requests_per_project": {"request": [{"allocated": 5, "project_name": "NextgenDevops", "pending": 0, "request": 5}, {"allocated": 2, "project_name": "Microservices", "pending": 3, "request": 6}, {"allocated": 5, "project_name": "Demo", "pending": 0, "request": 4}, {"allocated": 2, "project_name": "sampleProject", "pending": 0, "request": 2}, {"allocated": 1, "project_name": "Devops", "pending": 0, "request": 1}, {"allocated": 1, "project_name": "NFVDeployments", "pending": 0, "request": 1}, {"allocated": 2, "project_name": "EEaaS Project", "pending": 0, "request": 2}, {"allocated": 4, "project_name": "NextgenNFV", "pending": 0, "request": 4}]}, "vdes": 0, "project_info": [{"total_budget": 1000000, "project_name": "EEaaS Project", "avail_budget": 400040}], "per_memory_used": 36.14, "users": 45, "rqst_vm": 1, "allocated_vdes": 5, "per_cpus": 940.0, "opn_active_vdes": 19, "openstack_host": 23, "pending_request": 0, "vcpus_used": 166, "opn_services": 5, "per_local_gb_used": 150.93}, "LM": {}, "Admin": {}, "kubernetes": {"services": 5, "hdd_usage": 1340.56, "memory_usage": 106400.1, "rqst_container": 6, "kube_host": 5, "kube_active_vdes": 4, "vdes": 2, "kube_services": 11, "allocated_vdes": 5, "cpu_usage": 60}});
    }

    getNotifications() {
        let data = { "login": { "job": true, "user_name": "Sam", "role": "PM", "user_id": "Sam", "project_id": ["NextGen"] }, "action": "read", "status": "UNREAD" }
        return this.http.post(`${this.API}/notifications`, data);
        // return Observable.of({"request": [{"notifier": "Alice", "notify": "Sam", "subject_id": "req_0101", "status": "UNREAD", "timestamp": "2019-08-19 17:50:49", "message": "Line Manager has APPROVED a request with request id req_0101", "notify_id": "nty_0553", "notify_type": "request"}, {message: "two"},  {message: "3"},  {message: "4"},  {message: "5"},  {message: "6"}]});
    }

    listOfOS_APPS() {
        return this.http.get(`${this.API}/catalogue`)
    }


    getServerList(data?) {

        // let data = { "start_date": "9/04/2019 0:0:0", "end_date": "8/11/2019 0:0:0", "action": "search", "location": "all" }
        return this.http.post(`${this.API}/inventoryList`, data);

    }

    getCatalog() {

        return this.http.get(`${this.API}/catalogue`);
    }

    getServerDetails(service_id?) {
        return this.http.post(`${this.API}/serverList`, { "action": "display", service_id });
        // return Observable.of({ "server_details": [{ "mac_address": "00:25:27:e8:2c:cf", "server_name": "Server01", "Ip_Address": "NA", "location": "loc_0001", "CPU": "8", "server_id": "serv_4001", "operating_system": "NA", "RAM": "14", "status": "Available", "Disk": "180", "softwares": "NA", "model": "30BC002TID" }] });
    }

    requestedList() {
        return this.http.get(`${this.API}/requestInfo`);
    }

    reserveServers(req) {
        return this.http.post(`${this.API}/requestInfo`, req);
    }

    loadPie(req) {
        // sample input  '{"login":{"job":true,"user_name":"Sam","role":"PM","user_id":"Sam","project_id":["NextGen"]},"action":"read"}'
        // sample output {"switch": 5, "bare_metal": 20} https://10.138.77.48:12399/
        return this.http.post(`${this.API}/getprojectreservations`, req);
        // return this.http.post(`https://10.138.77.48:12399/getprojectreservations`, req);
    }

    cancelReq(data) {
        return this.http.post(`${this.API}/requestInfo`, data);

    }

    releaseReq(data) {
        //     let sample = { 
        //         "baremetal and switches": {
        //             "login":"{\"user_name\":\"Sam\",\"user_id\":\"Sam\",\"job\":true,\"project_id\":[\"NextGen\"],\"role\":\"PM\"}","'request_id': 'req_0121', 'status': 'RELEASED', 'instance_type': 'Physical'},
        //     "Other services(vdes or services)": {"login":"{\"user_name\":\"Sam\",\"user_id\":\"Sam\",\"job\":true,\"project_id\":[\"NextGen\"],\"role\":\"PM\"}","'request_id': 'req_0121', 'status': 'RELEASED''}
        // } } };
        return this.http.post(`${this.API}/release`, data);

    }

    extendReq(data) {
        let sample = { 'request_id': 'req_0121', 'end_date': '09-14-2019-00-00-00', 'status': 'RENEWED', 'action': 'extend' }
        return this.http.post(`${this.API}/requestInfo`, data);

    }

    installUninstallApps_pm(data) {
        return this.http.post(`${this.API}/requestInfo`, data);
    }




    // lm apis from here

    lmReq() {

        return this.http.get(`${this.API}/requestInfo`);
    }

    req_info(data) {

        return this.http.post(`${this.API}/requestInfo`, data);
    }

    loadLmBarChart() {
        return this.http.get(`${this.API}/projectInfo`);
    }

    getReq_data1_lm(data) {
        return this.http.post(`${this.API}/requestInfo`, data); // https://10.138.77.48:12399/requestInfo

    }

    getReq_data2_lm(data) {
        return this.http.post(`${this.API}/requests`, data); //https://10.138.77.48:12399/requests


    }

    projectInfo(data) {
        return this.http.post(`${this.API}/projectInfo`, data);  // https://10.138.77.48:12399/projectInfo <POST>

    }

    getServerDetails_user(data) {
        return this.http.post(`${this.API}/inventoryList`, { action: 'read', service_id: data });
    }

    configure(data) {
        // return this.http.post(`https://10.138.77.70:12399/Configure`, data);
        return this.http.post(`${this.API}/Configure`, data);
    }

    update_sw_ver(data) {
        // return https://192.168.6.2:12311/switchConf
        return this.http.post(`${this.API}/switchProvision`, data);

    }

    makePieData(raw) {
        let obj = {};
        let keys = ['switch', 'VDE', 'bare_metal', 'service'];
        Object.keys(raw).map((item) => {
            if (item == 'switch' || item == 'VDE' || item == 'bare_metal') obj[item] = raw[item];
            else {
                obj['service'] = obj['service'] ? obj['service'] + raw[item] : raw[item]
            }
            keys.map((item) => {
                if (!obj[item]) obj[item] = 0; // 0

            })

        });
        return obj;
    }

    // switch things from here

    switchConfig(data) {

        return observableOf(
            { "response": [{ "collection_result": { "total_elements_count": 7, "filtered_elements_count": 7 }, "vlan_element": [{ "uri": "/vlans/1", "vlan_id": 1, "name": "DEFAULT_VLAN", "status": "VS_PORT_BASED", "type": "VT_STATIC", "is_voice_enabled": false, "is_jumbo_enabled": false, "is_dsnoop_enabled": false, "is_dhcp_server_enabled": false }, { "uri": "/vlans/5", "vlan_id": 5, "name": "EEaaS_1", "status": "VS_PORT_BASED", "type": "VT_STATIC", "is_voice_enabled": false, "is_jumbo_enabled": false, "is_dsnoop_enabled": false, "is_dhcp_server_enabled": false }, { "uri": "/vlans/6", "vlan_id": 6, "name": "EEaaS_2", "status": "VS_PORT_BASED", "type": "VT_STATIC", "is_voice_enabled": false, "is_jumbo_enabled": false, "is_dsnoop_enabled": false, "is_dhcp_server_enabled": false }, { "uri": "/vlans/10", "vlan_id": 10, "name": "test1", "status": "VS_PORT_BASED", "type": "VT_STATIC", "is_voice_enabled": false, "is_jumbo_enabled": false, "is_dsnoop_enabled": false, "is_dhcp_server_enabled": false }, { "uri": "/vlans/364", "vlan_id": 364, "name": "ui_vlan", "status": "VS_PORT_BASED", "type": "VT_STATIC", "is_voice_enabled": false, "is_jumbo_enabled": false, "is_dsnoop_enabled": false, "is_dhcp_server_enabled": false }, { "uri": "/vlans/511", "vlan_id": 511, "name": "Varshini", "status": "VS_PORT_BASED", "type": "VT_STATIC", "is_voice_enabled": false, "is_jumbo_enabled": false, "is_dsnoop_enabled": false, "is_dhcp_server_enabled": false }, { "uri": "/vlans/514", "vlan_id": 514, "name": "Bangari", "status": "VS_PORT_BASED", "type": "VT_STATIC", "is_voice_enabled": false, "is_jumbo_enabled": false, "is_dsnoop_enabled": false, "is_dhcp_server_enabled": false }] }, { "collection_result": { "total_elements_count": 0, "filtered_elements_count": 0 }, "qos_policy_element": [] }, { "collection_result": { "total_elements_count": 3, "filtered_elements_count": 3 }, "acl_element": [{ "uri": "/acls/101~AT_EXTENDED_IPV4", "id": "101~AT_EXTENDED_IPV4", "acl_name": "101", "acl_type": "AT_EXTENDED_IPV4" }, { "uri": "/acls/102~AT_EXTENDED_IPV4", "id": "102~AT_EXTENDED_IPV4", "acl_name": "102", "acl_type": "AT_EXTENDED_IPV4" }, { "uri": "/acls/103~AT_EXTENDED_IPV4", "id": "103~AT_EXTENDED_IPV4", "acl_name": "103", "acl_type": "AT_EXTENDED_IPV4" }] }, { "uri": "/system", "name": "HP-2920-24G", "location": "", "contact": "", "device_operation_mode": "DOM_AUTONOMOUS", "default_gateway": { "version": "IAV_IP_V4", "octets": "0.0.0.0" } }, { "uri": "/system/status", "name": "HP-2920-24G", "serial_number": "SG35FLW285", "firmware_version": "WB.16.04.0016", "hardware_revision": "J9726A", "product_model": "2920-24G Switch", "base_ethernet_address": { "version": "MAV_EUI_48", "octets": "d4c9ef-aa4a40" }, "total_memory_in_bytes": 75403776, "sys_temp": 26, "sys_temp_threshold": 55, "sys_fan_status": false }, { "collection_result": { "total_elements_count": 2, "filtered_elements_count": 2 }, "device_management_user_element": [{ "type": "UT_OPERATOR", "name": "testoperator", "password": "******", "password_type": "PET_PLAIN_TEXT", "uri": "/management-user/UT_OPERATOR" }, { "type": "UT_MANAGER", "name": "admin", "password": "******", "password_type": "PET_PLAIN_TEXT", "uri": "/management-user/UT_MANAGER" }] }, { "collection_result": { "total_elements_count": 24, "filtered_elements_count": 24 }, "vlan_port_element": [{ "uri": "/vlans-ports/5-1", "vlan_id": 5, "port_id": "1", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/5-7", "vlan_id": 5, "port_id": "7", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/5-8", "vlan_id": 5, "port_id": "8", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/5-9", "vlan_id": 5, "port_id": "9", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/5-10", "vlan_id": 5, "port_id": "10", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/5-11", "vlan_id": 5, "port_id": "11", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/5-12", "vlan_id": 5, "port_id": "12", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/6-13", "vlan_id": 6, "port_id": "13", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/6-14", "vlan_id": 6, "port_id": "14", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/6-15", "vlan_id": 6, "port_id": "15", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/6-16", "vlan_id": 6, "port_id": "16", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/6-17", "vlan_id": 6, "port_id": "17", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/6-18", "vlan_id": 6, "port_id": "18", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/6-19", "vlan_id": 6, "port_id": "19", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/6-20", "vlan_id": 6, "port_id": "20", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/6-21", "vlan_id": 6, "port_id": "21", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/6-22", "vlan_id": 6, "port_id": "22", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/6-23", "vlan_id": 6, "port_id": "23", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/6-24", "vlan_id": 6, "port_id": "24", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/364-2", "vlan_id": 364, "port_id": "2", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/364-3", "vlan_id": 364, "port_id": "3", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/364-4", "vlan_id": 364, "port_id": "4", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/364-5", "vlan_id": 364, "port_id": "5", "port_mode": "POM_UNTAGGED" }, { "uri": "/vlans-ports/364-6", "vlan_id": 364, "port_id": "6", "port_mode": "POM_UNTAGGED" }] }] }
        );

        // return this.http.post(`${this.API}/switchConf`, data);
    }

    configureSwitch(data) {

        let create_vlan = {
            "service_id": "serv_5001",
            "switch_ip": "192.168.6.1",
            "switch_cred": { "userName": "admin", "password": "Admin123" },
            "config": {
                "vlan": { "vlan_id": 14, "name": "Test_vlan", "method": "create" }
            },

        }
        let delete_vlan = {
            "service_id": "serv_5001",
            "switch_ip": "192.168.6.1",
            "switch_cred": { "userName": "admin", "password": "Admin123" },
            "config": { "vlan": { "vlan_id": 14, "method": "delete" } }
        }

        let create_acl = {
            "service_id": "serv_5001",
            "switch_ip": "192.168.6.1",
            "switch_cred": { "userName": "admin", "password": "Admin123" },
            "config": { "acl": { "method": "create", "acl_name": "10008", "acl_type": "AT_EXTENDED_IPV4" } },

        }

        let delete_acl = {
            "service_id": "serv_5001",
            "switch_ip": "192.168.6.1",
            "switch_cred": { "userName": "admin", "password": "Admin123" },
            "config": { "acl": { "method": "delete", "acl_id": "10008~AT_EXTENDED_IPV4" } },

        }


        return this.http.post(`${this.API}/switchConf`, data);
        // https://192.168.6.2:12311/switchConf



    }

    bare_metal_inv(data) {
        return this.http.post(`${this.API}/baremetalInventory`, data);
    }


    // toastr things 
    successToast(message: string, title?: string) {
        this.toastr.success(message, title);
    }

    infoToast(message: string, title?: string) {
        this.toastr.info(message, title);
    }

    errorToast(message: string, title?: string) {
        this.toastr.error(message, title);
    }


    removeLoaderFrmHttp() {
        // setTimeout(() => {
        //     this.loader.hide();
        //     this.api.successToast("Updated successfully.");
        //     this.back();
        //   }, 4000);
    }





}
