import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 


import {
  MatButtonModule,
  MatDialogModule,
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
import { SafeHtmlPipe } from './shared/safe-html.pipe';
import { AnnotateDirective } from './shared/annotate.directive';
import { ContextMenuComponent } from './components/annotation/context-menu/context-menu.component';
import { AnnotationComponent } from './components/annotation/annotation/annotation.component';

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
    ArticleComponent,
    SafeHtmlPipe,
    AnnotateDirective,
    ContextMenuComponent,
    AnnotationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule
  ],
  entryComponents: [ContextMenuComponent],
  providers: [AuthenticationGuard, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
