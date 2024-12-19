import {User} from "../../types/User.ts";
import {UserApi} from "../../api/UserApi.ts";
import {UserInfoItem} from "../../components/User-info-item/User-info-item.ts";

export class UserService {
    private userAPI: UserApi;

    constructor() {
        this.userAPI = new UserApi();
    }

    getUserInfoProfile(): Record<string, UserInfoItem> {
        const user: User = this.userAPI.getUserInfo();

        return {
            UserInfoItemEmail: new UserInfoItem({
                props: {
                    label: 'Почта',
                    value: user.email,
                }
            }),
            UserInfoItemLogin: new UserInfoItem({
                    props: {
                        label: 'Логин',
                        value: user.login,
                    }
                }),
            UserInfoItemFirstName: new UserInfoItem({
                    props: {
                        label: 'Имя',
                        value: user.firstName,
                    }
                }),
            UserInfoItemSecondName: new UserInfoItem({
                    props: {
                        label: 'Фамилия',
                        value: user.secondName,
                    }
                }),
            UserInfoItemNikName: new UserInfoItem({
                    props: {
                        label: 'Имя в чате',
                        value: user.nikName,
                    }
                }),
            UserInfoItemPhone: new UserInfoItem({
                    props: {
                        label: 'Телефон',
                        value: user.phone,
                    }
                })
    };
    }
}