import Block from "../../framework/Block.ts";
import {Link} from "../../components/Link/Link.ts";
import {Button} from "../../components/Button/Button.ts";
import {ValidationFormService} from "../../services/AuthorizationService/ValidationFormService.ts";
import {InputForm} from "../../components/InputForm/InputForm.ts";
import {checkEqualPassword} from "../../utils/utils.ts";

export type FormDataRegistration = {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
    password_again: string;
}

export class RegistrationPage extends Block {
    validationService: ValidationFormService<FormDataRegistration>;

    constructor() {
        const validationService = new ValidationFormService<FormDataRegistration>();
        super({
            children: {
                InputFormEmail: new InputForm<FormDataRegistration>({
                    props: {
                        label: 'Почта',
                        name: 'email',
                        type: 'email',
                        placeholder: 'Введите почтовый адрес',
                        validationService
                    }
                }),
                InputFormLogin: new InputForm<FormDataRegistration>({
                    props: {
                        label: 'Логин',
                        name: 'login',
                        placeholder: 'Введите логин',
                        type: 'text',
                        validationService
                    }
                }),
                InputFormFirstName: new InputForm<FormDataRegistration>({
                    props: {
                        label: 'Имя',
                        name: 'first_name',
                        placeholder: 'Введите имя',
                        type: 'text',
                        validationService
                    }
                }),
                InputFormSecondName: new InputForm<FormDataRegistration>({
                    props: {
                        label: 'Фамилия',
                        name: 'second_name',
                        placeholder: 'Введите фамилию',
                        type: 'text',
                        validationService
                    }
                }),
                InputFormPhone: new InputForm<FormDataRegistration>({
                    props: {
                        label: 'Телефон',
                        name: 'phone',
                        placeholder: 'Введите номер телефона',
                        type: 'tel',
                        validationService
                    }
                }),
                InputFormPassword: new InputForm<FormDataRegistration>({
                    props: {
                        label: 'Пароль',
                        name: 'password',
                        placeholder: 'Введите пароль',
                        type: 'password',
                        validationService,
                        inputChange: () => checkEqualPassword(validationService)
                    }
                }),
                InputFormPasswordAgain: new InputForm<FormDataRegistration>({
                    props: {
                        label: 'Пароль (ещё раз)',
                        name: 'password_again',
                        placeholder: 'Повторите пароль',
                        type: 'password',
                        validationService,
                        inputChange: () => checkEqualPassword(validationService)
                    }
                }),
                ButtonRegistration: new Button({
                    props: {
                        label: 'Зарегестрироваться',
                        type: 'reset'
                    },
                    events: {
                        click: () => validationService.getFormValue()
                    }
                }),
                LinkLogin: new Link({
                    props: {
                        label: 'Войти',
                        link: '#'
                    }
                })
            }
        });
        this.validationService = validationService
    }

    override componentDidMount() {
        this.validationService.init('registration', {
            email: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            },
            first_name: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            },
            login: {
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
            },
            phone: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            },
            second_name: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            },
        });
    }

    override render(): string {
        return `
                <main class="page-wrapper">
                    <div class="form-authorization-wrapper">
                        <h1 class="authorization-title">Регистрация</h1>
                        <form class="authorization-form" name="registration">
                            {{{InputFormEmail}}}
                            {{{InputFormLogin}}}
                            {{{InputFormFirstName}}}
                            {{{InputFormSecondName}}}
                            {{{InputFormPhone}}}
                            {{{InputFormPassword}}}
                            {{{InputFormPasswordAgain}}}
                        <footer class="authorization-footer">
                               {{{ButtonRegistration}}}
                               {{{LinkLogin}}}
                        </footer>
                        </form>
                    </div>
                </main>
                `;
    }
}
