import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-is-delete-modal-popup',
  templateUrl: './is-delete-modal-popup.component.html',
  styleUrls: ['./is-delete-modal-popup.component.scss']
})
export class IsDeleteModalPopupComponent implements OnInit {

  @Output() modalDialogClose = new EventEmitter();
  // @Output() shouldDelete = new EventEmitter();

  @Input() inputData;
  @Input() type;

  objectName;

  constructor() { }

  ngOnInit() {
    if (this.type == 'Device') {
      this.objectName = this.inputData['asset_name'];
    } else if (this.type == 'User') {
      this.objectName = this.inputData['user_name'];
    } else if (this.type == 'Request') {
      this.objectName = this.inputData;
    }
  }

  closeModal(isDelete) {
    let obj = {
      'isDelete': isDelete,
      'data': this.inputData
    }
    this.modalDialogClose.emit(obj);
  }
}
