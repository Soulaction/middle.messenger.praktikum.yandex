import { Chat } from '../types/Chat';
import { chats, message } from '../utils/const';
import { Message } from '../types/Message.ts';
import {BaseApi} from "./BaseApi.ts";

export class ChatApi extends BaseApi{

  getChats(): Chat[] {
    return chats;
  }

  getMessageForChat(id: string): Message[] {
    return message.filter(el => el.idChat === id);
  }
}

export default new ChatApi('');
