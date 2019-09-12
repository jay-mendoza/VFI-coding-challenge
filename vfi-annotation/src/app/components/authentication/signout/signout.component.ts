import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../backend/authentication.service'

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.less']
})
export class SignoutComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {    
    this.authService.signOut();
    setTimeout(() => { window.location.href = '/';}, 2000);
  }

}
