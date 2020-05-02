import {
	AfterViewInit,
	Component,
	NgZone,
	OnInit,
	Version,Inject
} from '@angular/core';
declare var $: any;
import {
	jsPlumb
} from 'jsplumb';
import {
	AuthService
} from '../services/auth.service';
import {
	WebService
} from '../services/web.service';
import {MatDialogModule,MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

import {ChangeDetectorRef} from '@angular/core'

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.css']
})

export class TestComponent implements AfterViewInit {
	jsPlumbInstance;
	constructor(private webService: WebService,public dialogRefS: MatDialogRef<testSuccessPopup>,public dialog: MatDialog) {
 
	}
	ngAfterViewInit() {

	}
	public stat: boolean = false;
	public spin: boolean = false;

	firstInstance = jsPlumb.getInstance();
	//compName: string;
	versions = [{
			value: 'Version 1.2.0'
		},
		{
			value: 'Version 1.2.7'
		},
		{
			value: 'Version 1.3.6'
		}
	];
	
	templates = [{
			value: 'IMS-mini'
		},
		{
			value: 'IMS-medium'
		},
		{
			value: 'IMS-large'
		},
		{
			value: 'IMS-xlarge'
		}
	];

	images = [{
			name: 'IMS',
			source: './assets/testerImages/IMS.jpg',
			type: 'vnf',
			modal: 'common',
			target: 'vIMS'
		},
		{
			name: 'Router',
			source: './assets/testerImages/router.jpg',
			type: 'vnf',
			modal: 'common',
			target: 'vRouter'
		},
		{
			name: 'VYOS',
			source: './assets/testerImages/sd2.jpg',
			type: 'vnf',
			modal: 'common'
		},
		{
			name: 'EPC',
			source: './assets/testerImages/epc3.jpg',
			type: 'vnf',
			modal: 'common',
			target: 'vEPC'
		},
		{
			name: 'Firewall',
			source: './assets/testerImages/firewall.jpg',
			type: 'vnf',
			modal: 'common',
			target: 'vFirewall'
		},
		{
			name: 'CDN',
			source: './assets/testerImages/sdn3.jpg',
			type: 'vnf',
			modal: 'common'
		},
		{
			name: 'SDN',
			source: './assets/testerImages/Sdn1.jpg',
			type: 'vnf',
			modal: 'common'
		},
		{
			name: 'Singlenode',
			source: './assets/testerImages/op3.jpg',
			type: 'openstack',
			modal: 'openstack',
			target: 'singlenode'
		},
		{
			name: 'Multi node',
			source: './assets/testerImages/op2.png',
			type: 'openstack',
			modal: 'openstack',
			target: 'multinode'
		},
		{
			name: 'Ubuntu',
			source: './assets/testerImages/ubuntu1.jpg',
			type: 'linux',
			modal: '#'
		},
		{
			name: 'Fedora',
			source: './assets/testerImages/fedora1.jpg',
			type: 'linux',
			modal: 'linux'
		},
		{
			name: 'CentOS',
			source: './assets/testerImages/centos1.jpg',
			type: 'linux',
			modal: 'linux'
		},
		{
			name: 'Enodeb',
			source: './assets/testerImages/enb1.jpg',
			type: 'vnf',
			modal: 'common'
		},
		{
			name: 'vyosrouter',
			source: './assets/testerImages/vyos1.jpg',
			type: 'vnf',
			modal: 'common'
		},
		{
			name: 'mme',
			source: './assets/testerImages/mme1.jpg',
			type: 'vnf',
			modal: 'common'
		}
	];

	//components: any = []

	connections: any = []
	//panelOpenStateTwo: boolean = this.webService.panelOpenStateTwo;
	//panelOpenStateThree: boolean = false;

	successMsg(){
		let dialogRefS = this.dialog.open(testSuccessPopup, {
			height: '185px',
			width: '400px'
			})
	}

