import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { CryptoService } from './crypto.service';

@Injectable({ providedIn: 'root' })
/**
 * Authentication Service class used for client auth functions.
 */
export class AuthenticationService {

    /** The sessionStorage key for the current user*/
    private readonly currentUser: string = 'currentUser_LocalStorage_Key';

    /** A random encryption key for storing user in session. */
    private readonly randomKey: string = '-ew^b%qtWJ69HA[';

    redirectUrl: string;

    /**
     * Initializes a new instance of AuthenticationService class.
     * @param {CryptoService} cryptoService Inject CryptoService instance for cryptography functions.
     * @param {UsersService} usersService Inject UsersService instance for Users DB management functions.
     */
    constructor(private cryptoService: CryptoService, private usersService: UsersService) { }

    /**
     * Function to try signing in a specific user.
     * @param {string} username Username of the user trying to sign in.
     * @param {string} password Password of the user trying to sign in.
     * @returns Boolean value for sign in success state (true = sucess; false = fail).
     */
    public signIn(username: string, password: string): boolean {
        if (this.usersService.isPasswordCorrect(username, this.cryptoService.hash(password))) {
            sessionStorage.setItem(this.currentUser, this.cryptoService.encrypt(username, this.randomKey));            
            return true;
        }
        return false;
    }

    /**
     * Function to sign out a user. This deletes user session in sessionStorage.
     */
    public signOut(): void {
        sessionStorage.removeItem(this.currentUser);
    }

    /**
     * Function to retrieve a decrypted username of the current User in sessionStorage.
     * @returns {string} Value of the decrypted username. Null if does not exist.
     */
    public retrieveUsername(): string {
        let userSession: string = sessionStorage.getItem(this.currentUser);
        return !userSession ? null : this.cryptoService.decrypt(userSession, this.randomKey);
    }

    /**
     * Function to register (sign up) a new User in the localStorage "database".
     * @param {string} username Username of the User trying to register an account (in localStorage).
     * @param {string} password Password of the User trying to register an account (in localStorage).
     * @returns {boolean} True if successful, otherwise, false (User already exists in DB).
     */
    public register(username: string, password: string): boolean {
        return (this.usersService.createNewUser(username, this.cryptoService.hash(password)));
    }

    /**
     * Function to change/update the password of a User.
     * @param {string} oldPassword The current password of the User trying to change password.
     * @param {string} newPassword The new password to replace the current (old) password.
     * @returns {boolean} True if successful, otherwise, false (old password incorrect).
     */
    public changePassword(oldPassword: string, newPassword: string): boolean {
        return (
            this.usersService.changePassword(
                this.retrieveUsername(),
                this.cryptoService.hash(oldPassword),
                this.cryptoService.hash(newPassword)));
    }


    /**
     * Checks to see if the User exists in sessionStorage AND Users localStorage database.
     * @returns {boolean} True if the above conditions are met, otherwise, false.
     */
    public isSignedIn(): boolean {
        let encrypedUser: string = sessionStorage.getItem(this.currentUser);
        if (!encrypedUser) {
            return false;
        }

        return this.isAuthenticated(this.cryptoService.decrypt(encrypedUser, this.randomKey));
    }

    /**
     * Checks to see if the User is in the localStorage Users database.
     * @param {string} username OPTIONAL. Decrypted username to authenticate. Gets current user if null.
     */
    private isAuthenticated(username?: string): boolean {
        if (!username) {
            username = this.cryptoService.decrypt(sessionStorage.getItem(this.currentUser), this.randomKey);
        }

        if (this.usersService.readUser(username)) {
            return true;
        }
        
        return false;
    }


}
