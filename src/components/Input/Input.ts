import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import s from "./Input.module.pcss";

type InputProps = {
    className?: string;
    rightPlaceholder?: boolean;
    id?: string;
    type?: string;
    placeholder?: string;
    name?: string;
}

export class Input extends Block {
    constructor(inputProps: BlockProperties<InputProps>) {
        super({
            ...inputProps
        });
    }

    override render(): string {
        return `
                <input class="${s.input} {{className}} {{#if rightPlaceholder}}${s.rightPlaceholder}{{/if}}"
                       id="{{id}}"
                       name="{{name}}"
                       type="{{type}}"
                       placeholder="{{placeholder}}"
                       />
                `;
    }
}
