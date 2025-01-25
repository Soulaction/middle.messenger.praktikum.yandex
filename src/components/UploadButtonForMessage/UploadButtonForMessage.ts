import s from './UploadButtonForMessage.module.pcss';
import Block from '../../core/Block/Block.ts';
import resourceController from "../../controllers/ResourceController.ts";

export class UploadButtonForMessage extends Block {

    constructor() {
        super({
            events: {
                change: (event: Event): void => this.uploadFile(event.target as HTMLInputElement)
            },
        });
    }

    uploadFile(inputElement: HTMLInputElement): void {
        if (inputElement.files) {
            resourceController.sendPhotoInMessage(inputElement.files);
        }
    }

    override render(): string {
        return `
                <label class="${s.label} {{class}}"
                       for="input-file">
                        <input id="input-file"
                               class="${s.input}"
                               accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                               name="{{name}}"
                               type="file"/>
                        <img class="${s.icon}" src="/icons/clip.svg" alt="Иконка кнопки"/>
                </label>
                `;
    }
}
