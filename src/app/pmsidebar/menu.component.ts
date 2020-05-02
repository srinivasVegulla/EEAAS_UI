import { Component, OnInit } from '@angular/core'
import { WebService } from '../services/web.service'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
    selector: 'menu',
    templateUrl:'./menu.component.html',
    styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
    show=false;
    constructor(public router:Router, private webService : WebService, private route: ActivatedRoute, private auth: AuthService) {}

    ngOnInit(){
       
        // $('#sidebarCollapse').hide();
    }
}