import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-splash',
    templateUrl: './splash.component.html',
    styleUrls: ['./splash.component.less']
})

/** 
 * SplashComponent for displaying the main home page (not authenticated).
 */
export class SplashComponent implements OnInit {

    /**
     * Initializes a new instance of SplashComponent component.
     */
    constructor() { }

    /**
     * OnInit life cycle hook. Called after constructor and the first OnChanges hook.
     */
    ngOnInit() {
    }

}
