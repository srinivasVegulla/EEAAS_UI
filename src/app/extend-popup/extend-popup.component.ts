import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DatePipe } from '@angular/common';
@Component({
  selector: 'app-extend-popup',
  templateUrl: './extend-popup.component.html',
  styleUrls: ['./extend-popup.component.css']
})
export class ExtendPopupComponent implements OnInit {

  requestId;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private auth: AuthService, private webService: WebService, private DatePipe:DatePipe) { 
    console.log(data)
    this.requestId=data;
  }

  confirmExtend(){
    console.log("xc")
    
    let enDate = new Date(this.webService.extendDate);
    enDate.setHours(this.webService.extendTimeReservation.split(':')[0])
    enDate.setMinutes(this.webService.extendTimeReservation.split(':')[1])
    let dateVal=this.DatePipe.transform(enDate, 'MM/dd/yyyy HH:mm:ss')
    var reqData = { "request_id": this.requestId, "action": "extend", "end_date": dateVal };
    console.log(reqData)

    var reqDataJSON = JSON.stringify(reqData);
    this.webService.RequestData(reqDataJSON).subscribe(res => {
      var response: any = res
      console.log(response)
      // let dialogRef = this.dialog.open(orderPopup, {
      //   height: '450px',
      //   width: '700px',
      //   data: response.request
      // })
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed1');
      //   this.requestListData()
      // })
    })

  }
  ngOnInit() {
  }

}
