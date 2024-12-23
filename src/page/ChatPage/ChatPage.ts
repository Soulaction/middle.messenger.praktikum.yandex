import Block from "../../framework/Block.ts";
import s from "./ChatPage.module.pcss";
import {ChatService} from "../../services/ChatService/ChatService";
import {DialogItem} from "../../components/DialogItem/DialogItem";
import {CircleButton} from "../../components/CircleButton/CircleButton";
import {LinkProfile} from "../../components/LinkProfile/LinkProfile.ts";
import {SearchInput} from "../../components/SearchInput/SearchInput.ts";
import {ButtonIcon} from "../../components/ButtonIcon/ButtonIcon.ts";

export class ChatPage extends Block {
    chatService: ChatService;

    constructor() {
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
                ButtonIconMenu: new ButtonIcon({
                    props: {
                        iconLink: '/icons/menu.svg',
                        className: s.iconMenu
                    }
                }),
                ButtonIconClip: new ButtonIcon({
                    props: {
                        iconLink: '/icons/clip.svg'
                    }
                }),
                CircleButton: new CircleButton({
                    props: {
                        className: s.sendMsgSubmit,
                        type: 'submit'
                    }
                })
            }
        });
        this.chatService = new ChatService();
    }

    protected override componentDidMount() {
        const chatList: DialogItem[] = this.chatService.getDialogItems();
        this.setLists({ChatList: chatList})
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
                            {{{ButtonIconMenu}}}
                        </div>
                        <div class="${s.correspondence}">
                             В разработке 
                        </div>
                        <form class="${s.sendMsgForm}" name="send-msg-form">
                            {{{ButtonIconClip}}}
                            <input class="${s.sendMsgInput}" name="message" placeholder="Сообщение"/>
                            {{{CircleButton}}}
                        </form>
                    </div>
                </main>`;
    }
}
