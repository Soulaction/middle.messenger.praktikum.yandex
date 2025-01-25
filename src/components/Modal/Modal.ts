import s from './Modal.module.pcss';
import Block from '../../core/Block/Block.ts';
import {BlockProperties} from '../../core/Block/types/BlockProps.ts';
import {wrapStore} from "../../core/utils/wrapStore.ts";
import {Indexed} from "../../core/types/Indexed.ts";
import store from "../../core/Store.ts";

export type ModalProps = {
  isOpenModal?: boolean;
};

export class Modal extends Block {

  constructor(uploadFileModalProps: BlockProperties) {
    super({
      ...uploadFileModalProps,
      events: {
        click: event => this.hideModal(event),
      },
    });
  }

  protected override componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
    console.log(oldProps);
    if(newProps.isOpenModal) {
      super.show();
    } else {
      super.hide();
    }
    return false;
  }

  openModel(): void {
    store.set('isOpenModal', true);
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

export const ModalWithStore = wrapStore<ModalProps>((state) => {
  return {
    isOpenModal: state.isOpenModal,
  };
})(Modal);
