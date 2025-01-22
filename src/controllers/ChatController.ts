import store from "../core/Store.ts";
import chatApi from "../api/ChatApi/ChatApi.ts";
import {UsersToChat} from "../api/ChatApi/types/UsersToChat.ts";
import messageController from "./MessageController.ts";

export class ChatController {
    public async getChats(): Promise<void> {
        try {
            store.set('chats.data', await chatApi.getChats());
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
            store.set('chats.data', store.getState().chats?.data.filter((item) => item.id !== chatId));
        } catch (e) {
            store.set('chats.error', (e as XMLHttpRequest).response.reason);
        }
    }

    public async uploadChatAvatar(formData: FormData): Promise<void> {
        try {
            await chatApi.uploadChatAvatar(formData);
        } catch (e) {
            store.set('chats.error', (e as XMLHttpRequest).response.reason);
        }
    }

    public async addUsersToChat(usersToChat: UsersToChat): Promise<void> {
        try {
            await chatApi.addUsersToChat(usersToChat);
        } catch (e) {
            store.set('chats.error', (e as XMLHttpRequest).response.reason);
        }
    }


    public async deleteUsersFromChat(usersToChat: UsersToChat): Promise<void> {
        try {
            await chatApi.deleteUsersFromChat(usersToChat);
        } catch (e) {
            store.set('chats.error', (e as XMLHttpRequest).response.reason);
        }
    }

    public async getChatToken(id: number): Promise<void> {
        try {
            const {token} = await chatApi.getChatToken(id);
            const idUser: number | undefined = store.getState().user?.data.id;

            if (token && idUser) {
                messageController.connection(`/${idUser}/${id}/${token}`);
            }
        } catch (e) {
            store.set('chats.error', (e as XMLHttpRequest).response.reason);
        }
    }
}

export default new ChatController();
