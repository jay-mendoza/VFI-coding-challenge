import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../backend/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  hideB: boolean = true;
  error: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.error = '';
  }

  doRegister(username: string, password: string, confirm: string) {
    this.error = '';

    if (!username) {
      this.error += 'Username cannot be blank. ';
      return;
    }
    if (!password) {
      this.error += 'Password cannot be blank. ';
      return;
    }
    if (password !== confirm) {
      this.error += 'Passwords are not the same. ';
      return;
    }

    if (this.authService.register(username, password)) {
      window.location.href = '/signin';
    }
    else {
      this.error = 'User already exists!';
    }
  }

}
