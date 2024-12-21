import Block from "../../framework/Block.ts";
import {UserInfoItem} from "../../components/UserInfoItem/UserInfoItem.ts";
import {UserService} from "../../services/UserService/UserService.ts";
import {Link} from "../../components/Link/Link.ts";
import {AvatarUser} from "../../components/AvatarUser";
import s from "./ProfilePage.module.pcss";

export class ProfilePage extends Block {
    userService: UserService;

    constructor() {
        super({
            children: {
                AvatarUser: new AvatarUser({
                    props: {
                        imgUrl: '/images/profile.png'
                    }
                }),
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
                            {{{AvatarUser}}}
                            <h1 class="user-name">Дмитрий</h1>
                            <div class="user-info">
                                {{{UserInfoItemEmail}}}
                                <div class="${s.userInfoBorder}"></div>
                                {{{UserInfoItemLogin}}}
                                <div class="${s.userInfoBorder}"></div>
                                {{{UserInfoItemFirstName}}}
                                <div class="${s.userInfoBorder}"></div>
                                {{{UserInfoItemSecondName}}}
                                <div class="${s.userInfoBorder}"></div>
                                {{{UserInfoItemNikName}}}
                                <div class="${s.userInfoBorder}"></div>
                                {{{UserInfoItemPhone}}}
                                <footer class="${s.userInfoFooter}">
                                    {{{LinkChangeData}}}
                                    <div class="${s.userInfoBorder}"></div>
                                    {{{LinkChangePassword}}}
                                    <div class="${s.userInfoBorder}"></div>
                                    {{{LinkChangeExit}}}
                                </footer>
                            </div>
                        </div>
                    </main>
                `;
    }
}
