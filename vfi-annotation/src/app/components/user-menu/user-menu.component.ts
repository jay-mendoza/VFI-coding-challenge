import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../backend/authentication.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.less']
})
export class UserMenuComponent implements OnInit {
  @Input () currentUsername: string;
  @Input () isAuthenticated: boolean;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

}
