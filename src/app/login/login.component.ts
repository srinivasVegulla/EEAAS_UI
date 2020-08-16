import { Component, OnInit, Output, HostListener, EventEmitter, Directive } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  usernameFormControl = new FormControl('', [
    Validators.required, Validators.pattern(/^\S*$/)
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  login() {
    var userData = { "user_id": this.usernameFormControl.value, "password": this.passwordFormControl.value };

    this.auth.login(userData);
    //sudo rm -rf /home/tcs/Downloads/bareMetal
    //cp -R /home/tcs/Downloads/EEAAS_UI/*  /home/tcs/Downloads/bareMetal/
    // cp -R  source destination

    // ng serve --host 10.138.77.70 --port 2020 --poll 2000

    // console.log(this.usernameFormControl.value);   sam/tcs123  pm
    // if(this.usernameFormControl.value=="admin"){      http://10.138.77.70:12399/access
    //   this.router.navigate(['./AdminDashboard']);    Jason/tcs123 admin  Alice/tcs123  lm
    // }
    // if(this.usernameFormControl.value=="pm"){
    //   this.router.navigate(['./dashboard']);
    // }
  }
  matcher = new MyErrorStateMatcher();
  // loginSubmit = ()=>window.location.pathname="https://www.google.com";
  constructor(private router: Router, private auth: AuthService, public webService: WebService) {

  }

  ngOnInit() {
    this.webService.selectedProject = null;
    //    this.webService.selectedUserList = null;
    this.webService.lineManger = null;
    this.webService.admin = null;

    this.webService.todayDate = null;
    this.webService.lastDate = null;
    this.webService.todayDateReservation = null;
    this.webService.lastDateReservation = null;

  }

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Directive({ selector: '[capsLock]' })
export class TrackCapsDirective {
  @Output('capsLock') capsLock = new EventEmitter<Boolean>();

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.capsLock.emit(event.getModifierState && event.getModifierState('CapsLock'));
  }
  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    this.capsLock.emit(event.getModifierState && event.getModifierState('CapsLock'));
  }

}