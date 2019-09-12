import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../backend/authentication.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.less']
})

/** 
 * Sign In Component for displaying a sign in form.
 */
export class SigninComponent implements OnInit {
    
    /** UI component state. Shows or hides the text in password field. */
    hide: boolean = true;
    
    /** UI component to display error message. */
    error: string;

    /**
     * Initializes a new instance of SigninComponent component.
     * @param {AuthenticationService} authService Injects AuthenticationService instance for authentication functions.
     */
    constructor(private authService: AuthenticationService) { }

    /**
     * OnInit life cycle hook. Called after constructor and the first OnChanges hook.
     */
    ngOnInit() {
        this.error = '';
    }

    /**
     * Execute a sign in process.
     * @param username User's username.
     * @param password User's password.
     */
    doSignIn(username: string, password: string): void {
        if (this.authService.signIn(username, password)) {

            /** redirect to Home, which needs authenticated session. */
            window.location.href = '/home';
        }
        else {
            this.error = 'The entered credentials are incorrect!';
        }
    }
}
