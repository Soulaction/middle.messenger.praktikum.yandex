import {UserInfoItem} from '../UserInfoItem/UserInfoItem.ts';
import {UserService} from '../../services/UserService/UserService.ts';
import s from './ProfileInfo.module.pcss';
import Block from '../../core/Block/Block.ts';
import {Link} from "../Link/Link.ts";
import {BlockProperties} from "../../core/Block/types/BlockProps.ts";
import {ModeProfile} from "../../types/ModeProfile.ts";
import {navigate} from "../../core/utils/navigate.ts";
import {RoutePath} from "../../utils/const.ts";

type ProfilePageProps = {
  changeMode: (modeProfile: ModeProfile) => void;
}

export class ProfileInfo extends Block {
  userService: UserService;
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
    this.userService = new UserService();
    this.changeMode = profilePageProps.props!.changeMode;
  }

  override componentDidMount() {
    const userInfoItems: Record<string, UserInfoItem> = this.userService.getUserInfoProfile();

    this.setChildren(userInfoItems);
  }

  changeProfileMode(event: Event, mode: ModeProfile): void {
    event.preventDefault();
    this.changeMode(mode);
  }

  logout(event: Event): void {
    event.preventDefault();
    navigate().go(RoutePath.signIn);
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
