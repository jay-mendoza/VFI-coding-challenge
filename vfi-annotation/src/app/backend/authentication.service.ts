import { Injectable } from '@angular/core';

import { UsersService } from './users.service';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly currentUser: string = 'currentUser_LocalStorage_Key';
  private readonly randomKey: string = '-ew^b%qtWJ69HA[';

  redirectUrl: string;

  constructor(private cryptoService: CryptoService, private usersService: UsersService) { }

  public signIn(username: string, password: string): boolean {
    if (this.usersService.isPasswordCorrect(username, this.cryptoService.hash(password))) {
      sessionStorage.setItem(this.currentUser, this.cryptoService.encrypt(username, this.randomKey));
      // Set the Session to SIGNED IN.
      return true;
    }

    return false;

  }  

  public signOut(): void {
    sessionStorage.removeItem(this.currentUser);
  }

  public retrieveUsername(): string {
    var userSession: string = sessionStorage.getItem(this.currentUser);
    return userSession == null ? null : this.cryptoService.decrypt(userSession, this.randomKey);
  }

  public register(username: string, password: string): boolean {
    return (this.usersService.createNewUser(username, this.cryptoService.hash(password)));
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return (this.usersService.changePassword(this.retrieveUsername(), this.cryptoService.hash(oldPassword), this.cryptoService.hash(newPassword)));
  }

  isSignedIn(): boolean {
    return sessionStorage.getItem(this.currentUser) != null;
  }


}
