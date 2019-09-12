import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../backend/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {
  hide: boolean = true;
  hideB: boolean = true;
  hideC: boolean = true;
  error: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.error = '';
  }

  doChangePassword(oldPassword: string, newPassword: string, confirm: string) {

    if (newPassword !== confirm) {
      this.error += 'New passwords are not the same. ';
      return;
    }

    if (this.authService.changePassword(oldPassword, newPassword)) {
      this.authService.signOut();
      window.location.href = '/signin';
    }
    else {
      this.error = 'Current password is incorrect.';
    }
  }

}
