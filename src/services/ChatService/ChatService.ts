import {ChatApi} from "../../api/ChatApi";
import {Chat} from "../../types/Chat";
import {DialogItem} from "../../components/DialogItem/DialogItem";

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
}
