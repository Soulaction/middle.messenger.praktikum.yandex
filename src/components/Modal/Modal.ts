import s from './Modal.module.pcss';
import Block from '../../core/Block/Block.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';


export class Modal extends Block {

  constructor(uploadFileModalProps: BlockProperties) {
    super({
      ...uploadFileModalProps,
      events: {
        click: event => this.hideModal(event),
      },
    });
    super.hide();
  }

  openModel(): void {
    super.show();
  }

  hideModal(event: Event): void {
    if (event.target === event.currentTarget) {
      super.hide();
      event.stopPropagation();
    }

  }

  override render(): string {
    return `
                 <div class="${s.overlayPanel}">
                     <div class="${s.modal}">
                         {{{ContentModal}}}
                     </div>
                 </div>
                `;
  }
}
