import { UserInfoItem } from '../../components/UserInfoItem/UserInfoItem.ts';
import { UserService } from '../../services/UserService/UserService.ts';
import { Link } from '../../components/Link/Link.ts';
import { AvatarUser } from '../../components/AvatarUser';
import s from './ProfilePage.module.pcss';
import { CircleButton } from '../../components/CircleButton/CircleButton';
import Block from '../../core/Block/Block.ts';
import { navigate } from '../../utils/utils.ts';

export class ProfilePage extends Block {
  userService: UserService;


  constructor() {
    super({
      children: {
        AvatarUser: new AvatarUser({
          props: {
            imgUrl: '/images/profile.png',
          },
        }),
        LinkChangeData: new Link({
          props: {
            label: 'Изменить данные',
          },
          events: {
            click: (event: Event) => navigate('/profile-edit', event),
          },
        }),
        LinkChangePassword: new Link({
          props: {
            label: 'Изменить пароль',
          },
          events: {
            click: (event: Event) => navigate('/profile-password', event),
          },
        }),
        LinkChangeExit: new Link({
          props: {
            label: 'Выйти',
            danger: true,
          },
          events: {
            click: (event: Event) => navigate('/login', event),
          },
        }),
        CircleButton: new CircleButton({
          props: {
            type: 'button',
          },
          events: {
            click: (event: Event) => navigate('/chat', event),
          },
        }),
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
                    </main>
                `;
  }
}
