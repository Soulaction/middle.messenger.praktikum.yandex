import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";

type ChatProps = {
    iconChatLink: string;
    nameChat: string;
    lastMsg: string;
    time: string;
    countMsg: number;
}

export class DialogItem extends Block {
    constructor(chatProps: BlockProperties<ChatProps>) {
        super({
            ...chatProps
        });
    }

    override render(): string {
        return `<li class="chat-item">
                    <img class="chat-icon" src="{{iconChatLink}}" alt="Иконка чата"/>
                    <div class="chat-block">
                        <div class="chat-info">
                            <h2 class="chat-name-chat">{{nameChat}}</h2>
                            <p class="chat-last-msg"><span class="chat-last-msg-me">Вы: </span>{{lastMsg}}</p>
                        </div>
                        <div class="chat-content">
                            <span class="chat-time">{{time}}</span>
                            <span class="chat-count-msg">{{countMsg}}</span>
                        </div>
                    </div>
                </li>`;
    }
}
