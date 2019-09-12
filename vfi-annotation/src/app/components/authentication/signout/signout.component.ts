import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../backend/authentication.service'

@Component({
    selector: 'app-signout',
    templateUrl: './signout.component.html',
    styleUrls: ['./signout.component.less']
})

/** 
 * Sign Out Component for displaying a sign out message view.
 */
export class SignoutComponent implements OnInit {

    /**
     * Initializes a new instance of SignoutComponent component.
     * @param {AuthenticationService} authService Injects AuthenticationService instance for authentication functions.
     */
    constructor(private authService: AuthenticationService) { }

    /**
     * OnInit life cycle hook. Called after constructor and the first OnChanges hook.
     */
    ngOnInit() {
        this.authService.signOut();

        /** Redirect user to home page after 2 seconds. */
        setTimeout(() => { window.location.href = '/'; }, 2000);
    }
}
