import Block from "../../framework/Block.ts";
import {ValidationFormService} from "../../services/AuthorizationService/ValidationFormService.ts";
import {InputFormProfile} from "../../components/InputFormProfile/InputFormProfile.ts";
import {Button} from "../../components/Button/Button.ts";
import {checkEqualPassword} from "../../utils/utils.ts";
import s from "./ChangePassword.module.pcss";
import {AvatarUser} from "../../components/AvatarUser";

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
        this.validationService.init('edit-password', {
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
