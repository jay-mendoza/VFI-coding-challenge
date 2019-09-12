import { Injectable } from '@angular/core';
import {
    CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot,
    CanActivateChild, CanLoad, Route
} from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root', })
/**
 * Authentication Guard class used in authenticated routing.
 * @privateRemarks I copied most (but not all) of this from Angular documentation.
 */
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {
    
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.authenticationService.isSignedIn()) { return true; }
        this.authenticationService.redirectUrl = url;
        this.router.navigate(['']);
        return false;
    }
}