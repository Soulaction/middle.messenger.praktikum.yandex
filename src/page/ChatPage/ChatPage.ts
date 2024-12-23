import Block from "../../framework/Block.ts";
import s from "./ChatPage.module.pcss";
import {ChatService} from "../../services/ChatService/ChatService";
import {DialogItem} from "../../components/DialogItem/DialogItem";
import {CircleButton} from "../../components/CircleButton/CircleButton";


export class ChatPage extends Block {
    chatService: ChatService;

    constructor() {
        super({
            children: {
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
                        <ul class="${s.listChat}">
                                {{{ChatList}}}
                        </ul>
                    </div>
                    <div class="${s.chat}">
                        <div class="correspondence">
                             В разработке 
                        </div>
                        <form class="${s.sendMsgForm}" name="send-msg-form">
                            <input class="send-msg-input" name="message" placeholder="Сообщение"/>
                            {{{CircleButton}}}
                        </form>
                    </div>
                </main>`;
    }
}
