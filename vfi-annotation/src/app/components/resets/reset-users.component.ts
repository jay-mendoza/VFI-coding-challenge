import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../backend/authentication.service';
import { UsersService } from '../../backend/users.service';

@Component({
    selector: '',
    template: ''
})

/** 
 * Resets the Users database from localStorage.
 */
export class ResetUsersComponent implements OnInit {

    /**
     * Initializes a new instance of ResetUsersComponent component.
     * @param {UsersService} usersService Injects UsersService instance for Users function.
     * @param {AuthenticationService} authService Injects AuthenticationService instance for authentication functions.
     */
    constructor(private usersService: UsersService, private authService: AuthenticationService) { }

    /**
     * OnInit life cycle hook. Called after constructor and the first OnChanges hook.
     */
    ngOnInit() {
        this.usersService.resetDatabase();
        this.authService.signOut();
        window.location.href = '/';
    }
}
