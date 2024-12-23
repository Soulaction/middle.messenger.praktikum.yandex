import {ChatApi} from "../../api/ChatApi";
import {Chat} from "../../types/Chat";
import {DialogItem} from "../../components/DialogItem/DialogItem";
import {MessageItem} from "../../components/MessageItem/MessageItem.ts";
import {Message} from "../../types/Message.ts";

export class ChatService {
    chatApi: ChatApi;

    constructor() {
        this.chatApi = new ChatApi();
    }

    getDialogItems(): DialogItem[] {
        const chats: Chat[] = this.chatApi.getChats();
        return chats.map(chat => {
            return new DialogItem({
                props: {
                    ...chat
                }
            })
        })
    };

    getMessageItems(idChat: string): MessageItem[] {
        const messages: Message[] = this.chatApi.getMessageForChat(idChat);
        return messages.map(chat => {
            return new MessageItem({
                props: {
                    ...chat
                }
            })
        })
    };
}
