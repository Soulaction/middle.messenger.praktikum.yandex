import { User } from '../types/User.ts';

export class UserApi {
  getUserInfo(): User {
    return {
      id: crypto.randomUUID(),
      email: 'pochta@yandex.ru',
      login: 'dmitry',
      firstName: 'Иван',
      secondName: 'Иванов',
      phone: '+7 (909) 967 30 30',
      nikName: 'Дмитрий',
    };
  }
}