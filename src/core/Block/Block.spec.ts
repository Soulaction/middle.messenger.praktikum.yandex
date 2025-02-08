import { expect } from 'chai';
import Block from './Block.ts';


describe('Проверка функциональности модуля HTTPTransport', () => {
  const appContainer: HTMLElement | null = document.getElementById('app') as HTMLElement;
  if (!appContainer) {
    throw new Error('Not found app div');
  }

  class Messenger extends Block {

    protected override render(): string {
      return '<main id="messenger">{{test}}</main>';
    }
  }

  let messengerBlock;

  beforeEach(() => {
    messengerBlock = new Messenger({ props: { test: 'test' } });
    appContainer.innerHTML = '';
    appContainer.appendChild(messengerBlock.getContent());
  });

  it('Проверка прорисовки компоненты', () => {
    const htmlElement = document.getElementById('messenger');
    expect(htmlElement).to.not.eql(null);
  });

  it('Проверка перерисовки при установлении новых props)', () => {
    messengerBlock!.setProps({ test: 'newText' });
    const htmlElement = document.getElementById('messenger');
    expect(htmlElement!.textContent).to.eql('newText');
  });
});
