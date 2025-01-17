import s from './Input.module.pcss';
import Block from '../../core/Block/Block.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';

type InputProps = {
  className?: string;
  value?: string;
  rightPlaceholder?: boolean;
  id?: string;
  type?: string;
  placeholder?: string;
  name?: string;
};

export class Input extends Block {
  constructor(inputProps: BlockProperties<InputProps>) {
    super({
      ...inputProps,
    });
  }

  override render(): string {
    return `
                <input class="${s.input} {{className}} {{#if rightPlaceholder}}${s.rightPlaceholder}{{/if}}"
                       id="{{id}}"
                       name="{{name}}"
                       value="{{value}}"
                       type="{{type}}"
                       placeholder="{{placeholder}}"
                       />
                `;
  }
}
