import s from './DialogItem.module.pcss';
import Block from '../../core/Block/Block.ts';
import {BlockProperties} from '../../core/Block/types/BlockProps.ts';
import {Chat} from "../../api/ChatApi/types/Chats.ts";
import {getAvatar} from "../../utils/utils.ts";

type ChatProps = {
    selected?: boolean;
} & Chat;

export class DialogItem extends Block {
    constructor(chatProps: BlockProperties<ChatProps>) {
        if (chatProps.props) {
            chatProps.props.avatar = getAvatar(chatProps.props?.avatar)
        }

        super({
            ...chatProps,
        });
    }

    override render(): string {
        return `<li class="${s.chatItem} {{#if selected}}${s.chatItemSelected}{{/if}}">
                    <div class="${s.chatBlock}">
                        <img class="${s.chatIcon}" src="{{avatar}}" alt="Иконка чата"/>
                        <div class="${s.chatInfo}">
                            <h2 class="${s.chatNameChat}">{{title}}</h2>
                            {{#if countMsg}}<p class="${s.chatLastMsg}"><span class="${s.chatLastMsgMe}">Вы: </span>{{lastMsg}}</p>{{/if}}
                        </div>
                        <div class="${s.chatContent}">
                            <span class="${s.chatTime}">{{time}}</span>
                            {{#if unread_count}}<span class="${s.chatCountMsg}">{{unread_count}}</span>{{/if}}
                        </div>
                    </div>
                    {{{ContextMenu}}}
                </li>`;
    }
}
