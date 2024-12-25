import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import s from "./ContextMenuItem.module.pcss";

export type ContextMenuItemProps = {
    iconURL: string;
    text: string;
}

export class ContextMenuItem extends Block {
    constructor(contextMenuItemProps: BlockProperties<ContextMenuItemProps>) {
        super({
            ...contextMenuItemProps,
        });
    }

    override render(): string {
        return `
                  <li class="${s.contextListItem}">
                      <img class="${s.listItemIcon}" src="{{this.iconURL}}" alt="Иконка пункта меню"/>
                      {{this.text}}
                  </li>
                `;
    }
}
