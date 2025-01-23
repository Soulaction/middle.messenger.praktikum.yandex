import s from './MessageBlockHeader.module.pcss';
import {ButtonIcon} from '../ButtonIcon/ButtonIcon.ts';
import {ContextMenu, MenuItem} from '../ContextMenu/ContextMenu.ts';
import addIcon from '/icons/add.svg?url';
import deleteIcon from '/icons/delete.svg?url';
import {Modal, ModalWithStore} from '../Modal/Modal.ts';
import {AddUserModal} from '../../modals/AddUserModal/AddUserModal.ts';
import {RemoveUserModal} from '../../modals/RemoveUserModal/RemoveUserModal.ts';
import Block from '../../core/Block/Block.ts';
import {wrapStore} from "../../core/utils/wrapStore.ts";
import {Chat} from "../../api/ChatApi/types/Chats.ts";
import {EqualType, isEqual} from "../../core/utils/isEqual.ts";

export type MessageBlockHeaderProps = {
    selectedChat: Chat | undefined
};

class MessageBlockHeader extends Block {

    contextMenuChat!: ContextMenu;

    constructor() {
        super({
            children: {
                ButtonIconChat: new ButtonIcon({
                    props: {
                        iconLink: '/icons/menu.svg',
                        className: s.iconMenu,
                    },
                    events: {
                        click: event => this.showMenuChat(event),
                    },
                }),
            }
        });
    }

    showMenuChat(event: Event): void {
        const imgIcon: HTMLImageElement = event.target as HTMLImageElement;
        const imgIconSize: DOMRect = imgIcon.getBoundingClientRect();
        const top: number = imgIconSize.bottom + 27;
        const right: number = window.innerWidth - imgIconSize.right - 9;

        this.contextMenuChat.openContextMenu({top, right});
    }

    protected override componentDidUpdate(oldProps: EqualType, newProps: EqualType): boolean {
        const isChangeSelectedChat = !!newProps?.selectedChat && !isEqual(oldProps?.selectedChat, newProps?.selectedChat);

        if (isChangeSelectedChat && newProps?.selectedChat) {
            const addUserModal = new ModalWithStore({
                children: {
                    ContentModal: new AddUserModal(),
                },
            });

            const removeUserModal = new ModalWithStore({
                children: {
                    ContentModal: new RemoveUserModal(),
                },
            });

            const menuItem: MenuItem[] = [
                {
                    iconURL: addIcon,
                    text: 'Добавить пользователя',
                    event: () => {
                        (addUserModal as Modal).openModel();
                        addUserModal.dispatchComponentDidMount();
                    },
                },
                {
                    iconURL: deleteIcon,
                    text: 'Удалить пользователя',
                    event: () => {
                        (removeUserModal as Modal).openModel();
                        removeUserModal.dispatchComponentDidMount();
                    },
                },
            ];

            const ContextMenuChat: ContextMenu = new ContextMenu({
                props: {
                    items: menuItem,
                },
            });

            this.contextMenuChat = ContextMenuChat;
            this.setChildren({
                ContextMenuChat,
                AddUserModal: addUserModal,
                RemoveUserModal: removeUserModal,
            })
        }
        return true;
    }

    override render(): string {
        return `
                  <div class="${s.chatHeader}">   
                      <img class="${s.chatImg}" src="{{selectedChat.avatar}}" alt="Иконка собеседника">
                      <h1 class="${s.chatName}">{{selectedChat.title}}</h1>
                      {{{ButtonIconChat}}}
                      {{{ContextMenuChat}}}
                      {{{AddUserModal}}}
                      {{{RemoveUserModal}}}
                  </div>
                 `;
    }
}

export const MessageBlockHeaderWithStore = wrapStore<MessageBlockHeaderProps>((state) => {
    return {
        selectedChat: state.selectedChat?.data,
    };
})(MessageBlockHeader);
