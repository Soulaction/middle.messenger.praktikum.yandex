import Block from "../../framework/Block.ts";
import {ValidationFormService} from "../../services/AuthorizationService/ValidationFormService.ts";
import {InputFormProfile} from "../../components/InputFormProfile/InputFormProfile.ts";
import {Button} from "../../components/Button/Button.ts";
import {checkEqualPassword} from "../../utils/utils.ts";
import s from "./ChangePassword.module.pcss";

export type FormDataChangePassword = {
    oldPassword: string;
    password: string;
    password_again: string;
}

export class ChangePasswordPage extends Block {
    validationService: ValidationFormService<FormDataChangePassword>;

    constructor() {
        const validationService = new ValidationFormService<FormDataChangePassword>();
        super({
            children: {
                InputFormProfileOldPsw: new InputFormProfile<FormDataChangePassword>({
                    props: {
                        classInput: s.rightPlaceholder,
                        label: 'Старый пароль',
                        name: 'oldPassword',
                        type: 'password',
                        placeholder: 'Введите старый пароль',
                        validationService
                    }
                }),
                InputFormProfileNewPsw: new InputFormProfile<FormDataChangePassword>({
                    props: {
                        classInput: s.rightPlaceholder,
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
                        classInput: s.rightPlaceholder,
                        label: 'Повторите новый пароль',
                        name: 'password_again',
                        type: 'password',
                        placeholder: 'Повторите пароль',
                        validationService,
                        inputChange: () => checkEqualPassword(validationService)
                    }
                }),
                Button: new Button({
                    props: {
                        label: 'Сохранить'
                    }
                })
            }
        });
        this.validationService = validationService;
    }

    override componentDidMount() {
        this.validationService.init('edit-profile', {
            oldPassword: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            },
            password: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            },
            password_again: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            }
        });
    }

    override render(): string {
        return `
                <main class="page-profile">
                    <div class="left-panel">
                        <button class="button-row"></button>
                    </div>
                    <div class="page-wrapper page-profile-content">
                        <div class="user-avatar-wrapper">
                            <img class="user-avatar" src="/images/profile.png" alt="Иконка профиля"/>
                        </div>
                        <form class="user-info" name="edit-profile">
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
