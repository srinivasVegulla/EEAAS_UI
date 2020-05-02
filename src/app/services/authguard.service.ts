import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class Authguard implements CanActivate {

    constructor(private router: Router, private auth: AuthService) {}

    canActivate() {
        console.log(this.auth.isAuthenticated)
            // Check to see if a user has a valid token
             if (!this.auth.isAuthenticated) {
            // If they do, return true and allow the user to load app
            return true;
        }

        // If not, they redirect them to the login page
        this.router.navigate(['/login']);
        return false;
    }
}
