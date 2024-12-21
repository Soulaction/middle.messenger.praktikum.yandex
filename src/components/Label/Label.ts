import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import s from "./Label.module.pcss";

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
        return `<label class="${s.label} {{className}}" for="{{for}}">{{label}}</label>`;
    }
}

