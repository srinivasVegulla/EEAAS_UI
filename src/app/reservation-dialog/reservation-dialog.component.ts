import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css']
})
export class ReservationDialogComponent implements OnInit {

  Software_Load:any=['Nginx-1.8.0','Nginx-1.10.0','Nginx-1.12.0'];
  Scenarios:any=['SFC', 'IPERF'];
  constructor(public thisDialogRef: MatDialogRef<ReservationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string, private auth: AuthService, private webService: WebService) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}
