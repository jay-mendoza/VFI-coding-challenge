import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatChipsModule,
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
import { AnnotationComponent } from './components/annotation/annotation/annotation.component';
import { ResetArticlesComponent } from './components/resets/reset-articles.component';
import { ResetUsersComponent } from './components/resets/reset-users.component';

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
        AnnotationComponent,
        AnnotationComponent,
        ResetArticlesComponent,
        ResetUsersComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule
    ],
    entryComponents: [AnnotationComponent],
    providers: [AuthenticationGuard, AuthenticationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
