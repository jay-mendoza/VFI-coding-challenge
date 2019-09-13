import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashComponent } from './components/splash/splash.component';
import { AuthenticationGuard } from './backend/authentication.guard';
import { AuthenticationService } from './backend/authentication.service';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { SignoutComponent } from './components/authentication/signout/signout.component';
import { ChangePasswordComponent } from './components/authentication/change-password/change-password.component';
import { ArticleComponent } from './components/annotation/article/article.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserMenuComponent,
    SplashComponent,
    SigninComponent,
    SignupComponent,
    SignoutComponent,
    ChangePasswordComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [AuthenticationGuard, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
