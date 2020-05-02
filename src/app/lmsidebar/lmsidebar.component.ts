import { Component, OnInit } from '@angular/core'
import { WebService } from '../services/web.service'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lmsidebar',
  templateUrl: './lmsidebar.component.html',
  styleUrls: ['./lmsidebar.component.scss']
})


export class LmsidebarComponent implements OnInit {
  show=false;
    constructor(public router:Router, private webService : WebService, private route: ActivatedRoute, private auth: AuthService) {}

    ngOnInit(){
       
        // $('#sidebarCollapse').hide();
    }
}
