import Block from "../../framework/Block.ts";
import {Button} from "../../components/Button/Button.ts";
import {ValidationFormService} from "../../services/AuthorizationService/ValidationFormService.ts";
import {InputForm} from "../../components/InputForm/InputForm.ts";

type FormDataCreateChat = {
    name: string;
}

export class CreateChatModal extends Block {
    validationService: ValidationFormService<FormDataCreateChat>;

    constructor() {
        const validationService = new ValidationFormService<FormDataCreateChat>();

        super({
            props: {
                titleModal: 'Создать чат'
            },
            children: {
                InputFormName: new InputForm<FormDataCreateChat>({
                    props: {
                        label: 'Наименование чата',
                        name: 'name',
                        type: 'text',
                        placeholder: 'Введите наименование чата',
                        className: 'input-for-modal',
                        validationService
                    }
                }),
                Button: new Button({
                    props: {
                        label: 'Создать',
                        type: 'reset',
                        class: 'submit-btn-modal'
                    },
                    events: {
                        click: () => this.validationService.checkValidity()
                    }
                })
            }
        });
        this.validationService = validationService;
    }

    override componentDidMount() {
        this.validationService.init('chat-create', {
            name: {
                errors: {
                    required: {rule: true, message: 'Нужно ввести наименование чата'}
                }
            }
        });
    }

    override render(): string {
        return `
                 <form class="form-modal" name="chat-create">
                     <h1 class="title-modal">{{titleModal}}</h1>
                     {{{InputFormName}}}
                     {{{Button}}}
                 </form>
                `;
    }
}
