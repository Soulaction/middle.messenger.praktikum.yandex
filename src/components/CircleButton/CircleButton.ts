import s from "./CircleButton.module.pcss";
import Block from "../../core/Block/Block.ts";
import {BlockProperties} from "../../core/Block/types/BlockProps.ts";

type CircleButtonProps = {
    className?: string;
    type: string;
}

export class CircleButton extends Block {
    constructor(circleButtonProps: BlockProperties<CircleButtonProps>) {
        super({
            ...circleButtonProps
        });
    }

    override render(): string {
        return `<button class="${s.buttonRow} {{className}}" type="{{type}}"></button>`;
    }
}
