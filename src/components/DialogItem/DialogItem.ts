import s from "./DialogItem.module.pcss";
import Block from "../../core/Block/Block.ts";
import {BlockProperties} from "../../core/Block/types/BlockProps.ts";

type ChatProps = {
    iconChatLink: string;
    selected?: boolean;
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
        return `<li class="${s.chatItem} {{#if selected}}${s.chatItemSelected}{{/if}}">
                    <div class="${s.chatBlock}">
                        <img class="${s.chatIcon}" src="{{iconChatLink}}" alt="Иконка чата"/>
                        <div class="${s.chatInfo}">
                            <h2 class="${s.chatNameChat}">{{nameChat}}</h2>
                            {{#if countMsg}}<p class="${s.chatLastMsg}"><span class="${s.chatLastMsgMe}">Вы: </span>{{lastMsg}}</p>{{/if}}
                        </div>
                        <div class="${s.chatContent}">
                            <span class="${s.chatTime}">{{time}}</span>
                            {{#if countMsg}}<span class="${s.chatCountMsg}">{{countMsg}}</span>{{/if}}
                        </div>
                    </div>
                </li>`;
    }
}
