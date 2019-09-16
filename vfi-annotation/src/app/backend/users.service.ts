import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { UsersModel } from './users.model';

@Injectable({ providedIn: 'root' })
/**
 * Users Service class used in managing localStorage database.
 */
export class UsersService {

    /** The localStorage key for the Users database. */
    private readonly usersDB: string = 'usersDB_LocalStorage_Key';    

    /**
     * Initializes a new instance of UsersService class.
     */
    constructor() { }  
    
    /**
     * Retrieves all the Users from localStorage database.
     * @returns {UsersModel} The entire Users database from localStorage.
     */
    private readUsers(): UsersModel {
        return JSON.parse(localStorage.getItem(this.usersDB));
    }   

    /**
     * Retrieves a specific User from localStorage database.
     * @param {string} username Username of the User to retrieve.
     * @returns {UserModel} The User object.
     */
    public readUser(username: string): UserModel {
        return this.readUsers().users.find((x: UserModel) => x.username === username);
    }

    /**
     * Check if a User's password is correct or not.
     * @param {string} username Username of the User.
     * @param {string} password Hashed password of the User.
     * @returns {boolean} True if correct, otherwise, false (or when user does not exist).
     */
    public isPasswordCorrect(username: string, password: string): boolean {
        let user: UserModel = this.readUsers().users.find((x: UserModel) => x.username === username);

        if (!user) {
            return false;
         }

        return user.password === password;
    }

    /**
     * Change the password of a User in localStorage database.
     * @param {string} username Username of the User to change the password of.
     * @param {string} oldPassword Hashed current/old password of the User.
     * @param {string} newPassword Hashed new password of the User.
     * @returns {boolean} True is successful, otherwise, false.
     */
    public changePassword(username: string, oldPassword: string, newPassword: string): boolean {
        if (this.isPasswordCorrect(username, oldPassword)) {
            let users: UsersModel = this.readUsers();
            users.users.find((x: UserModel) => x.username === username).password = newPassword;
            this.resetDatabase(users);
            return true;
        }

        return false;
    }

    /**
     * Create a new User in localStorage database.
     * @param {string} username Username of the User to add.
     * @param {string} password Hashed password of the User to add.
     * @returns {boolean} True if successful, otherwise, false (user exists).
     */
    public createNewUser(username: string, password: string): boolean {
        if (this.readUser(username)) {
            return false;
        }

        if (!localStorage.getItem(this.usersDB)) {
            this.initializeDatabase();
        }

        let userModel: UserModel = { username: username, password: password };
        let users: UsersModel = this.readUsers();
        users.users.push(userModel);
        this.resetDatabase(users);

        return true;
    }

    /**
     * Remove a user from localStorage database.
     * @param {string} username Username of the user to remove from DB.
     */
    public deleteUser(username: string): boolean {
        if (localStorage.getItem(this.usersDB) === null || this.readUser(username) != null) {
            return false;
        }

        let users: UsersModel = this.readUsers();
        users.users = users.users.filter((x: UserModel) => x.username != username);
        this.resetDatabase(users);

        return true;
    }

    /**
     * Resets the users DB local storage.
     * @param {UsersModel} users Optional. If not supplied, uses default values.
     */
    public resetDatabase(users?: UsersModel): void {
        localStorage.removeItem(this.usersDB);
        if (!users) {
            localStorage.setItem(this.usersDB, JSON.stringify(this.usersDBDefault));
        }
        else {
            localStorage.setItem(this.usersDB, JSON.stringify(users));
        }
    }   
    
    /**
     * Initializes the users DB.
     * @privateRemarks Helper function. Special use ONLY for this program.
     * @returns {boolean} True is successful. Otherwise, false (DB already exists).
     */
    public initializeDatabase(): boolean {
        if (!localStorage.getItem(this.usersDB)) {
            localStorage.setItem(this.usersDB, JSON.stringify(this.usersDBDefault));
            return true;
        }

        return false;
    }

    /**
     * Default Users database.
     * @privateRemarks This is used ONLY for initializing the database.
     * @remarks The password is 'password' sans the quotes.
     */
    private readonly usersDBDefault = {
        "users": [
            {
                "username": "admin",
                "password": "a6818b8188b36c44d17784c5551f63accc5deaf8786f9d0ad1ae3cd8d887cbab4f777286dbb315fb14854c8774dc0d10b5567e4a705536cc2a1d61ec0a16a7a6"
            },
            {
                "username": "jay",
                "password": "a6818b8188b36c44d17784c5551f63accc5deaf8786f9d0ad1ae3cd8d887cbab4f777286dbb315fb14854c8774dc0d10b5567e4a705536cc2a1d61ec0a16a7a6"
            },
        ]
    };
}
