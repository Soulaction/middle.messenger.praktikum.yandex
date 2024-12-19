import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";

type ButtonProps = {
    class?: string;
    label: string;
    type?: string;
}

export class Button extends Block {
    constructor(buttonProps: BlockProperties<ButtonProps>) {
        super({
            ...buttonProps
        });
    }

    override render(): string {
        return `<button class="button {{class}}" 
                        type="{{type}}">
                                        {{label}}
                </button>`;
    }
}
