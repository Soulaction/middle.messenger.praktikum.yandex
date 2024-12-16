import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";

type InputProps = {
    className?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    name?: string;
}

export class Input extends Block {
    constructor(inputProps: BlockProperties<InputProps>) {
        super({
            ...inputProps,
            events: {
                change: (e: Event) => {
                    console.log(e)
                },
            }
        });
    }

    override render(): string {
        return `
                <input class="input {{className}}"
                       id="{{id}}"
                       name="{{name}}"
                       type="{{type}}"
                       placeholder="{{placeholder}}"
                       />
                `;
    }
}
