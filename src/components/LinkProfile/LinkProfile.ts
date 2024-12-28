import s from './LinkProfile.module.pcss';
import Block from '../../core/Block/Block.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';

export class LinkProfile extends Block {
  constructor(linkProps: BlockProperties) {
    super({
      ...linkProps,
    });
  }

  override render(): string {
    return `<a class="${s.link}" href="#" >Профиль ></a>`;
  }
}
