import { BASE_URL_HTTP } from '../../utils/const.ts';
import { BaseApi } from '../BaseApi.ts';
import { UsersToChat } from './types/UsersToChat.ts';
import { Chat } from './types/Chats.ts';

export class ChatApi extends BaseApi {
  getChats(offset: number = 0, limit: number = 100, title: string = ''): Promise<Chat[]> {
    return this.http.get<Chat[]>('', { data: { offset, limit, title }, credentials: true });
  }

  createChat(title: string): Promise<{ id: number }> {
    return this.http.post<{ id: number }, { title: string }>('', { data: { title }, credentials: true });
  }

  deleteChat(chatId: number): Promise<string> {
    return this.http.delete<string, { chatId: number }>('', { data: { chatId }, credentials: true });
  }

  uploadChatAvatar(formData: FormData): Promise<Chat> {
    return this.http.put<Chat>('/avatar', { data: formData, credentials: true });
  }

  addUsersToChat(usersToChat: UsersToChat): Promise<string> {
    return this.http.put<string, UsersToChat>('/users', { data: usersToChat, credentials: true });
  }

  deleteUsersFromChat(usersToChat: UsersToChat): Promise<string> {
    return this.http.delete<string, UsersToChat>('/users', { data: usersToChat, credentials: true });
  }

  getChatToken(id: number): Promise<{ token: string }> {
    return this.http.post<{ token: string }, { chatId: number }>(`/token/${id}`, { credentials: true });
  }
}

export default new ChatApi(BASE_URL_HTTP + '/chats');
