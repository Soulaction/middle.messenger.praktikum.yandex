import s from './Modal.module.pcss';
import Block from '../../core/Block/Block.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';
import { wrapStore } from '../../core/utils/wrapStore.ts';
import { Indexed } from '../../core/types/Indexed.ts';
import store from '../../core/Store.ts';
import { TypeModal } from '../../utils/const.ts';

export type ModalProps = {
  isOpenUploadFileModal?: boolean;
  isCreateChatModal?: boolean;
  isAddUserModal?: boolean;
  isRemoveUserModal?: boolean;
  typeModal?: string;
};

export class Modal extends Block {
  typeModal!: TypeModal;

  constructor(uploadFileModalProps: BlockProperties<ModalProps>) {
    super({
      ...uploadFileModalProps,
      events: {
        click: event => this.hideModal(event),
      },
    });
    this.typeModal = uploadFileModalProps.props!.typeModal! as TypeModal;
  }

  protected override componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
    console.log(oldProps);
    switch (this.typeModal) {
      case TypeModal.openUploadFileModal:
        this.toggleModal(newProps.isOpenUploadFileModal as boolean);
        break;
      case TypeModal.createChatModal:
        this.toggleModal(newProps.isCreateChatModal as boolean);
        break;
      case TypeModal.addUserModal:
        this.toggleModal(newProps.isAddUserModal as boolean);
        break;
      case TypeModal.removeUserModal:
        this.toggleModal(newProps.isRemoveUserModal as boolean);
        break;
    }

    return false;
  }

  toggleModal(isOpen: boolean): void {
    if (isOpen) {
      super.show();
    } else {
      super.hide();
    }
  }

  changeStateModal(isOpen: boolean):void {
    switch (this.typeModal) {
      case TypeModal.addUserModal:
        store.set('isAddUserModal', isOpen);
        break;
      case TypeModal.removeUserModal:
        store.set('isRemoveUserModal', isOpen);
        break;
      case TypeModal.createChatModal:
        store.set('isCreateChatModal', isOpen);
        break;
      case TypeModal.openUploadFileModal:
        store.set('isOpenUploadFileModal', isOpen);
        break;
    }
  }

  openModel(): void {
    this.changeStateModal(true);
  }

  hideModal(event: Event): void {
    if (event.target === event.currentTarget) {
      this.changeStateModal(false);
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
    isOpenUploadFileModal: state.isOpenUploadFileModal,
    isCreateChatModal: state.isCreateChatModal,
    isAddUserModal: state.isAddUserModal,
    isRemoveUserModal: state.isRemoveUserModal,
  };
})(Modal);
