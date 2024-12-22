import Block from "../../framework/Block.ts";
import s from "./UploadButton.module.pcss";
import {BlockProperties} from "../../framework/types/BlockProps.ts";

type UploadButtonProps = {
    label: string;
    name: string;
    class?: string;
}

export class UploadButton extends Block {

    constructor(inputProps: BlockProperties<UploadButtonProps>) {
        super({
            props: {
                ...inputProps.props
            },
            events: {
                change: (event: Event): void => this.uploadFile(event)
            }
        });
    }

    uploadFile(event: Event): void {
        const inputHTML: HTMLInputElement = event.target as HTMLInputElement;
        console.log(inputHTML);
    }

    override render(): string {
        return `
                  <div class="{{class}}">
                        <label class="${s.label}"
                               for="input-file">
                                {{label}}
                        </label>
                        <input id="input-file"
                               class="${s.input}"
                               name="{{name}}"
                               type="file"/>
                  </div>
                `;
    }
}
