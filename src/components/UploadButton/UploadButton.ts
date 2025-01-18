import s from './UploadButton.module.pcss';
import Block from '../../core/Block/Block.ts';
import {BlockProperties} from '../../core/Block/types/BlockProps.ts';
import {ValidationForm} from "../../core/Validation/ValidationForm.ts";

type UploadButtonProps<T> = {
    label: string;
    name: string;
    class?: string;
    validationFormService?: ValidationForm<T>;
};

export class UploadButton<T> extends Block {

    constructor(inputProps: BlockProperties<UploadButtonProps<T>>) {
        super({
            props: {
                ...inputProps.props,
            },
            events: {
                change: (event: Event): void => this.uploadFile(event)
            },
        });
    }

    uploadFile(event: Event): void {
        const props = this.props as UploadButtonProps<T>;
        const inputHTML: HTMLInputElement = event.target as HTMLInputElement;

        if (inputHTML.files && inputHTML.files[0]) {
            props.validationFormService?.setFormData(inputHTML);
            this.setProps({label: inputHTML.files[0].name});
        }
    }

    override render(): string {
        return `
                <label class="${s.label} {{class}}"
                       for="input-file">
                        {{label}}
                        <input id="input-file"
                               class="${s.input}"
                               accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                               name="{{name}}"
                               type="file"/>
                </label>
                `;
    }
}
