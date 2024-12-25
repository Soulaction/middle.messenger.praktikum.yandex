import Block from "../../framework/Block.ts";
import s from "./DialogList.module.pcss";
import {ChatService} from "../../services/ChatService/ChatService";
import {DialogItem} from "../DialogItem/DialogItem.ts";
import {LinkProfile} from "../LinkProfile/LinkProfile.ts";
import {SearchInput} from "../SearchInput/SearchInput.ts";
import {Modal} from "../Modal/Modal.ts";
import {CreateChatModal} from "../../modals/CreateChatModal/CreateChatModal.ts";
import {ButtonIcon} from "../ButtonIcon/ButtonIcon.ts";

export class DialogList extends Block {
    chatService: ChatService;

    constructor() {
        const createChatModal = new Modal({
            children: {
                ContentModal: new CreateChatModal()
            }
        });

        super({
            children: {
                ButtonIconAdd: new ButtonIcon({
                    props: {
                        iconLink: '/icons/add.svg'
                    },
                    events: {
                        click: () => createChatModal.openModel()
                    }
                }),
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
                CreateChatModal: createChatModal
            }
        });
        this.chatService = new ChatService();
    }

    protected override componentDidMount() {
        const chatList: DialogItem[] = this.chatService.getDialogItems();
        this.setLists({ChatList: chatList})
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
                    <ul class="${s.listChat}">
                         {{{ChatList}}}
                    </ul>
                        {{{CreateChatModal}}}
                 </div>`;
    }
}
