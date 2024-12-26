import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import s from "./DialogItem.module.pcss";

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
        return `<li class="${s.chatItem} {{#if selected}}${s.chatItemSelected}{{\if}}">
                    <img class="${s.chatIcon}" src="{{iconChatLink}}" alt="Иконка чата"/>
                    <div class="${s.chatBlock}">
                        <div class="${s.chatInfo}">
                            <h2 class="${s.chatNameChat}">{{nameChat}}</h2>
                            <p class="${s.chatLastMsg}"><span class="${s.chatLastMsgMe}">Вы: </span>{{lastMsg}}</p>
                        </div>
                        <div class="${s.chatContent}">
                            <span class="${s.chatTime}">{{time}}</span>
                            <span class="${s.chatCountMsg}">{{countMsg}}</span>
                        </div>
                    </div>
                </li>`;
    }
}
