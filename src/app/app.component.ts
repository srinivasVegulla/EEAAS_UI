import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  bal: boolean = false;
  constructor(private auth: AuthService) {
    //   localStorage.clear();
   /*  $(function () {
      $('[data-toggle="popover"]').popover()
    }) */
  }

}
