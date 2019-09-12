import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../backend/authentication.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.less']
})

/** 
 * Change Password Component for displaying a change password form.
 */
export class ChangePasswordComponent implements OnInit {

    /** UI component state. Shows or hides the text in current password field. */
    hideCurrent: boolean = true;

    /** UI component state. Shows or hides the text in new password field. */
    hideNew: boolean = true;

    /** UI component state. Shows or hides the text in confirm password field. */
    hideConfirm: boolean = true;

    /** UI component to display error message. */
    error: string;

    /**
     * Initializes a new instance of ChangePasswordComponent component.
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
     * Execute a change password process.
     * @param {string} oldPassword User's old password.
     * @param {string} newPassword User's new passord.
     * @param {string} confirm User's new password for confirmation.
     */
    doChangePassword(oldPassword: string, newPassword: string, confirm: string): void {
        if (newPassword !== confirm) {
            this.error = 'New passwords are not the same.';
            return;
        }

        /** User gets signed out, to sign in with the new password. */
        if (this.authService.changePassword(oldPassword, newPassword)) {
            this.authService.signOut();
            window.location.href = '/signin';
        }
        else {
            this.error = 'Current password is incorrect.';
        }
    }
}
