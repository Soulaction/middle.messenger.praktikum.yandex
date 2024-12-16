import Block from "../../framework/Block.ts";
import {Label} from "../../components/label/Label.ts";
import {Input} from "../../components/input/Input.ts";
import {Link} from "../../components/link/Link.ts";
import {Button} from "../../components/button/Button.ts";
import {ErrorMessage} from "../../components/errorMessage/ErrorMessage.ts";
import {ValidationFormService} from "../../services/AuthorizationService/ValidationFormService.ts";

type FormData = {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
    password_again: string;
}

export class RegistrationPage extends Block {
    validationService = new ValidationFormService<FormData>();

    constructor() {
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
                    }
                }),
                ErrorMessagePasswordAgain: new ErrorMessage({
                    props: {
                        errorText: 'Пароли не совпадают'
                    }
                }),
                ButtonRegistration: new Button({
                    props: {
                        label: 'Зарегестрироваться',
                        type: 'reset'
                    },
                    events: {
                        click: () => console.log('click')
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
    }

    override componentDidMount() {
        this.validationService.init('registration', {
            email: {errors: {required: {rule: true, message: 'Обязательно для вввода'}}},
            // first_name: {errors: undefined},
            // login: {errors: undefined},
            // password: {errors: undefined},
            // password_again: {errors: undefined},
            // phone: {errors: undefined},
            // second_name: {errors: undefined},
        });
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
                            </div>
                            <div class="input-wrapper">
                                {{{LabelLogin}}}
                                {{{InputLogin}}}
                            </div>
                             <div class="input-wrapper">
                                {{{LabelFirstName}}}
                                {{{InputFirstName}}}
                            </div>
                            <div class="input-wrapper">
                                {{{LabelSecondName}}}
                                {{{InputSecondName}}}
                            </div>
                             <div class="input-wrapper">
                                {{{LabelPhone}}}
                                {{{InputPhone}}}
                            </div>
                            <div class="input-wrapper">
                                {{{LabelPassword}}}
                                {{{InputPassword}}}
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
