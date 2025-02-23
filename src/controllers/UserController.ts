import userApi from '../api/UserApi/UserApi.ts';
import { UserUpdate } from '../api/UserApi/types/UserUpdate.ts';
import store from '../core/Store.ts';
import { UpdatePassword } from '../api/UserApi/types/UpdatePassword.ts';
import { getAvatar } from '../utils/utils.ts';

export class UserController {
  public async changeUserProfile(userUpdate: UserUpdate): Promise<void> {
    try {
      const user = await userApi.changeUserProfile(userUpdate);
      store.set('user.data', { ...user, avatar: getAvatar(user.avatar) });
    } catch (e) {
      store.set('user.error', (e as XMLHttpRequest).response.reason);
    }
  }

  public async changeUserPassword(userUpdate: UpdatePassword): Promise<void> {
    try {
      await userApi.changeUserPassword(userUpdate);
    } catch (e) {
      store.set('user.error', (e as XMLHttpRequest).response.reason);
    }
  }

  public async changeUserAvatar(file: FileList): Promise<void> {
    try {
      const formData = new FormData();
      formData.set('avatar', file[0]);

      const user = await userApi.changeUserAvatar(formData);
      store.set('user.data', { ...user, avatar: getAvatar(user.avatar) });
    } catch (e) {
      store.set('user.error', (e as XMLHttpRequest).response.reason);
    }
  }

  public async getUserByLogin(login: string): Promise<number | null> {
    try {
      const searchUsers = await userApi.getUserByLogin({ login });
      const findUser = searchUsers.find((item) => item.login === login);

      if (findUser) {
        return findUser.id;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
}

export default new UserController();
