import { UserModel } from './user.model';

/**
 * Model class 'UsersModel' for all users' credential in local Storage.
 */
export class UsersModel {

    public users: UserModel[];

    public constructor(init?: Partial<UsersModel>) {
        Object.assign(this, init);
    }
}
