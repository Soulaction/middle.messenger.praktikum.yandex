import s from './MessageBlock.module.pcss';
import {CircleButton} from '../CircleButton/CircleButton.ts';
import {ButtonIcon} from '../ButtonIcon/ButtonIcon.ts';
import {ContextMenu, MenuItem} from '../ContextMenu/ContextMenu.ts';
import addIcon from '/icons/add.svg?url';
import deleteIcon from '/icons/delete.svg?url';
import fileIcon from '/icons/file.svg?url';
import locationIcon from '/icons/location.svg?url';
import {Modal, ModalWithStore} from '../Modal/Modal.ts';
import {AddUserModal} from '../../modals/AddUserModal/AddUserModal.ts';
import {RemoveUserModal} from '../../modals/RemoveUserModal/RemoveUserModal.ts';
import Block from '../../core/Block/Block.ts';
import {ErrorMessage} from '../ErrorMessage/ErrorMessage.ts';
import {ValidationForm} from '../../core/Validation/ValidationForm.ts';
import {wrapStore} from "../../core/utils/wrapStore.ts";
import {Chat} from "../../api/ChatApi/types/Chats.ts";
import {EqualType, isEqual} from "../../core/utils/isEqual.ts";
import messageController from "../../controllers/MessageController.ts";


type FormDataMessageBlock = {
    message: string;
};

export type MessageBlockProps = {
    selectedChat: Chat | undefined,
    isSelectedChat?: Chat | undefined,
};

class MessageBlock extends Block {
    validationService: ValidationForm<FormDataMessageBlock>;

    contextMenuClip!: ContextMenu;

    contextMenuChat!: ContextMenu;

    constructor() {
        const validationService = new ValidationForm<FormDataMessageBlock>();

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
                ButtonIconClip: new ButtonIcon({
                    props: {
                        iconLink: '/icons/clip.svg',
                    },
                    events: {
                        click: event => this.showMenuClip(event),
                    },
                }),
                ErrorMessage: new ErrorMessage<FormDataMessageBlock>({
                    props: {
                        className: s.errorMsg,
                        formName: 'message',
                        validationFormService: validationService,
                    },
                }),
                CircleButton: new CircleButton({
                    props: {
                        className: s.sendMsgSubmit,
                        type: 'submit',
                    },
                    events: {
                        click: (event: Event) => this.sendMessage(event),
                    },
                }),
            }
        });
        this.validationService = validationService;
    }

    sendMessage(event: Event): void {
        event.preventDefault();
        const {message} = this.validationService.getFormValue();
        if(message) {
            messageController.sendMessage(message);
        }
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

    protected override componentDidUpdate(oldProps: EqualType, newProps: EqualType): boolean {
        const isChangeSelectedChat = !!newProps?.selectedChat && !isEqual(oldProps?.selectedChat, newProps?.selectedChat);

        if (isChangeSelectedChat && newProps?.selectedChat) {
            this.setProps({
                isSelectedChat: true
            })
        } else if (newProps?.isSelectedChat) {
            queueMicrotask(() => this.validationService.init('send-msg'));

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

            const menuItemClip: MenuItem[] = [
                {
                    iconURL: fileIcon,
                    text: 'Файл',
                    event: () => {
                    },
                },
                {
                    iconURL: locationIcon,
                    text: 'Локация',
                    event: () => {
                    },
                },
            ];

            const ContextMenuClip: ContextMenu = new ContextMenu({
                props: {
                    items: menuItemClip,
                },
            });

            const menuItem: MenuItem[] = [
                {
                    iconURL: addIcon,
                    text: 'Добавить пользователя',
                    event: () => (addUserModal as Modal).openModel(),
                },
                {
                    iconURL: deleteIcon,
                    text: 'Удалить пользователя',
                    event: () => (removeUserModal as Modal).openModel(),
                },
            ];

            const ContextMenuChat: ContextMenu = new ContextMenu({
                props: {
                    items: menuItem,
                },
            });
            this.contextMenuClip = ContextMenuClip;
            this.contextMenuChat = ContextMenuChat;
            this.setChildren({
                ContextMenuClip,
                ContextMenuChat,
                AddUserModal: addUserModal,
                RemoveUserModal: removeUserModal,
            })
        }

        return true;
    }

    override render(): string {
        return `<div class="${s.chat}">
                    {{#if isSelectedChat}}
                        <div class="${s.chatHeader}">   
                            <img class="${s.chatImg}" src="{{selectedChat.avatar}}" alt="Иконка собеседника">
                            <h1 class="${s.chatName}">{{selectedChat.title}}</h1>
                            {{{ButtonIconChat}}}
                        </div>
                        {{#if isNotMsg}}
                        <div class="${s.correspondence}">
                             {{{MessageList}}}
                        </div>
                        {{else}}
                        <div class="${s.noMessage}">
                             <h2 class="${s.messageTitle}">Нет сообщений, начните диалог</h2>
                        </div>
                        {{/if}}
                        <form class="${s.sendMsgInputBlock}" name="send-msg">
                               {{{ButtonIconClip}}}
                               <input class="${s.sendMsgInput}" name="message" placeholder="Сообщение"/>
                               {{{CircleButton}}}
                        </form>
                  
                        {{{ContextMenuClip}}}
                        {{{ContextMenuChat}}}
                        {{{AddUserModal}}}
                        {{{RemoveUserModal}}}
                    {{else}}
                         <h2 class="${s.messageTitle}">Выберете диалог</h2>   
                    {{/if}}
                </div>`;
    }
}

export const MessageBlockWithStore = wrapStore<MessageBlockProps>((state) => {
    return {
        selectedChat: state.selectedChat?.data,
    };
})(MessageBlock);
