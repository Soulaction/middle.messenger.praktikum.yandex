import Block from "../../framework/Block.ts";
import {UserInfoItem} from "../../components/UserInfoItem/UserInfoItem.ts";
import {UserService} from "../../services/UserService/UserService.ts";
import {Link} from "../../components/Link/Link.ts";
import {AvatarUser} from "../../components/AvatarUser";
import s from "./ProfilePage.module.pcss";
import {UploadFileModal} from "../../modals/UploadFileModal";
import {CircleButton} from "../../components/CircleButton/CircleButton";

export class ProfilePage extends Block {
    userService: UserService;


    constructor() {
        const uploadFileModal = new UploadFileModal({
            props: {
                titleModal: 'Загрузите файл'
            }
        });

        super({
            children: {
                AvatarUser: new AvatarUser({
                    props: {
                        imgUrl: '/images/profile.png'
                    },
                    events: {
                        click: () => uploadFileModal.openModel()
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
                }),
                CircleButton: new CircleButton({
                    props: {
                        type: 'button'
                    }
                }),
                UploadFileModal: uploadFileModal
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
                    <main class="${s.pageProfile}">
                        <div class="left-panel">
                            {{{CircleButton}}}
                        </div>
                        <div class="${s.pageProfileContent}">
                            {{{AvatarUser}}}
                            <h1 class="${s.userName}">Дмитрий</h1>
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
                        {{{UploadFileModal}}}
                    </main>
                `;
    }
}
