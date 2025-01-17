import userApi from "../api/UserApi/UserApi.ts";
import {UserUpdate} from "../api/UserApi/types/UserUpdate.ts";
import store from "../core/Store.ts";

export class UserController {

    public async changeUserProfile(userUpdate: UserUpdate): Promise<void> {
        try {
            store.set('user.data', await userApi.changeUserProfile(userUpdate));
        } catch(e) {
            store.set('user.error', (e as XMLHttpRequest).response.reason);
        }
    }
}

export default new UserController();
