import s from './ContextMenuItem.module.pcss';
import Block from '../../core/Block/Block.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';

export type ContextMenuItemProps = {
  iconURL: string;
  text: string;
};

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
