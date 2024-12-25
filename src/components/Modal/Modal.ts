import s from "./Modal.module.pcss";
import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";


export class Modal extends Block {

    constructor(uploadFileModalProps: BlockProperties) {
        super({
            ...uploadFileModalProps,
            events: {
                click: event => this.hideModal(event)
            }
        });
        super.hide()
    }

    openModel(): void {
        this.show();
    }

    override show(): void {
        const content = this.getContent();
        if (content) {
            content.style.display = 'flex';
        }
    }

    hideModal(event: Event): void {
        if (event.target === event.currentTarget) {
            super.hide()
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
