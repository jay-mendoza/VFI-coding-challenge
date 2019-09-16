import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SplashComponent } from './components/splash/splash.component';

import { ChangePasswordComponent } from './components/authentication/change-password/change-password.component';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { SignoutComponent } from './components/authentication/signout/signout.component';
import { ResetUsersComponent } from './components/resets/reset-users.component';
import { ResetArticlesComponent } from './components/resets/reset-articles.component';

import { AuthenticationGuard } from './backend/authentication.guard';

const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'changepassword', component: ChangePasswordComponent, canActivate: [AuthenticationGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signout', component: SignoutComponent },
  { path: 'signout', component: SignoutComponent },
  { path: 'resetusers', component: ResetUsersComponent },
  { path: 'resetarticles', component: ResetArticlesComponent },
  { path: 'home',  component: HomeComponent, canActivate: [AuthenticationGuard] }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
