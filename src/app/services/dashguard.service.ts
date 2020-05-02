import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class Dashguard implements CanActivate {

    constructor(private router: Router, private auth: AuthService) {}

    canActivate() {
        console.log(this.auth.isAuthenticated)
            // Check to see if a user has a valid token
             if (this.auth.isAuthenticated) {
            // If they do, return true and allow the user to load app
           
            // if(this.auth.role=="PM"){
            //         console.log("PM")
            //     this.router.navigate(['/dashboard']);
            //     return true;
            //     }
            //  else if(this.auth.role=="Admin"){
            //     this.router.navigate(['/AdminDashboard']);
            //     return true;
            //  }
            //  else if(this.auth.role=="Tester"){
            //     this.router.navigate(['/TesterDashboard']);
            //     return true;
            //  }
            //  else if(this.auth.role=="Developer"){
            //     this.router.navigate(['/Developer']);
            //     return true;
            //  }
            //  else{
            //     this.router.navigate(['/']);
                return true;
          //   }


        }

        // If not, they redirect them to the login page
        this.router.navigate(['/']);
        return true;
    }
}
