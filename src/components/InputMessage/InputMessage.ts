import s from './InputMessage.module.pcss';
import Block from '../../core/Block/Block.ts';
import {BlockProperties} from "../../core/Block/types/BlockProps.ts";

export class InputMessage extends Block {
    constructor(inputProps: BlockProperties) {
        super({
            ...inputProps,
        });
    }

    override render(): string {
        return `<input class="${s.sendMsgInput}" name="message" placeholder="Сообщение"/>`;
    }
}
