/**
 * Model class 'UserModel' for user credential in localStorage.
 */
export class UserModel {

    /** Username of the User. */
    public username: string; 
    
    /** Password of the User */
    public password: string;

    /**
     * Initializes a new instance of UserModel object.
     * @param {Partial<UserModel>} init Used in assigning instantiation values.
     */
    public constructor(init?: Partial<UserModel>) {
        Object.assign(this, init);
    }
}
