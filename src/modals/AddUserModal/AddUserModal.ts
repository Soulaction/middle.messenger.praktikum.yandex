import {Button} from "../../components/Button/Button.ts";
import {InputForm} from "../../components/InputForm/InputForm.ts";
import Block from "../../core/Block/Block.ts";
import {ValidationForm} from "../../core/Validation/ValidationForm.ts";

export type FormDataAddUser = {
    login: string;
}

export class AddUserModal extends Block {
    validationService: ValidationForm<FormDataAddUser>;

    constructor() {
        const validationService = new ValidationForm<FormDataAddUser>();

        super({
            props: {
                titleModal: 'Добавить пользователя'
            },
            children: {
                InputFormLogin: new InputForm<FormDataAddUser>({
                    props: {
                        label: 'Логин',
                        name: 'login',
                        type: 'login',
                        placeholder: 'Введите логин',
                        className: 'input-for-modal',
                        validationService
                    }
                }),
                Button: new Button({
                    props: {
                        label: 'Поменять',
                        type: 'submit',
                        class: 'submit-btn-modal'
                    },
                    events: {
                        click: (event: Event) => this.addUser(event)
                    }
                })
            }
        });
        this.validationService = validationService;
    }

    override componentDidMount() {
        this.validationService.init('add-user', {
            login: {
                errors: {
                    required: {rule: true, message: 'Ведите логин пользователя'}
                }
            }
        });
    }

    addUser(event: Event): void {
        event.preventDefault();
        this.validationService.checkValidity();
        console.log(this.validationService.getFormValue());
    }

    override render(): string {
        return `
                 <form class="form-modal" name="add-user">
                     <h1 class="title-modal">{{titleModal}}</h1>
                     {{{InputFormLogin}}}
                     {{{Button}}}
                 </form>
                `;
    }
}
