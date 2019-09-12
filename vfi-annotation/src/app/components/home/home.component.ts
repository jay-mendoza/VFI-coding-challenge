import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../backend/users.service';
import { AuthenticationService } from '../../backend/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthenticationService,
    private userDB: UsersService) { }

  ngOnInit() {
    //this.userDB.resetDatabase();
  }



}
