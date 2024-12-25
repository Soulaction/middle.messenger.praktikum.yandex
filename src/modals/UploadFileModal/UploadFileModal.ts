import Block from "../../framework/Block.ts";
import {Button} from "../../components/Button/Button.ts";
import {ErrorMessage} from "../../components/ErrorMessage/ErrorMessage.ts";
import {ValidationFormService} from "../../services/AuthorizationService/ValidationFormService.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import s from "./UploadFileModal.module.pcss";
import {UploadButton} from "../../components/UploadButton/UploadButton.ts";

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
