import Block from "../../framework/Block.ts";
import {Button} from "../../components/Button/Button.ts";
import {ValidationFormService} from "../../services/AuthorizationService/ValidationFormService.ts";
import {InputForm} from "../../components/InputForm/InputForm.ts";

export type FormDataAddUser = {
    login: string;
}

export class AddUserModal extends Block {
    validationService: ValidationFormService<FormDataAddUser>;

    constructor() {
        const validationService = new ValidationFormService<FormDataAddUser>();

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
        this.validationService.init('add-user', {
            login: {
                errors: {
                    required: {rule: true, message: 'Ведите логин пользователя'}
                }
            }
        });
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
