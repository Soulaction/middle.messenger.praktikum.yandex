import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import s from "./Button.module.pcss";

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
        return `<button class="${s.button} {{class}}" 
                        type="{{type}}">
                                        {{label}}
                </button>`;
    }
}
