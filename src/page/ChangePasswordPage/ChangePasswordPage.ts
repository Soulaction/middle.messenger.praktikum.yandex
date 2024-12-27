import {InputFormProfile} from "../../components/InputFormProfile/InputFormProfile.ts";
import {Button} from "../../components/Button/Button.ts";
import {checkEqualPassword, navigate} from "../../utils/utils.ts";
import s from "./ChangePassword.module.pcss";
import {AvatarUser} from "../../components/AvatarUser";
import {CircleButton} from "../../components/CircleButton/CircleButton";
import Block from "../../core/Block/Block.ts";
import {ValidationForm} from "../../core/Validation/ValidationForm.ts";
import {errorsForm} from "../../utils/const.ts";

export type FormDataChangePassword = {
    oldPassword: string;
    password: string;
    password_again: string;
}

export class ChangePasswordPage extends Block {
    validationService: ValidationForm<FormDataChangePassword>;

    constructor() {
        const validationService = new ValidationForm<FormDataChangePassword>();
        super({
            children: {
                AvatarUser: new AvatarUser({
                    props: {
                        imgUrl: '/images/profile.png'
                    }
                }),
                InputFormProfileOldPsw: new InputFormProfile<FormDataChangePassword>({
                    props: {
                        label: 'Старый пароль',
                        name: 'oldPassword',
                        type: 'password',
                        placeholder: 'Введите старый пароль',
                        validationService
                    }
                }),
                InputFormProfileNewPsw: new InputFormProfile<FormDataChangePassword>({
                    props: {
                        label: 'Новый пароль',
                        name: 'password',
                        type: 'password',
                        placeholder: 'Введите новый пароль',
                        validationService,
                        inputChange: () => checkEqualPassword(validationService)
                    }
                }),
                InputFormProfileAgainNewPsw: new InputFormProfile<FormDataChangePassword>({
                    props: {
                        label: 'Повторите новый пароль',
                        name: 'password_again',
                        type: 'password',
                        placeholder: 'Повторите пароль',
                        validationService,
                        inputChange: () => checkEqualPassword(validationService)
                    }
                }),
                CircleButton: new CircleButton({
                    props: {
                        type: 'button'
                    },
                    events: {
                        click: (event: Event) => navigate('/chat', event)
                    }
                }),
                Button: new Button({
                    props: {
                        label: 'Сохранить',
                        type: 'submit'
                    },
                    events: {
                        click: (event: Event) => this.save(event)
                    }
                })
            }
        });
        this.validationService = validationService;
    }

    override componentDidMount() {
        this.validationService.init('edit-password', {
            oldPassword: {
                errors: errorsForm['password']
            },
            password: {
                errors: errorsForm['password']
            },
            password_again: {
                errors: errorsForm['password']
            }
        });
    }

    save(event: Event): void {
        event.preventDefault();
        this.validationService.checkValidity();
        console.log(this.validationService.getFormValue());
    }

    override render(): string {
        return `
                <main class="page-profile">
                    <div class="left-panel">
                        {{{CircleButton}}}
                    </div>
                    <div class="page-wrapper page-profile-content">
                        {{{AvatarUser}}}
                        <form class="user-info" name="edit-password">
                                {{{InputFormProfileOldPsw}}}
                                {{{InputFormProfileNewPsw}}}
                                {{{InputFormProfileAgainNewPsw}}}
                            <footer class="${s.userEditPswFooter}">
                                {{{Button}}}
                            </footer>
                        </form>
                    </div>
                </main>
        `;
    }
}
