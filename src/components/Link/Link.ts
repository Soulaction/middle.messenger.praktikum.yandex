import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";

type LinkProps = {
    class?: string;
    label: string;
    link: string;
}

export class Link extends Block {
    constructor(linkProps: BlockProperties<LinkProps>) {
        super({
            ...linkProps
        });
    }

    override render(): string {
        return `<a class="link {{class}}" href="{{link}}" >{{label}}</a>`;
    }
}
