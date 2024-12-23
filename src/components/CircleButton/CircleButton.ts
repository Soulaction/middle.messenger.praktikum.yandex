import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import s from "./CircleButton.module.pcss";

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
