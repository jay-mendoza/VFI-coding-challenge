import { Component } from '@angular/core';
import { AuthenticationService } from './backend/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title: string = 'VFI Annotation App';
  currentYear: number;

  currentUsername: string;
  isAuthenticated: boolean;

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    this.currentYear = (new Date()).getFullYear();
    this.checkUser();
  }

  checkUser(): void {
    this.currentUsername = this.auth.retrieveUsername();
    this.isAuthenticated = this.currentUsername !== null;
  }

}
