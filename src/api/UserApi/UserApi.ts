import {User} from '../../types/User.ts';
import {BaseApi} from "../BaseApi.ts";
import {BASE_URL_HTTP} from "../../utils/const.ts";
import {SearchUser} from "./types/SearchUser.ts";
import {UserUpdate} from "./types/UserUpdate.ts";
import {UpdatePassword} from "./types/UpdatePassword.ts";

class UserApi extends BaseApi {
    constructor(baseURL: string) {
        super(baseURL);
    }

    getUserByLogin(searchUser: SearchUser): Promise<User[]> {
        return this.http.post<User[], SearchUser>('/search', {data: searchUser, credentials: true});
    }

    changeUserAvatar(formData: FormData): Promise<User> {
        return this.http.put<User>('/profile/avatar', {data: formData, credentials: true});
    }

    changeUserProfile(searchUser: UserUpdate): Promise<User> {
        return this.http.put<User, UserUpdate>('/profile', {data: searchUser, credentials: true});
    }

    changeUserPassword(searchUser: UpdatePassword): Promise<string> {
        return this.http.put<string, UpdatePassword>('/password', {data: searchUser, credentials: true});
    }
}

export default new UserApi(BASE_URL_HTTP + '/user');
