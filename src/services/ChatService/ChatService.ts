import {Chat} from "../../types/Chat";
import {DialogItem} from "../../components/DialogItem/DialogItem";
import {MessageItem} from "../../components/MessageItem/MessageItem.ts";
import {Message} from "../../types/Message.ts";

export class ChatService {

    getDialogItems(chats: Chat[], index: number, selectedChat: (index: number) => void): DialogItem[] {
        return chats.map((chat, i) => {
            return new DialogItem({
                props: {
                    ...chat,
                    selected: index === i
                },
                events: {
                    click: () => selectedChat(i)
                }
            })
        })
    };

    getMessageItems(messages: Message[]): MessageItem[] {
        return messages.map(chat => {
            return new MessageItem({
                props: {
                    ...chat
                }
            })
        })
    };
}
