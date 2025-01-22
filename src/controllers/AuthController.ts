import {User} from "../types/User.ts";
import authApi from "../api/AuthApi/AuthApi.ts";
import {navigate} from "../core/utils/navigate.ts";
import {RoutePath} from "../utils/const.ts";
import {FormDataRegistration} from "../page/Registration/RegistrationPage.ts";
import store from "../core/Store.ts";
import {FormDataLogin} from "../page/LoginPage/LoginPage.ts";
import {getAvatar} from "../utils/utils.ts";

export class AuthController {
    public async registration(formDataRegistration: FormDataRegistration): Promise<void> {
        const user: Omit<User, 'id' | 'avatar' | 'display_name'> = {
            first_name: formDataRegistration.first_name,
            second_name: formDataRegistration.second_name,
            phone: formDataRegistration.phone,
            login: formDataRegistration.login,
            email: formDataRegistration.email,
            password: formDataRegistration.password,
        };

        try {
            await authApi.signup(user);
            navigate().go(RoutePath.messenger)
        } catch (e) {
            store.set('user.error', (e as XMLHttpRequest).response.reason);
        }
    }

    public async login(formDataLogin: FormDataLogin): Promise<void> {
        try {
            await authApi.signin(formDataLogin);
            navigate().go(RoutePath.messenger)
        } catch (e) {
            store.set('user.error', (e as XMLHttpRequest).response.reason);
        }
    }

    public async getAuthUserInfo(): Promise<void> {
        try {
            const user = await authApi.getAuthUserInfo();
            if ([RoutePath.signIn, RoutePath.signUp].includes(location.pathname as RoutePath)) {
                navigate().go(RoutePath.messenger)
            }
            store.set('user.data', {...user, avatar: getAvatar(user.avatar)});
        } catch (e) {
            if (![RoutePath.signIn, RoutePath.signUp].includes(location.pathname as RoutePath)) {
                navigate().go(RoutePath.signIn);
            }
            store.set('user.error', (e as XMLHttpRequest).response.reason);
        }
    }

    public async logout(): Promise<void> {
        try {
            await authApi.logout();
            navigate().go(RoutePath.signIn);
        } catch (e) {
            store.set('user.error', (e as XMLHttpRequest).response.reason);
        }
    }
}

export default new AuthController();
