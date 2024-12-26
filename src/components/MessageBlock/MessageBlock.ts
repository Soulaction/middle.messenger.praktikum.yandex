import Block from "../../framework/Block.ts";
import s from "./MessageBlock.module.pcss";
import {CircleButton} from "../CircleButton/CircleButton.ts";
import {ButtonIcon} from "../ButtonIcon/ButtonIcon.ts";
import {ContextMenu, MenuItem} from "../ContextMenu/ContextMenu.ts";
import addIcon from "/icons/add.svg?url";
import deleteIcon from "/icons/delete.svg?url";
import fileIcon from "/icons/file.svg?url";
import locationIcon from "/icons/location.svg?url";
import {Modal} from "../Modal/Modal.ts";
import {AddUserModal} from "../../modals/AddUserModal/AddUserModal.ts";
import {RemoveUserModal} from "../../modals/RemoveUserModal/RemoveUserModal.ts";
import {MessageItem} from "../MessageItem/MessageItem.ts";
import {BlockProperties} from "../../framework/types/BlockProps";

export type MessageBlockProps = {
    MessageList: MessageItem[];
}

export class MessageBlock extends Block {
    contextMenuClip: ContextMenu;
    contextMenuChat: ContextMenu;

    constructor(messageBlockProps: BlockProperties<MessageBlockProps>) {
        const addUserModal = new Modal({
            children: {
                ContentModal: new AddUserModal()
            }
        });

        const removeUserModal = new Modal({
            children: {
                ContentModal: new RemoveUserModal()
            }
        });

        const menuItemClip: MenuItem[] = [
            {
                iconURL: fileIcon,
                text: 'Файл',
                event: () => {}
            },
            {
                iconURL: locationIcon,
                text: 'Локация',
                event: () => {}
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
                event: () => addUserModal.openModel()
            },
            {
                iconURL: deleteIcon,
                text: 'Удалить пользователя',
                event: () => removeUserModal.openModel()
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
                ContextMenuChat,
                AddUserModal: addUserModal,
                RemoveUserModal: removeUserModal,
            },
            lists: {
                MessageList: messageBlockProps.props!.MessageList
            }
        });
        this.contextMenuClip = ContextMenuClip;
        this.contextMenuChat = ContextMenuChat;
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

    override render(): string {
        return `<div class="${s.chat}">
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
                  
                    {{{ContextMenuClip}}}
                    {{{ContextMenuChat}}}
                    {{{AddUserModal}}}
                    {{{RemoveUserModal}}}
                </div>`;
    }
}
