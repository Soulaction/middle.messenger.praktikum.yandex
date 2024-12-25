import Block from "../../framework/Block.ts";
import s from "./ChatPage.module.pcss";
import {ChatService} from "../../services/ChatService/ChatService";
import {DialogItem} from "../../components/DialogItem/DialogItem";
import {CircleButton} from "../../components/CircleButton/CircleButton";
import {LinkProfile} from "../../components/LinkProfile/LinkProfile.ts";
import {SearchInput} from "../../components/SearchInput/SearchInput.ts";
import {ButtonIcon} from "../../components/ButtonIcon/ButtonIcon.ts";
import {ContextMenu, MenuItem} from "../../components/ContextMenu/ContextMenu.ts";
import addIcon from "/icons/add.svg?url";
import deleteIcon from "/icons/delete.svg?url";
import fileIcon from "/icons/file.svg?url";
import locationIcon from "/icons/location.svg?url";

export class ChatPage extends Block {
    chatService: ChatService;
    contextMenuClip: ContextMenu;
    contextMenuChat: ContextMenu;

    constructor() {
        const menuItemClip: MenuItem[] = [
            {
                iconURL: fileIcon,
                text: 'Файл',
                event: () => this.showModalAddUser()
            },
            {
                iconURL: locationIcon,
                text: 'Локация',
                event: () => this.showModalDeleteUser()
            }
        ];

        const ContextMenuClip: ContextMenu = new ContextMenu({
            props: {
                items: menuItemClip
            }
        });

        const menuItem: MenuItem[] = [
            {
                iconURL: addIcon,
                text: 'Добавить пользователя',
                event: () => this.showModalAddUser()
            },
            {
                iconURL: deleteIcon,
                text: 'Удалить пользователя',
                event: () => this.showModalDeleteUser()
            }
        ];

        const ContextMenuChat: ContextMenu = new ContextMenu({
            props: {
                items: menuItem
            }
        });


        super({
            props: {
                chatIcon: 'images/img-chat.png',
                chatName: 'Вадим',
            },
            children: {
                LinkProfile: new LinkProfile({
                    props: {
                        link: '#'
                    }
                }),
                SearchInput: new SearchInput({
                    props: {
                        placeholder: 'Поиск',
                        className: s.searchInput
                    }
                }),
                ButtonIconChat: new ButtonIcon({
                    props: {
                        iconLink: '/icons/menu.svg',
                        className: s.iconMenu
                    },
                    events: {
                        click: event => this.showMenuChat(event)
                    }
                }),
                ButtonIconClip: new ButtonIcon({
                    props: {
                        iconLink: '/icons/clip.svg'
                    },
                    events: {
                        click: event => this.showMenuClip(event)
                    }
                }),
                CircleButton: new CircleButton({
                    props: {
                        className: s.sendMsgSubmit,
                        type: 'submit'
                    }
                }),
                ContextMenuClip,
                ContextMenuChat
            }
        });
        this.chatService = new ChatService();
        this.contextMenuClip = ContextMenuClip;
        this.contextMenuChat = ContextMenuChat;
    }

    protected override componentDidMount() {
        const chatList: DialogItem[] = this.chatService.getDialogItems();
        const messageList: DialogItem[] = this.chatService.getMessageItems('1');
        this.setLists({ChatList: chatList, MessageList: messageList})
    }

    showMenuChat(event: Event): void {
        const imgIcon: HTMLImageElement = event.target as HTMLImageElement;
        const imgIconSize: DOMRect = imgIcon.getBoundingClientRect();
        const top: number = imgIconSize.bottom + 27;
        const right: number = window.innerWidth - imgIconSize.right - 9;

        this.contextMenuChat.openContextMenu({top, right});
    }

    showMenuClip(event: Event): void {
        const imgIcon: HTMLImageElement = event.target as HTMLImageElement;
        const imgIconSize: DOMRect = imgIcon.getBoundingClientRect();
        const bottom: number = window.innerHeight - imgIconSize.top + 24;
        const left: number = imgIconSize.left - 8;

        this.contextMenuClip.openContextMenu({bottom, left});
    }

    showModalAddUser(): void {

    }

    showModalDeleteUser(): void {

    }

    override render(): string {
        return `<main class="${s.pageChatsWrapper}">
                    <div class="${s.leftPanelChat}">
                        <div class="${s.leftPanelHeader}">
                            {{{LinkProfile}}}
                            {{{SearchInput}}}
                        </div>
                        <ul class="${s.listChat}">
                             {{{ChatList}}}
                        </ul>
                    </div>
                    <div class="${s.chat}">
                        <div class="${s.chatHeader}">   
                            <img class="${s.chatImg}" src="{{chatIcon}}" alt="Иконка собеседника">
                            <h1 class="${s.chatName}">{{chatName}}</h1>
                            {{{ButtonIconChat}}}
                        </div>
                        <div class="${s.correspondence}">
                             {{{MessageList}}}
                        </div>
                        <form class="${s.sendMsgForm}" name="send-msg-form">
                            {{{ButtonIconClip}}}
                            <input class="${s.sendMsgInput}" name="message" placeholder="Сообщение"/>
                            {{{CircleButton}}}
                        </form>
                    </div>
                    {{{ContextMenu}}}
                    {{{ContextMenuClip}}}
                    {{{ContextMenuChat}}}
                </main>`;
    }
}
