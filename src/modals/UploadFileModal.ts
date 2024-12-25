import Block from "../framework/Block";
import {Button} from "../components/Button/Button";
import {ErrorMessage} from "../components/ErrorMessage/ErrorMessage";
import {ValidationFormService} from "../services/AuthorizationService/ValidationFormService";
import {BlockProperties} from "../framework/types/BlockProps";
import s from "./UploadFileModal.module.pcss";
import {UploadButton} from "../components/UploadButton/UploadButton.ts";

type FormDataFile = {
    file: string;
}

type UploadFileModalProps = {
    titleModal?: string;
}

export class UploadFileModal extends Block {
    validationService: ValidationFormService<FormDataFile>;

    constructor(uploadFileModalProps: BlockProperties<UploadFileModalProps>) {
        const validationService = new ValidationFormService<FormDataFile>();

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
                        type: 'reset',
                        class: s.submitBtn
                    },
                    events: {
                        click: () => this.validationService.checkValidity()
                    }
                }),
                Error: new ErrorMessage<FormDataFile>({
                    props: {
                        formName: 'file',
                        validationFormService: validationService
                    }
                }),
            },
            events: {
                click: event => this.hideModal(event)
            }
        });
        this.validationService = validationService;
        super.hide()
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
                         <form class="${s.form}" name="upload-file">
                             <h1 class="${s.titleModal}">{{titleModal}}</h1>
                             {{{UploadButton}}}
                             {{{Button}}}
                             {{{Error}}}
                         </form>
                     </div>
                 </div>
                `;
    }
}
