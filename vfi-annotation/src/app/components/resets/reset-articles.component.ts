import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../backend/authentication.service';
import { ArticleService } from '../../backend/article.service';

@Component({
    selector: '',
    template: ''
})

/** 
 * Resets the Articles database from localStorage.
 */
export class ResetArticlesComponent implements OnInit {

    /**
     * Initializes a new instance of ResetArticlesComponent component.
     * @param {ArticlesService} v Injects ArticlesService instance for Articles function.
     * @param {AuthenticationService} authService Injects AuthenticationService instance for authentication functions.
     */
    constructor(private articleService: ArticleService, private authService: AuthenticationService) { }

    /**
     * OnInit life cycle hook. Called after constructor and the first OnChanges hook.
     */
    ngOnInit() {
        this.articleService.resetDatabase();
        this.authService.signOut();
        window.location.href = '/';

    }
}
