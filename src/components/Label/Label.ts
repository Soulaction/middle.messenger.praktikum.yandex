import s from './Label.module.pcss';
import Block from '../../core/Block/Block.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';

type LabelProps = {
  className?: string;
  for?: string;
  label: string;
};

export class Label extends Block {
  constructor(labelProps: BlockProperties<LabelProps>) {
    super({
      ...labelProps,
    });
  }

  override render(): string {
    return `<label class="${s.label} {{className}}" for="{{for}}">{{label}}</label>`;
  }
}

