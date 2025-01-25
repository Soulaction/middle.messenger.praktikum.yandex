import s from './MessageBlock.module.pcss';
import Block from '../../core/Block/Block.ts';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import { wrapStore } from '../../core/utils/wrapStore.ts';
import { Chat } from '../../api/ChatApi/types/Chats.ts';
import { EqualType, isEqual } from '../../core/utils/isEqual.ts';
import { MessageBlockHeaderWithStore } from '../MessageBlockHeader/MessageBlockHeader.ts';
import { Message } from '../../types/Message.ts';
import { ChatService } from '../../services/ChatService/ChatService.ts';
import { MessageBlockForm } from '../MessageBlockForm/MessageBlockForm.ts';

type FormDataMessageBlock = {
  message: string;
};

export type MessageBlockProps = {
  isNotMsg?: boolean,
  selectedChat: Chat | undefined,
  isSelectedChat?: Chat | undefined,
  message?: Message[]
};

class MessageBlock extends Block {
  validationService: ValidationForm<FormDataMessageBlock>;

  chatService: ChatService = new ChatService();

  constructor() {
    const validationService = new ValidationForm<FormDataMessageBlock>();

    super({
      children: {
        MessageBlockHeader: new MessageBlockHeaderWithStore({}),
      },
    });
    this.validationService = validationService;
  }

  protected override componentDidUpdate(oldProps: EqualType, newProps: EqualType): boolean {
    const isChangeSelectedChat = !isEqual(oldProps?.selectedChat, newProps?.selectedChat);
    const isChangeSelected = !!newProps?.isSelectedChat && !isEqual(oldProps?.isSelectedChat, newProps?.isSelectedChat);
    const isChangeMessage = !!newProps?.message && !isEqual(oldProps?.message, newProps?.message);

    if (isChangeSelectedChat && newProps?.selectedChat) {
      this.setProps({
        isSelectedChat: true,
      });
    } else if (isChangeSelectedChat && !newProps?.selectedChat) {
      this.setProps({
        isSelectedChat: false,
      });
    } else if (isChangeSelected && newProps?.isSelectedChat) {
      const messageBlockForm: MessageBlockForm = new MessageBlockForm();

      this.setChildren({
        MessageBlockForm: messageBlockForm,
      });
      messageBlockForm.dispatchComponentDidMount();
    } else if (isChangeMessage && newProps?.message) {
      this.setLists({ MessageList: this.chatService.getMessageItems(newProps?.message) });
    } else if (newProps?.MessageList && newProps?.MessageList.length > 0) {
      this.setProps({
        isNotMsg: true,
      });
    }

    return true;
  }

  override render(): string {
    return `<div class="${s.chat}">
                    {{#if isSelectedChat}}
                        {{{MessageBlockHeader}}}
                        {{#if isNotMsg}}
                        <div class="${s.correspondence}">
                             {{{MessageList}}}
                        </div>
                        {{else}}
                        <div class="${s.noMessage}">
                             <h2 class="${s.messageTitle}">Нет сообщений, начните диалог</h2>
                        </div>
                        {{/if}}
                        {{{MessageBlockForm}}}                  
                    {{else}}
                         <h2 class="${s.messageTitle}">Выберете диалог</h2>   
                    {{/if}}
                </div>`;
  }
}

export const MessageBlockWithStore = wrapStore<MessageBlockProps>((state) => {
  return {
    selectedChat: state.selectedChat?.data,
    message: state.message?.data,
  };
})(MessageBlock);
