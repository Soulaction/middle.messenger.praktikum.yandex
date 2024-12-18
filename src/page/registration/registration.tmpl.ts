import Block from "../../framework/Block.ts";
import {Label} from "../../components/label/Label.ts";
import {Input} from "../../components/input/Input.ts";
import {Link} from "../../components/link/Link.ts";
import {Button} from "../../components/button/Button.ts";
import {ErrorMessage} from "../../components/errorMessage/ErrorMessage.ts";
import {ValidationFormService} from "../../services/AuthorizationService/ValidationFormService.ts";

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
                LabelEmail: new Label({
                    props: {
                        label: 'Почта',
                        for: 'email'
                    }
                }),
                InputEmail: new Input({
                    props: {
                        id: 'email',
                        name: 'email',
                        type: 'email',
                        placeholder: 'Введите почтовый адрес'
                    }
                }),
                ErrorEmail: new ErrorMessage<FormDataRegistration>({
                    props: {
                        name: 'email',
                        validationFormService: validationService
                    }
                }),
                LabelLogin: new Label({
                    props: {
                        label: 'Логин',
                        for: 'login'
                    }
                }),
                InputLogin: new Input({
                    props: {
                        id: 'login',
                        name: 'login',
                        type: 'text',
                        placeholder: 'Введите логин'
                    }
                }),
                ErrorLogin: new ErrorMessage<FormDataRegistration>({
                    props: {
                        name: 'login',
                        validationFormService: validationService
                    }
                }),
                LabelFirstName: new Label({
                    props: {
                        label: 'Имя',
                        for: 'first_name'
                    }
                }),
                InputFirstName: new Input({
                    props: {
                        id: 'first_name',
                        name: 'first_name',
                        type: 'text',
                        placeholder: 'Введите имя'
                    }
                }),
                ErrorFirstName: new ErrorMessage<FormDataRegistration>({
                    props: {
                        name: 'first_name',
                        validationFormService: validationService
                    }
                }),
                LabelSecondName: new Label({
                    props: {
                        label: 'Фамилия',
                        for: 'second_name'
                    }
                }),
                InputSecondName: new Input({
                    props: {
                        id: 'second_name',
                        name: 'second_name',
                        type: 'text',
                        placeholder: 'Введите фамилию'
                    }
                }),
                ErrorSecondName: new ErrorMessage<FormDataRegistration>({
                    props: {
                        name: 'second_name',
                        validationFormService: validationService
                    }
                }),
                LabelPhone: new Label({
                    props: {
                        label: 'Телефон',
                        for: 'phone'
                    }
                }),
                InputPhone: new Input({
                    props: {
                        id: 'phone',
                        name: 'phone',
                        type: 'tel',
                        placeholder: 'Введите номер телефона'
                    }
                }),
                ErrorPhone: new ErrorMessage<FormDataRegistration>({
                    props: {
                        name: 'phone',
                        validationFormService: validationService
                    }
                }),
                LabelPassword: new Label({
                    props: {
                        label: 'Пароль',
                        for: 'password'
                    }
                }),
                InputPassword: new Input({
                    props: {
                        id: 'password',
                        name: 'password',
                        type: 'password',
                        placeholder: 'Введите пароль'
                    },
                    events: {
                        input: () => this.checkEqualPassword()
                    }
                }),
                ErrorPassword: new ErrorMessage<FormDataRegistration>({
                    props: {
                        name: 'password',
                        validationFormService: validationService
                    }
                }),
                LabelPasswordAgain: new Label({
                    props: {
                        label: 'Пароль (ещё раз)',
                        for: 'password_again'
                    }
                }),
                InputPasswordAgain: new Input({
                    props: {
                        id: 'password_again',
                        name: 'password_again',
                        type: 'password',
                        placeholder: 'Повторите пароль'
                    },
                    events: {
                        input: () => this.checkEqualPassword()
                    }
                }),
                ErrorMessagePasswordAgain: new ErrorMessage<FormDataRegistration>({
                    props: {
                        name: 'password_again',
                        validationFormService: validationService
                    }
                }),
                ButtonRegistration: new Button({
                    props: {
                        label: 'Зарегестрироваться',
                        type: 'reset'
                    },
                    events: {
                        click: () => validationService.checkValidity()
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

    checkEqualPassword(): void {
        const {password, password_again} = this.validationService.getFormValue();
        debugger
        if(password !== password_again) {
            this.validationService.setError('password', 'Пароли не совпадают');
            this.validationService.setError('password_again', 'Пароли не совпадают');
        } else {
            this.validationService.removeError('password', 'Пароли не совпадают');
            this.validationService.removeError('password_again', 'Пароли не совпадают');
        }
    }

    override render(): string {
        return `
                <main class="page-wrapper">
                    <div class="form-authorization-wrapper">
                        <h1 class="authorization-title">Регистрация</h1>
                        <form class="authorization-form" name="registration">
                            <div class="input-wrapper">
                                {{{LabelEmail}}}
                                {{{InputEmail}}}
                                {{{ErrorEmail}}}
                            </div>
                            <div class="input-wrapper">
                                {{{LabelLogin}}}
                                {{{InputLogin}}}
                                {{{ErrorLogin}}}
                            </div>
                             <div class="input-wrapper">
                                {{{LabelFirstName}}}
                                {{{InputFirstName}}}
                                {{{ErrorFirstName}}}
                            </div>
                            <div class="input-wrapper">
                                {{{LabelSecondName}}}
                                {{{InputSecondName}}}
                                {{{ErrorSecondName}}}
                            </div>
                             <div class="input-wrapper">
                                {{{LabelPhone}}}
                                {{{InputPhone}}}
                                {{{ErrorPhone}}}
                            </div>
                            <div class="input-wrapper">
                                {{{LabelPassword}}}
                                {{{InputPassword}}}
                                {{{ErrorPassword}}}
                            </div>        
                            <div class="input-wrapper">
                                {{{LabelPasswordAgain}}}
                                {{{InputPasswordAgain}}}
                                {{{ErrorMessagePasswordAgain}}}
                            </div>
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
