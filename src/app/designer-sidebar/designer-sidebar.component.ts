import { Component, OnInit } from '@angular/core'
import { WebService } from '../services/web.service'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-designer-sidebar',
  templateUrl: './designer-sidebar.component.html',
  styleUrls: ['./designer-sidebar.component.scss']
})
export class DesignerSidebarComponent implements OnInit {

  show=false;
  constructor(public router:Router, private webService : WebService, private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit() {
  }

}
