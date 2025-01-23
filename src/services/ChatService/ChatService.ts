import {DialogItem} from '../../components/DialogItem/DialogItem';
import {MessageItem} from '../../components/MessageItem/MessageItem.ts';
import {Message} from '../../types/Message.ts';
import {Chat} from "../../api/ChatApi/types/Chats.ts";
import {ContextMenu, MenuItem} from "../../components/ContextMenu/ContextMenu.ts";
import deleteIcon from "/icons/delete.svg?url";
import chatController from "../../controllers/ChatController.ts";
import store from "../../core/Store.ts";
import {BASE_URL_HTTP} from "../../utils/const.ts";

export class ChatService {

    getDialogItems(chats: Chat[], id: number): DialogItem[] {
        return chats.map((chat) => {
            const menuItem: MenuItem[] = [
                {
                    iconURL: deleteIcon,
                    text: 'Удалить чат',
                    event: async () => chatController.deleteChat(chat.id),
                },
            ];

            const contextMenu: ContextMenu = new ContextMenu({
                props: {
                    items: menuItem,
                },
            });

            const showMenu = (event: Event): void => {
                event.preventDefault();

                const {clientX: left, clientY: top} = event as PointerEvent;
                contextMenu.openContextMenu({top, left});
            }

            const selectedDialog = async (): Promise<void> => {
                store.set('selectedChat.data', chat);
                await chatController.getChatToken(chat.id);
            }

            return new DialogItem({
                props: {
                    ...chat,
                    selected: chat.id === id,
                },
                children: {
                    ContextMenu: contextMenu
                },
                events: {
                    click: () => selectedDialog(),
                    contextmenu: (event) => showMenu(event)
                },
            });
        });
    }

    getMessageItems(messages: Message[]): MessageItem[] {
        const meId = store.getState().user?.data.id;

        return messages.map(msg => {
            return new MessageItem({
                props: {
                    linkImg: msg.file?.path ? `${BASE_URL_HTTP}/resources${msg.file?.path}` : null,
                    content: msg.content,
                    meMessage: msg.user_id === meId,
                    time: msg.time
                },
            });
        });
    }
}
