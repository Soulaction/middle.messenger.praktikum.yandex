import { User } from '../../types/User.ts';
import { UserInfoItem } from '../../components/UserInfoItem/UserInfoItem.ts';

export class UserService {
  createUserInfoItem(user: User): Record<string, UserInfoItem> {
    return {
      UserInfoItemEmail: new UserInfoItem({
        props: {
          label: 'Почта',
          value: user.email,
        },
      }),
      UserInfoItemLogin: new UserInfoItem({
        props: {
          label: 'Логин',
          value: user.login,
        },
      }),
      UserInfoItemFirstName: new UserInfoItem({
        props: {
          label: 'Имя',
          value: user.first_name,
        },
      }),
      UserInfoItemSecondName: new UserInfoItem({
        props: {
          label: 'Фамилия',
          value: user.second_name,
        },
      }),
      UserInfoItemNikName: new UserInfoItem({
        props: {
          label: 'Имя в чате',
          value: user.display_name,
        },
      }),
      UserInfoItemPhone: new UserInfoItem({
        props: {
          label: 'Телефон',
          value: user.phone,
        },
      }),
    };
  }
}
