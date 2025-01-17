import {UserInfoItem} from '../UserInfoItem/UserInfoItem.ts';
import {UserService} from '../../services/UserService/UserService.ts';
import s from './ProfileInfo.module.pcss';
import Block from '../../core/Block/Block.ts';
import {Link} from "../Link/Link.ts";
import {BlockProperties} from "../../core/Block/types/BlockProps.ts";
import {ModeProfile} from "../../types/ModeProfile.ts";
import {wrapStore} from "../../core/utils/wrapStore.ts";
import {User} from "../../types/User.ts";
import authController from "../../controllers/AuthController.ts";

type ProfilePageProps = {
    changeMode: (modeProfile: ModeProfile) => void;
    user?: User
}

class ProfileInfo extends Block {
    userService: UserService =  new UserService();
    changeMode: (modeProfile: ModeProfile) => void

    constructor(profilePageProps: BlockProperties<ProfilePageProps>) {
        super({
            children: {
                LinkChangeData: new Link({
                    props: {
                        label: 'Изменить данные',
                    },
                    events: {
                        click: (event: Event) => this.changeProfileMode(event, 'changeProfile'),
                    },
                }),
                LinkChangePassword: new Link({
                    props: {
                        label: 'Изменить пароль',
                    },
                    events: {
                        click: (event: Event) => this.changeProfileMode(event, 'changePassword'),
                    },
                }),
                LinkChangeExit: new Link({
                    props: {
                        label: 'Выйти',
                        danger: true,
                    },
                    events: {
                        click: (event: Event) => this.logout(event),
                    },
                }),
            }
        });
        this.changeMode = profilePageProps.props!.changeMode;
    }

    override componentDidMount() {
        const user = (this.props as ProfilePageProps).user;
        if(!user) {
            return;
        }
        const userInfoItems: Record<string, UserInfoItem> = this.userService.createUserInfoItem(user);

        this.setChildren(userInfoItems);
    }

    changeProfileMode(event: Event, mode: ModeProfile): void {
        event.preventDefault();
        this.changeMode(mode);
    }

    async logout(event: Event): Promise<void>{
        event.preventDefault();
        await authController.logout();
    }

    override render(): string {
        return `
            <div class="user-info">
                <h1 class="${s.userName}">Дмитрий</h1>
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
           `;
    }
}

export const ProfileInfoWithStore = wrapStore<Partial<ProfilePageProps>>((state) => (
    {user: state.user?.data}
))(ProfileInfo);
