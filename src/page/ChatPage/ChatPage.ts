import Block from "../../framework/Block.ts";
import s from "./ChatPage.module.pcss";
import {ChatApi} from "../../api/ChatApi";
import {ChatService} from "../../services/ChatService/ChatService";
import {DialogItem} from "../../components/DialogItem/DialogItem";


export class ChatPage extends Block {
    chatService: ChatService;

    constructor() {
        super();
        this.chatService = new ChatService();
    }

    protected override componentDidMount() {
        const chatList: DialogItem[] = this.chatService.getDialogItems();
        this.setLists({ChatList: chatList})
    }

    override render(): string {
        return `<main class="page-chats-wrapper">
                    <div class="left-panel-chat">
                        <ul class="list-chat">
                                {{{ChatList}}}
                        </ul>
                    </div>
                    <div class="chat">
                        <div class="correspondence">
                             В разработке 
                        </div>
                        <form class="send-msg-form" name="send-msg-form">
                            <input class="send-msg-input" name="message" placeholder="Сообщение"/>
                            <button class="button-row send-msg-submit" type="submit"></button>
                        </form>
                    </div>
                </main>`;
    }
}
