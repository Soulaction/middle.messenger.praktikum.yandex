import s from './Link.module.pcss';
import Block from '../../core/Block/Block.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';

type LinkProps = {
  class?: string;
  label: string;
  danger?: boolean;
};

export class Link extends Block {
  constructor(linkProps: BlockProperties<LinkProps>) {
    super({
      ...linkProps,
    });
  }

  override render(): string {
    return `<a class="${s.link} {{#if danger}}${s.danger}{{/if}} {{class}}" href="#" >{{label}}</a>`;
  }
}
