import Block from "../../framework/Block.ts";
import {UserInfoItem} from "../../components/User-info-item/User-info-item.ts";
import {UserService} from "../../services/UserService/UserService.ts";
import {Link} from "../../components/Link/Link.ts";

export class ProfilePage extends Block {
    userService: UserService;

    constructor() {
        super({
            children: {
                LinkChangeData: new Link({
                    props: {
                        label: 'Изменить данные',
                        link: '#'
                    }
                }),
                LinkChangePassword: new Link({
                    props: {
                        label: 'Изменить пароль',
                        link: '#'
                    }
                }),
                LinkChangeExit: new Link({
                    props: {
                        label: 'Выйти',
                        danger: true,
                        link: '#'
                    }
                })
            },
        });
        this.userService = new UserService();
    }

    override componentDidMount() {
        const userInfoItems: Record<string, UserInfoItem> = this.userService.getUserInfoProfile();

        this.setChildren(userInfoItems);
    }

    override render(): string {
        return `
                    <main class="page-profile">
                        <div class="left-panel">
                            <button class="button-row"></button>
                        </div>
                        <div class="page-wrapper page-profile-content">
                            <div class="user-avatar-wrapper">
                                <img class="user-avatar" src="/images/profile.png" alt="Иконка профиля"/>
                            </div>
                            <h1 class="user-name">Дмитрий</h1>
                            <div class="user-info">
                                {{{UserInfoItemEmail}}}
                                <div class="user-info-border"></div>
                                {{{UserInfoItemLogin}}}
                                <div class="user-info-border"></div>
                                {{{UserInfoItemFirstName}}}
                                <div class="user-info-border"></div>
                                {{{UserInfoItemSecondName}}}
                                <div class="user-info-border"></div>
                                {{{UserInfoItemNikName}}}
                                <div class="user-info-border"></div>
                                {{{UserInfoItemPhone}}}
                                <footer class="user-info-footer">
                                    {{{LinkChangeData}}}
                                    <div class="user-info-border"></div>
                                    {{{LinkChangePassword}}}
                                    <div class="user-info-border"></div>
                                    {{{LinkChangeExit}}}
                                </footer>
                            </div>
                        </div>
                    </main>
                `;
    }
}
