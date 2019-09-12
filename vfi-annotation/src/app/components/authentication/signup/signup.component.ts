import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../backend/authentication.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.less']
})

/** 
 * Sign Up Component for displaying a sign up form.
 */
export class SignupComponent implements OnInit {

    /** UI component state. Shows or hides the text in password field. */
    hide: boolean = true;

    /** UI component state. Shows or hides the text in confirm password field. */
    hideConfirm: boolean = true;

    /** UI component to display error message. */
    error: string;

    /**
     * Initializes a new instance of SignupComponent component.
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
     * Execute a register (sign up) process.
     * @param {string} username User's username.
     * @param {string} password User's password.
     * @param {string} confirm User's password for confirmation.
     */
    doRegister(username: string, password: string, confirm: string) {
        this.error = '';

        if (!username) {
            this.error += 'Username cannot be blank. ';
            return;
        }
        if (!password) {
            this.error += 'Password cannot be blank. ';
            return;
        }
        if (password !== confirm) {
            this.error += 'Passwords are not the same. ';
            return;
        }

        if (this.authService.register(username, password)) {
            window.location.href = '/signin';
        }
        else {
            this.error = 'User already exists!';
        }
    }
}
