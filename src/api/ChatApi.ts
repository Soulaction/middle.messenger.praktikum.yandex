import {Chat} from "../types/Chat"
import {chats, message} from "../utils/const";
import {Message} from "../types/Message.ts";

export class ChatApi {
    getChats(): Chat[] {
        return chats;
    }

    getMessageForChat(id: string): Message[] {
        return message.filter(el => el.idChat === id);
    }
}
