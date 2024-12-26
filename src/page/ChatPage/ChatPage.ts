import Block from "../../framework/Block.ts";
import s from "./ChatPage.module.pcss";
import {MessageBlock} from "../../components/MessageBlock/MessageBlock.ts";
import {DialogList} from "../../components/DialogList/DialogList.ts";
import {MessageItem} from "../../components/MessageItem/MessageItem";

export class ChatPage extends Block {

    constructor() {
        super({
            children: {
                DialogList: new DialogList(),
                MessageBlock: new MessageBlock()
            }
        });
    }

    protected override componentDidMount() {
        const messageList: MessageItem[] = this.chatService.getMessageItems('1');
    }

    override render(): string {
        return `<main class="${s.pageChatsWrapper}">
                    {{{DialogList}}}
                    {{{MessageBlock}}}
                </main>`;
    }
}
