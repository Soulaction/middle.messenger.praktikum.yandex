import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import s from "./MessageItem.module.pcss";

export type MessageProps = {
    linkImg: string | null;
    text: string | null;
    meMessage: boolean;
    newDay: string | null
    dateMsg: string;
}

export class MessageItem extends Block {
    constructor(messageProps: BlockProperties<MessageProps>) {
        super({
            ...messageProps
        });
    }

    override render(): string {
        return `<div class="${s.message}">
                    {{#if linkImg}}
                        <div class="${s.messageImgBlock}">
                            <img class="${s.messageImg}" src="{{linkImg}}" alt="Сообщение с картинкой"/>
                            <span class="${s.messageImgDate}">{{dateMsg}}</span>
                        </div>
                    {{else}}
                        <p class="${s.messageText}">
                            {{text}}
                            <span class="${s.messageTextDate}">{{dateMsg}}</span>
                        </p>
                    {{/if}}
                </div>`;
    }
}
