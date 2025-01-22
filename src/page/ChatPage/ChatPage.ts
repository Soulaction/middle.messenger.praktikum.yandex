import s from './ChatPage.module.pcss';
import {ChatService} from '../../services/ChatService/ChatService.ts';
import Block from '../../core/Block/Block.ts';
import {Chat} from "../../api/ChatApi/types/Chats.ts";
import {ChatController} from "../../controllers/ChatController.ts";
import {MessageBlockWithStore} from "../../components/MessageBlock/MessageBlock.ts";
import {DialogListWithStore} from "../../components/DialogList/DialogList.ts";

export class ChatPage extends Block {
  chatApi: ChatController;

  chatService: ChatService;

  chats: Chat[] = [];

  constructor() {

    super({
      children: {
        DialogList: new DialogListWithStore({}),
        MessageBlock: new MessageBlockWithStore({}),
      },
    });
    this.chatService = new ChatService();
    this.chatApi = new ChatController();
  }

  // protected getMessages(indexDialog: number): void {
  //   const chatList: DialogItem[] = this.chatService.getDialogItems(this.chats, indexDialog, this.getMessages.bind(this));
  //   const messages: Message[] = this.chatApi.getMessageForChat(this.chats[indexDialog].id);
  //   const messageList: MessageItem[] = this.chatService.getMessageItems(messages);
  //
  //   this.setChildren({ DialogList: new DialogList({ props: { ChatList: chatList } }) });
  //   this.setChildren({
  //     MessageBlock: new MessageBlock({
  //       props: {
  //         chatName: this.chats[indexDialog].nameChat,
  //         chatIcon: this.chats[indexDialog].iconChatLink,
  //         messageList: messageList,
  //       },
  //     },
  //     ),
  //   });
  // }

  override render(): string {
    return `<main class="${s.pageChatsWrapper}">
                    {{{DialogList}}}
                    {{{MessageBlock}}}
                </main>`;
  }
}
