import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import s from "./ContextMenu.module.pcss";

export type PositionContextMenu = {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}

export type MenuItem = {
    iconURL: string;
    text: string;
    event: () => void;
}

type ContextMenuProps = {
    items: MenuItem[];
} & PositionContextMenu;

export class ContextMenu extends Block {
    constructor(contextMenuProps: BlockProperties<ContextMenuProps>) {
        super({
            ...contextMenuProps,
            events: {
                click: () => this.hideContextMenu()
            }
        });
        super.hide();
    }

    openContextMenu(positionContextMenu: PositionContextMenu): void {
        this.setProps(positionContextMenu);
        super.show();
    }

    hideContextMenu(): void {
        super.hide();
    }

    override render(): string {
        return `
                    <div class="${s.contextWrapper}">
                        <ul class="${s.contextList}" 
                            style="{{#if top}}top: {{top}}px;{{/if}}
                                   {{#if left}}left: {{left}}px;{{/if}}
                                   {{#if right}}right: {{right}}px;{{/if}}
                                   {{#if bottom}}bottom: {{bottom}}px;{{/if}}">
                            {{#each items}}
                                <li class="${s.contextListItem}">
                                    <img class="${s.listItemIcon}" src="{{this.iconURL}}" alt="Иконка кнопки"/>
                                    {{this.text}}
                                </li>
                            {{/each}}
                        </ul
                    </div>
                `;
    }
}
