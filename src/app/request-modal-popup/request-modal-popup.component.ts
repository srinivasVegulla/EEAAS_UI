import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-request-modal-popup',
  templateUrl: './request-modal-popup.component.html',
  styleUrls: ['./request-modal-popup.component.scss']
})
export class RequestModalPopupComponent implements OnInit {

  @Output() requestModalDialogClose = new EventEmitter();
  // @Output() shouldDelete = new EventEmitter();

  @Input() inputData;
  @Input() type;

  reasonForm;

  objectName;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.setFormValues();
  }

  closeModal(value) {
    let obj = {
      'proceed': value,
      'formObj': this.reasonForm.value
    }
    this.requestModalDialogClose.emit(obj);
  }

  setFormValues() {
    this.reasonForm = this.fb.group({
      reason: ['', Validators.required],
    });
  }

  get reason() {
    return this.reasonForm.get('reason');
  }

}
