import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { UsersModel } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly usersDB: string = 'usersDB_LocalStorage_Key';
  
  /** Password is 'password' */
  private readonly usersDBDefault = {
    "users" : [
      {
        "username": "admin",
        "password": "a6818b8188b36c44d17784c5551f63accc5deaf8786f9d0ad1ae3cd8d887cbab4f777286dbb315fb14854c8774dc0d10b5567e4a705536cc2a1d61ec0a16a7a6"
      }
    ]};

  constructor() { }

  private readUsers(): UsersModel {
    return JSON.parse(localStorage.getItem(this.usersDB));
  }

  private readUser(username: string): UserModel {    
    return this.readUsers().users.find((x:UserModel) => x.username == username);
  }  

  /**
   * Check if a user's password is correct or not.
   * @param username Username of the user.
   * @param password Hashed password of the user.
   */
  public isPasswordCorrect(username: string, password: string): boolean {
    var users = this.readUsers().users.find((x:UserModel) => x.username == username);
    
    if (users == null) {
      return false;
    }
    return users.password === password;
  }

  /**
   * Change password of a user.
   * @param username Username of the user to change the password of.
   * @param oldPassword Hashed old password.
   * @param newPassword Hashed new password.
   * @returns True is successful, otherwise, false.
   */
  public changePassword(username: string, oldPassword: string, newPassword: string): boolean {
    if (this.isPasswordCorrect(username, oldPassword)) {
      var users: UsersModel = this.readUsers();
      users.users.find((x:UserModel) => x.username == username).password = newPassword;
      this.resetDatabase(users);
      return true;
    }

    return false;
  }

  /**
   * Create a new User.
   * @param username Username of the user to add.
   * @param password Hashed password.
   * @returns True if successful, otherwise, false (user exists).
   */
  public createNewUser(username: string, password: string): boolean {
    if (localStorage.getItem(this.usersDB) === null) {
      this.initializeDatabase();
    }

    if (this.readUser(username) != null) {
      return false;
    }

    var userModel: UserModel = { username: username, password: password };
    var users: UsersModel = this.readUsers();
    users.users.push(userModel);
    this.resetDatabase(users);

    return true;
  }

  /**
   * Remove a user.
   * @param username Username of the user to remove
   */
  public deleteUser(username: string): boolean {
    if (localStorage.getItem(this.usersDB) === null || this.readUser(username) != null) {
      return false;
    }

    var users: UsersModel = this.readUsers();
    users.users = users.users.filter((x:UserModel) => x.username != username);
    this.resetDatabase(users);

    return true;
  }

  /**
   * Reset the users DB local storage.
   * @param usersModel Optional. If not supplied, uses default values.
   */
  public resetDatabase(usersModel?: UsersModel): void {
    localStorage.removeItem(this.usersDB);
    if (usersModel == undefined || usersModel == null) {
      localStorage.setItem(this.usersDB, JSON.stringify(this.usersDBDefault));
    }
    else {
      localStorage.setItem(this.usersDB, JSON.stringify(usersModel));
    }
  }

  /**
   * Initializes the users DB.
   * @returns True is successful. Otherwise, false (DB already exists).
   */
  public initializeDatabase(): boolean {
    if (localStorage.getItem(this.usersDB) === null) {
      localStorage.setItem(this.usersDB, JSON.stringify(this.usersDBDefault));
      return true;
    }

    return false;
  }


}
