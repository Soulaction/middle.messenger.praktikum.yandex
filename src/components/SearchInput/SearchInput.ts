import s from './SearchInput.module.pcss';
import Block from '../../core/Block/Block.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';

export type SearchInputProps = {
  placeholder?: string;
  className?: string;
};

export class SearchInput extends Block {
  constructor(linkProps: BlockProperties<SearchInputProps>) {
    super({
      ...linkProps,
    });
  }

  override render(): string {
    return `<input class="${s.inputSearch} {{className}}" placeholder="{{placeholder}}"/>`;
  }
}
