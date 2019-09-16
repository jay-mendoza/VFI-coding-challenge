import { Component } from '@angular/core';
import { AuthenticationService } from './backend/authentication.service';
import { UsersService } from './backend/users.service';
import { ArticleService } from './backend/article.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})

/** 
 * App Component for the main page app.
 */
export class AppComponent {

    /** UI component: App's title for display in header. */
    title: string = 'VFI Annotation App';

    /** UI component: Current year for Copyright info for display in footer. */
    currentYear: number;

    /** The current user signed in. To be passed to the UserMenu Component. */
    currentUsername: string;

    /** Checks if user is authenticated. To be passed to the UserMenu Component. */
    isAuthenticated: boolean;

    /**
     * Initializes a new instance of AppComponent component.
     * @param {AuthenticationService} authService Injects AuthenticationService instance for authentication functions.
     * @param {UsersService} userService Injects UsersService for initialization of database.
     * @param {ArticleService} articleService Injects ArticleService for initialization of database.
     */
    constructor(private authService: AuthenticationService,
        private userService: UsersService,
        private articleService: ArticleService) { }

    /**
     * OnInit life cycle hook. Called after constructor and the first OnChanges hook.
     */
    ngOnInit() {
        this.userService.initializeDatabase();
        this.articleService.initializeDatabase();       

        this.currentYear = (new Date()).getFullYear();
        this.checkUser();

    }

    /**
     * Checks the current user and authetication state.
     */
    checkUser(): void {
        this.currentUsername = this.authService.retrieveUsername();
        this.isAuthenticated = this.authService.isSignedIn();
    }
}
