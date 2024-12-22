import Block from "../framework/Block";
import {Button} from "../components/Button/Button";
import {ErrorMessage} from "../components/ErrorMessage/ErrorMessage";
import {FormDataRegistration} from "../page/Registration/RegistrationPage";
import {ValidationFormService} from "../services/AuthorizationService/ValidationFormService";
import {BlockProperties} from "../framework/types/BlockProps";
import s from "./UploadFileModal.module.pcss";

type FormDataRegistration = {
    file: string;
}

type UploadFileModalProps = {
    isView: boolean;
    titleModal: string;
}

export class UploadFileModal extends Block {
    validationService: ValidationFormService<FormDataRegistration>;

    constructor(uploadFileModalProps: BlockProperties<UploadFileModalProps>) {
        const validationService = new ValidationFormService<FormDataRegistration>();

        super({
            props: {
                titleModal: 'Нужно выбрать файл',
                ...uploadFileModalProps.props
            },
            children: {
                Button: new Button({
                    props: {
                        label: 'Поменять',
                        type: 'reset'
                    },
                    events: {
                        click: () => console.log()
                    }
                }),
                Error: new ErrorMessage<FormDataRegistration>({
                    props: {
                        formName: 'file',
                        validationFormService: validationService
                    }
                }),
            },
            events: {
                click: event => console.log(event.target, event.currentTarget)
            }
        });
        this.validationService = validationService;
    }

    override componentDidMount() {
        this.validationService.init('file', {
            email: {
                errors: {
                    required: {rule: true, message: 'Нужно выбрать файл'}
                }
            }
        });
    }

    override render(): string {
        return `
                        {{#if isView}}
                            <div class="${s.overlayPanel}">
                                <div class="${s.modal}">
                                    <h1>{{titleModal}}</h1>
                                    
                                </div>
                            </div>
                        {{/if}}
                `;
    }
}
