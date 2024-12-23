import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import s from "./LinkProfile.module.pcss";

export type LinkProfileProps = {
    link: string;
}

export class LinkProfile extends Block {
    constructor(linkProps: BlockProperties<LinkProfileProps>) {
        super({
            ...linkProps
        });
    }

    override render(): string {
        return `<a class="${s.link}" href="{{link}}" >Профиль ></a>`;
    }
}