	onCollapseTwo() {

		this.jsPlumbInstance.reset();
		this.webService.panelOpenStateTwo = false
	}
	onCollapseThree() {
		this.webService.panelOpenStateThree = false
	}
	onExpandTwo() {
		this.showConnectOnClick(this.webService.compName)
	}
	reserveFunc() {
		this.webService.panelOpenStateThree = true
	}
	topologyInfo: any
	showConnectOnClick(name) {
	//	alert("another comp")
		//alert(this.panelOpenStateTwo)
		//console.log(this.panelOpenStateTwo)
		this.jsPlumbInstance = jsPlumb.getInstance();
		console.log(name)
		this.webService.compName = name
		var data = {
			"component_name": name
		}
		//this.panelOpenStateTwo = true
		this.webService.panelOpenStateTwo = true
		this.webService.getTopologyData(data).
		subscribe(res => {
			this.topologyInfo = res

			var data1 = JSON.parse(this.topologyInfo.component["connections"])
//this.components = data1["blocks"]
this.webService.components = data1["blocks"]
//console.log(this.webService.components)
// this.ref.reattach();
// this.ref.detectChanges();
// this.ref.markForCheck();

console.log("everything ran");

			this.connections = data1["links"]
console.log(this.connections)
			for (var i = 0; i < this.connections.length; i++) {

				this.jsPlumbInstance.connect({
					connector: ['Flowchart'],
					source: this.connections[i].pageSourceId,
					target: this.connections[i].pageTargetId,
					anchor: ['Right', 'Left'],
					cssClass: "redLine",
					endpoint: ["Dot", {
						radius: 0.2
					}],
					overlays: [
						["Arrow", {
							location: 0.67,
							id: "arrow",
							length: 14,
							foldback: 0.8
						}]
					]
				});

			}
		})
	}

	vmInfoFunc(name) {

		var data4 = {
			"name": name
		}
		var status
		this.webService.getvmInfo(data4).
		subscribe(res => {

			status = res["server"]["status"]
			if (status != "ACTIVE") {
				setTimeout(() => {
					this.vmInfoFunc(name)
				}, 3000);
			} else {
				//$.each(this.components, function (index, elem) {
					$.each(this.webService.components, function (index, elem) {
						
					//	alert(this.count)
					
					var id = elem.blockId + "_" + elem.title;

					if (elem.title == name) {

						var ip = [];
						for (var key in res["server"].addresses) {

							ip.push(res["server"].addresses[key][0]["addr"]);
						}
						console.log(status)
						console.log(ip)
						console.log(id)
						console.log(elem.blockId)
						$("#" + id).text(status);
						$("#" + elem.blockId + "_ip").text(ip);
					}
				});

				this.spin = false
				this.stat = true
			}
		})
	}

	response1: object
	response2: object

	reserve(coname, startDate, endDate) {
		this.webService.panelOpenStateTwo = true

		this.spin = true
		var data1 = {
			"component_name": this.webService.compName,
			"env_type": "standard",
			"task": "request",
			"stack_name": coname,
			"start_date": startDate,
			"end_date": endDate,
			"user_name": "Tester",
			"requested_date": new Date()
		}


		this.webService.getCreateReservation(data1).
		subscribe(res => {

			this.response1 = res
			var data2 = {
				"name": this.webService.compName,
				"stack_name": coname,
				"env_type": "standard",
				"start_date": startDate,
				"end_date": endDate,
				"request_id": this.response1["request_id"]
			}

			this.webService.getDeploy(data2).
			subscribe(res => {

				this.response2 = res
				var data3 = {
					"request_id": this.response1["request_id"],
					"status": "Deployed",
					"pending_at": "---"
				}

				this.webService.getReservation(data3).
				subscribe(res => {

					this.response2["stack"].forEach((value) => {
						if (typeof (value) == "object") {
							var key = Object.keys(value);
							$("#" + key).text(value[key[0]]);
						} else {
							this.vmInfoFunc(value)
						}

					})
				})
			})
		});


	}


}


@Component({
	selector: 'testSuccessPopup',
	template: ` 
	<div class="panel panel-default" style="border-bottom-width: 0px;">
	<div class="panel-heading"><h4 class="text-left">Success</h4></div>
	<div class="panel-body">
	<div class="form-group">
	<p>Topology has been reserved</p>
	</div>
  
	
	</div>
	<button mat-raised-button color="primary" style="    float: right;
	margin: 10px;
	background: green;" (click)="successClose()">Ok</button>
	</div> 
	`,
	styles:[`
	.panel-default>.panel-heading {
	
	  background-color: white;
	
  }
  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
	color: black;
  }
  ::-moz-placeholder { /* Firefox 19+ */
	color: black;
  }`]
  
  })
  export class testSuccessPopup {
	
	constructor(private dialogRefS: MatDialogRef<testSuccessPopup>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthService,private webService :WebService){
	  
	
	}
	successClose(){
		this.dialogRefS.close()	
	}
  
	ngOnInit(){
	  
	}
	
  }
  
