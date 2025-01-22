import s from './DialogList.module.pcss';
import {LinkProfile} from '../LinkProfile/LinkProfile.ts';
import {SearchInput} from '../SearchInput/SearchInput.ts';
import {Modal, ModalWithStore} from '../Modal/Modal.ts';
import {CreateChatModal} from '../../modals/CreateChatModal/CreateChatModal.ts';
import {ButtonIcon} from '../ButtonIcon/ButtonIcon.ts';
import Block from '../../core/Block/Block.ts';
import {navigate} from "../../core/utils/navigate.ts";
import {RoutePath} from "../../utils/const.ts";
import {wrapStore} from "../../core/utils/wrapStore.ts";
import {ChatController} from "../../controllers/ChatController.ts";
import {EqualType, isEqual} from "../../core/utils/isEqual.ts";
import {ChatService} from "../../services/ChatService/ChatService.ts";
import {Chat} from "../../api/ChatApi/types/Chats.ts";

export type DialogListProps = {
    chatList: Chat[] | undefined;
    selectedChat: Chat | undefined;
    emptyList?: boolean;
};

class DialogList extends Block {
    private chatController: ChatController = new ChatController();
    private chatService: ChatService = new ChatService();

    constructor() {
        const createChatModal = new ModalWithStore({
            children: {
                ContentModal: new CreateChatModal({
                    props: {
                        refreshData: () => this.getChats()
                    }
                }),
            },
        });

        super({
            children: {
                ButtonIconAdd: new ButtonIcon({
                    props: {
                        iconLink: '/icons/add-grey.svg',
                    },
                    events: {
                        click: () => (createChatModal as Modal).openModel(),
                    },
                }),
                LinkProfile: new LinkProfile({
                    events: {
                        click: (event: Event) => this.goToSettingProfilePage(event),
                    },
                }),
                SearchInput: new SearchInput({
                    props: {
                        placeholder: 'Поиск',
                        className: s.searchInput,
                    },
                }),
                CreateChatModal: createChatModal,
            },
        });
    }

    protected override componentDidMount() {
        this.getChats();
    }

    getChats(): void {
        this.chatController.getChats();
    }

    protected override componentDidUpdate(oldProps: EqualType, newProps: EqualType): boolean {
        const isChangeChatList = !!newProps?.chatList && !isEqual(oldProps?.chatList, newProps?.chatList);
        const isChangeSelectedChat = !!newProps?.selectedChat && !isEqual(oldProps?.selectedChat, newProps?.selectedChat);

        if ((isChangeChatList && newProps?.chatList.length > 0) || (isChangeSelectedChat && newProps?.selectedChat)) {
            this.setLists({
                ChatList: this.chatService.getDialogItems(newProps?.chatList, newProps?.selectedChat?.id)
            });
        } else if (newProps?.ChatList && newProps?.ChatList.length > 0) {
            this.setProps({
                emptyList: false
            });
        } else if (isChangeChatList) {
            this.setProps({
                emptyList: true
            });
        }

        return !isChangeChatList || !isChangeSelectedChat;
    }

    goToSettingProfilePage(event: Event): void {
        event.preventDefault();
        navigate().go(RoutePath.settings);
    }

    override render(): string {
        return `<div class="${s.panelChat}">
                    <div class="${s.panelHeader}">
                        <div class="${s.subHeader}">
                            {{{ButtonIconAdd}}}
                            {{{LinkProfile}}}
                        </div>
                        {{{SearchInput}}}
                    </div>
                    {{#if emptyList}}
                        <div class="${s.listChatEmpty}">
                            <h2 class="${s.emptyMsg}">Нет чатов, создайте диалог</h2>
                        </div>
                    {{else}}
                        <ul class="${s.listChat}">
                             {{{ChatList}}}
                        </ul>
                    {{/if}}
                        {{{CreateChatModal}}}
                 </div>`;
    }
}

export const DialogListWithStore = wrapStore<DialogListProps>((state) => {
    return {
        chatList: state.chats?.data,
        selectedChat: state.selectedChat?.data,
    };
})(DialogList);
