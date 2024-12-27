import {Button} from "../../components/Button/Button.ts";
import {InputForm} from "../../components/InputForm/InputForm.ts";
import Block from "../../core/Block/Block.ts";
import {ValidationForm} from "../../core/Validation/ValidationForm.ts";

type FormDataRemoveUser = {
    login: string;
}

export class RemoveUserModal extends Block {
    validationService: ValidationForm<FormDataRemoveUser>;

    constructor() {
        const validationService = new ValidationForm<FormDataRemoveUser>();

        super({
            props: {
                titleModal: 'Удалить пользователя'
            },
            children: {
                InputFormLogin: new InputForm<FormDataRemoveUser>({
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
                        label: 'Удалить',
                        type: 'submit',
                        class: 'submit-btn-modal'
                    },
                    events: {
                        click: (event: Event) => this.deleteUser(event)
                    }
                })
            }
        });
        this.validationService = validationService;
    }

    override componentDidMount() {
        this.validationService.init('remove-user', {
            login: {
                errors: {
                    required: {rule: true, message: 'Ведите логин пользователя'}
                }
            }
        });
    }

    deleteUser(event: Event): void {
        event.preventDefault();
        this.validationService.checkValidity();
        console.log(this.validationService.getFormValue());
    }

    override render(): string {
        return `
                 <form class="form-modal" name="remove-user">
                     <h1 class="title-modal">{{titleModal}}</h1>
                     {{{InputFormLogin}}}
                     {{{Button}}}
                 </form>
                `;
    }
}
