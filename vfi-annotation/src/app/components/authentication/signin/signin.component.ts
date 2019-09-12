import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../backend/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent implements OnInit {
  hide: boolean = true;
  error: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.error = '';
  }

  doSignIn(username: string, password: string) {
    if (this.authService.signIn(username, password)) {
      window.location.href = '/home';
    }
    else {
      this.error = 'The entered credentials are incorrect!';
    }
  }

}
