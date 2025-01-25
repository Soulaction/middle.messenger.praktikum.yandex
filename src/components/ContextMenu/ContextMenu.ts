import s from './ContextMenu.module.pcss';
import { ContextMenuItem } from '../ContextMenuItem/ContextMenuItem.ts';
import Block from '../../core/Block/Block.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';

export type PositionContextMenu = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type MenuItem = {
  iconURL: string;
  text: string;
  event: (event: Event) => void;
};

type ContextMenuProps = {
  items: MenuItem[];
} & PositionContextMenu;

export class ContextMenu extends Block {
  constructor(contextMenuProps: BlockProperties<ContextMenuProps>) {
    super({
      ...contextMenuProps,
      lists: {
        MenuItems: contextMenuProps.props!.items.map(item => {
          return new ContextMenuItem({
            props: {
              iconURL: item.iconURL,
              text: item.text,
            },
            events: {
              click: item.event,
            },
          });
        }),
      },
      events: {
        click: () => this.hideContextMenu(),
      },
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
                                {{{MenuItems}}}
                        </ul
                    </div>
                `;
  }
}
