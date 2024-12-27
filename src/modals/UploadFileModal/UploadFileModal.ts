import {Button} from "../../components/Button/Button.ts";
import {ErrorMessage} from "../../components/ErrorMessage/ErrorMessage.ts";
import s from "./UploadFileModal.module.pcss";
import {UploadButton} from "../../components/UploadButton/UploadButton.ts";
import Block from "../../core/Block/Block.ts";
import {ValidationForm} from "../../core/Validation/ValidationForm.ts";
import {BlockProperties} from "../../core/Block/types/BlockProps.ts";

type FormDataFile = {
    file: string;
}

type UploadFileModalProps = {
    titleModal?: string;
}

export class UploadFileModal extends Block {
    validationService: ValidationForm<FormDataFile>;

    constructor(uploadFileModalProps: BlockProperties<UploadFileModalProps>) {
        const validationService = new ValidationForm<FormDataFile>();

        super({
            props: {
                titleModal: 'Нужно выбрать файл',
                ...uploadFileModalProps.props
            },
            children: {
                UploadButton: new UploadButton(
                    {
                        props: {
                            label: 'Выбрать файл на компьютере',
                            name: 'file',
                            class: s.uploadFile
                        }
                    }),
                Button: new Button({
                    props: {
                        label: 'Поменять',
                        type: 'submit',
                        class: 'submit-btn-modal'
                    },
                    events: {
                        click: (event: Event) => this.uploadFile(event)
                    }
                }),
                Error: new ErrorMessage<FormDataFile>({
                    props: {
                        formName: 'file',
                        validationFormService: validationService
                    }
                }),
            }
        });
        this.validationService = validationService;
    }

    override componentDidMount() {
        this.validationService.init('upload-file', {
            file: {
                errors: {
                    required: {rule: true, message: 'Нужно выбрать файл'}
                }
            }
        });
    }

    uploadFile(event: Event): void {
        event.preventDefault();
        this.validationService.checkValidity();
        console.log(this.validationService.getFormValue());
    }

    override render(): string {
        return `
                 <form class="form-modal" name="upload-file">
                     <h1 class="title-modal">{{titleModal}}</h1>
                     {{{UploadButton}}}
                     {{{Button}}}
                     {{{Error}}}
                 </form>
                `;
    }
}
