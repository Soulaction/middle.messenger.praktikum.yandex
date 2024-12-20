import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import s from "./Link.module.pcss";

type LinkProps = {
    class?: string;
    label: string;
    link: string;
    danger?: boolean;
}

export class Link extends Block {
    constructor(linkProps: BlockProperties<LinkProps>) {
        super({
            ...linkProps
        });
    }

    override render(): string {
        return `<a class="${s.link} {{#if danger}}${s.danger}{{/if}} {{class}}" href="{{link}}" >{{label}}</a>`;
    }
}
