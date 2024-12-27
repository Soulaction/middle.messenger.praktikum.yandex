import s from "./ButtonIcon.module.pcss";
import Block from "../../core/Block/Block.ts";
import {BlockProperties} from "../../core/Block/types/BlockProps.ts";

export type ButtonIconProps = {
    iconLink: string;
    className?: string;
}

export class ButtonIcon extends Block {
    constructor(buttonIconProps: BlockProperties<ButtonIconProps>) {
        super({
            ...buttonIconProps
        });
    }

    override render(): string {
        return `<button class="${s.button} {{className}}" type="button">
                    <img class="${s.icon}" src="{{iconLink}}" alt="Иконка кнопки"/>
                </button`;
    }
}
