import {Button} from "../../components/Button/Button.ts";
import {InputForm} from "../../components/InputForm/InputForm.ts";
import {ValidationForm} from "../../core/Validation/ValidationForm.ts";
import Block from "../../core/Block/Block.ts";

type FormDataCreateChat = {
    name: string;
}

export class CreateChatModal extends Block {
    validationService: ValidationForm<FormDataCreateChat>;

    constructor() {
        const validationService = new ValidationForm<FormDataCreateChat>();

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
                        type: 'submit',
                        class: 'submit-btn-modal'
                    },
                    events: {
                        click: (event: Event) => this.createChat(event)
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

    createChat(event: Event): void {
        event.preventDefault();
        this.validationService.checkValidity();
        console.log(this.validationService.getFormValue());
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
