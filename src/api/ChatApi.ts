import {Chat} from "../types/Chat"
import {chats} from "../utils/const";

export class ChatApi {
    getChats(): Chat[] {
        return chats;
    }
}
