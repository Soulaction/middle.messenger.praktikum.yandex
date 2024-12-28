import s from './Button.module.pcss';
import Block from '../../core/Block/Block.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';

type ButtonProps = {
  class?: string;
  label: string;
  type?: string;
};

export class Button extends Block {
  constructor(buttonProps: BlockProperties<ButtonProps>) {
    super({
      ...buttonProps,
    });
  }

  override render(): string {
    return `<button class="${s.button} {{class}}" 
                        type="{{type}}">
                                        {{label}}
                </button>`;
  }
}
