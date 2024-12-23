import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import s from "./ButtonIcon.module.pcss";

export type ButtonIconProps = {
    iconLink: string;
    className?: string;
}

export class ButtonIcon extends Block {
    constructor(linkProps: BlockProperties<ButtonIconProps>) {
        super({
            ...linkProps
        });
    }

    override render(): string {
        return `<button class="${s.button} {{className}}" type="button">
                    <img class="${s.icon}" src="{{iconLink}}" alt="Иконка кнопки"/>
                </button`;
    }
}
