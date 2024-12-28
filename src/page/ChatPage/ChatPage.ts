import s from './ChatPage.module.pcss';
import { MessageBlock } from '../../components/MessageBlock/MessageBlock.ts';
import { DialogList } from '../../components/DialogList/DialogList.ts';
import { MessageItem } from '../../components/MessageItem/MessageItem';
import { ChatService } from '../../services/ChatService/ChatService.ts';
import { DialogItem } from '../../components/DialogItem/DialogItem.ts';
import { ChatApi } from '../../api/ChatApi.ts';
import { Chat } from '../../types/Chat.ts';
import { Message } from '../../types/Message.ts';
import Block from '../../core/Block/Block.ts';

export class ChatPage extends Block {
  chatApi: ChatApi;

  chatService: ChatService;

  chats: Chat[] = [];

  constructor() {

    super({
      children: {
        DialogList: new DialogList({
          props: {
            ChatList: [],
          },
        }),
      },
    });
    this.chatService = new ChatService();
    this.chatApi = new ChatApi();
  }

  protected override componentDidMount() {
    this.chats = this.chatApi.getChats();
    this.getMessages(0);
  }

  protected getMessages(indexDialog: number): void {
    const chatList: DialogItem[] = this.chatService.getDialogItems(this.chats, indexDialog, this.getMessages.bind(this));
    const messages: Message[] = this.chatApi.getMessageForChat(this.chats[indexDialog].id);
    const messageList: MessageItem[] = this.chatService.getMessageItems(messages);

    this.setChildren({ DialogList: new DialogList({ props: { ChatList: chatList } }) });
    this.setChildren({
      MessageBlock: new MessageBlock({
        props: {
          chatName: this.chats[indexDialog].nameChat,
          chatIcon: this.chats[indexDialog].iconChatLink,
          messageList: messageList,
        },
      },
      ),
    });
  }

  override render(): string {
    return `<main class="${s.pageChatsWrapper}">
                    {{{DialogList}}}
                    {{{MessageBlock}}}
                </main>`;
  }
}
