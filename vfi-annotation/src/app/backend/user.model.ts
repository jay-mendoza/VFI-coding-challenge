/**
 * Model class 'UserModel' for user credential in local Storage.
 */
export class UserModel {

    public username: string;    
    public password: string;

    public constructor(init?: Partial<UserModel>) {
        Object.assign(this, init);
    }
}
