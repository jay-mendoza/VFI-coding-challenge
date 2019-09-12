import { UserModel } from './user.model';

/**
 * Model class 'UsersModel' for all users' credential in localStorage.
 */
export class UsersModel {

    /** Collection of UserModel objects. */
    public users: UserModel[];

    /**
     * Initializes a new instance of UsersModel object.
     * @param {Partial<UsersModel>} init Used in assigning instantiation values.
     */
    public constructor(init?: Partial<UsersModel>) {
        Object.assign(this, init);
    }
}
