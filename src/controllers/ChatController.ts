import store from '../core/Store.ts';
import chatApi from '../api/ChatApi/ChatApi.ts';
import { UsersToChat } from '../api/ChatApi/types/UsersToChat.ts';
import messageController from './MessageController.ts';
import { getAvatar } from '../utils/utils.ts';
import userController from './UserController.ts';

export class ChatController {
  public async getChats(): Promise<void> {
    try {
      const chatList = await chatApi.getChats();
      store.set(
        'chats.data',
        chatList.map((item) => ({ ...item, avatar: getAvatar(item.avatar) })),
      );
    } catch (e) {
      store.set('chats.error', (e as XMLHttpRequest).response.reason);
    }
  }

  public async createChat(title: string): Promise<void> {
    try {
      await chatApi.createChat(title);
    } catch (e) {
      store.set('chats.error', (e as XMLHttpRequest).response.reason);
    }
  }

  public async deleteChat(chatId: number): Promise<void> {
    try {
      await chatApi.deleteChat(chatId);
      store.set(
        'chats.data',
        store.getState().chats?.data.filter((item) => item.id !== chatId),
      );
      if (store.getState().selectedChat?.data.id === chatId) {
        store.set('selectedChat.data', null);
      }
    } catch (e) {
      store.set('chats.error', (e as XMLHttpRequest).response.reason);
    }
  }

  public async addUsersToChat(login: string): Promise<void> {
    try {
      const usersToChat = await this.getUsersToChatInfo(login);

      if (usersToChat) {
        await chatApi.addUsersToChat(usersToChat);
      }
    } catch (e) {
      store.set('chats.error', (e as XMLHttpRequest).response.reason);
    }
  }

  public async deleteUsersFromChat(login: string): Promise<void> {
    try {
      const usersToChat = await this.getUsersToChatInfo(login);

      if (usersToChat) {
        await chatApi.deleteUsersFromChat(usersToChat);
      }
    } catch (e) {
      store.set('chats.error', (e as XMLHttpRequest).response.reason);
    }
  }

  public async getChatToken(id: number): Promise<void> {
    try {
      const { token } = await chatApi.getChatToken(id);
      const idUser: number | undefined = store.getState().user?.data.id;

      if (token && idUser) {
        await messageController.connection(`/${idUser}/${id}/${token}`);
      }
    } catch (e) {
      store.set('chats.error', (e as XMLHttpRequest).response.reason);
    }
  }

  public async getUsersToChatInfo(login: string): Promise<UsersToChat | null> {
    try {
      const idUser = await userController.getUserByLogin(login);
      const chatId = store.getState().selectedChat?.data.id;

      if (idUser && chatId) {
        const usersToChat: UsersToChat = {
          users: [idUser],
          chatId,
        };
        return usersToChat;
      }
      return null;
    } catch (e) {
      store.set('chats.error', (e as XMLHttpRequest).response.reason);
      return null;
    }
  }
}

export default new ChatController();
