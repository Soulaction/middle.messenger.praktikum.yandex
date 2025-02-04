import s from './MessageItem.module.pcss';
import Block from '../../core/Block/Block.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';

export type MessageProps = {
  linkImg: string | null;
  content: string | null;
  meMessage: boolean;
  time: string;
};

export class MessageItem extends Block {
  constructor(messageProps: BlockProperties<MessageProps>) {
    super({
      ...messageProps,
    });
  }

  override render(): string {
    return `<div class="${s.message} {{#if meMessage}}${s.messageMe}{{/if}}">
                    {{#if linkImg}}
                        <div class="${s.messageImgBlock}">
                            <img class="${s.messageImg}" src="{{linkImg}}" alt="Сообщение с картинкой"/>
                            <span class="${s.textDate} ${s.messageImgDate}">{{time}}</span>
                        </div>
                    {{else}}
                        <p class="${s.messageText} {{#if meMessage}}${s.messageTextMe}{{/if}}">{{content}}<span class="${s.textDate} {{#if meMessage}}${s.textDateIcon}{{/if}}">{{time}}</span></p>
                    {{/if}}
                </div>`;
  }
}
