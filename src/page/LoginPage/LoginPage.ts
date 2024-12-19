import Block from "../../framework/Block.ts";
import {ValidationFormService} from "../../services/AuthorizationService/ValidationFormService.ts";
import {InputForm} from "../../components/InputForm/InputForm.ts";
import {Button} from "../../components/Button/Button.ts";
import {Link} from "../../components/Link/Link.ts";


export type FormDataLogin = {
    login: string;
    password: string;
}

export class LoginPage extends Block {
    validationService: ValidationFormService<FormDataLogin>;

    constructor() {
        const validationService = new ValidationFormService<FormDataLogin>();
        super({
            children: {
                InputFormLogin: new InputForm<FormDataLogin>({
                    props: {
                        label: 'Логин',
                        name: 'login',
                        type: 'text',
                        placeholder: 'Введите логин',
                        validationService
                    }
                }),
                InputFormPassword: new InputForm<FormDataLogin>({
                    props: {
                        label: 'Пароль',
                        name: 'password',
                        placeholder: 'Введите пароль',
                        type: 'password',
                        validationService
                    }
                }),
                ButtonLogin: new Button({
                    props: {
                        label: 'Войти',
                        type: 'reset'
                    },
                    events: {
                        click: () => validationService.getFormValue()
                    }
                }),
                LinkLogin: new Link({
                    props: {
                        label: 'Нет аккаунта?',
                        link: '#'
                    }
                })
            }
        });
        this.validationService = validationService;
    }

    override componentDidMount() {
        this.validationService.init('Registration', {
            login: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            },
            password: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            }
        });
    }

    override render(): string {
        return `
                <main class="page-wrapper">
                    <div class="form-authorization-wrapper">
                        <h1 class="authorization-title">Регистрация</h1>
                        <form class="authorization-form" name="registration">
                            {{{InputFormLogin}}}
                            {{{InputFormPassword}}}
                        <footer class="authorization-footer">
                               {{{ButtonLogin}}}
                               {{{LinkLogin}}}
                        </footer>
                        </form>
                    </div>
                </main>
                `;
    }
}

