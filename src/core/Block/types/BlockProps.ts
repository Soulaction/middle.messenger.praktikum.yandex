import Block from '../Block.ts';

export type BlockProperties<T extends object = object> = {
  props?: T,
  children?: Record<string, Block>,
  lists?: Record<string, Block[]>,
  events?: Record<string, EventBlock>
};

export type BlockProps = BlockProperties['props'];

export type EventBlock = (event: Event) => void;