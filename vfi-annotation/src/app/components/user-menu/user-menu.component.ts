import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.less']
})

/** 
 * User Menu Component for displaying the user menu (in header).
 */
export class UserMenuComponent implements OnInit {

    /** {@inheritDoc AppComponent.currentUsername} */
    @Input() currentUsername: string;

    /** {@inheritDoc AppComponent.isAuthenticated} */
    @Input() isAuthenticated: boolean;

    /**
     * Initializes a new instance of UserMenuComponent component.
     */
    constructor() { }

    /**
     * OnInit life cycle hook. Called after constructor and the first OnChanges hook.
     */
    ngOnInit() {
    }
}
