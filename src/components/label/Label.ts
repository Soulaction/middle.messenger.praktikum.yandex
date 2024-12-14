import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";

type LabelProps = {
    className?: string;
    for?: string;
    label: string;
}

export class Label extends Block {
    constructor(labelProps: BlockProperties<LabelProps>) {
        super({
            ...labelProps
        });
    }

    override render(): string {
        return `<label class="label {{className}}" for="{{for}}">{{label}}</label>`;
    }
}

