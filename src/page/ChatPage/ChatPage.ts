import Block from "../../framework/Block.ts";
import s from "./ChatPage.module.pcss";
import {MessageBlock} from "../../components/MessageBlock/MessageBlock.ts";
import {DialogList} from "../../components/DialogList/DialogList.ts";

export class ChatPage extends Block {

    constructor() {
        super({
            children: {
                DialogList: new DialogList(),
                MessageBlock: new MessageBlock()
            }
        });
    }

    override render(): string {
        return `<main class="${s.pageChatsWrapper}">
                    {{{DialogList}}}
                    {{{MessageBlock}}}
                </main>`;
    }
}
