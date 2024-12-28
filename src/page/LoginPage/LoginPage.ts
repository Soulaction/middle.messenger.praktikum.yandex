import { InputForm } from '../../components/InputForm/InputForm.ts';
import { Button } from '../../components/Button/Button.ts';
import { Link } from '../../components/Link/Link.ts';
import Block from '../../core/Block/Block.ts';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import { navigate } from '../../utils/utils.ts';
import { errorsForm } from '../../utils/const.ts';


export type FormDataLogin = {
  login: string;
  password: string;
};

export class LoginPage extends Block {
  validationService: ValidationForm<FormDataLogin>;

  constructor() {
    const validationService = new ValidationForm<FormDataLogin>();
    super({
      children: {
        InputFormLogin: new InputForm<FormDataLogin>({
          props: {
            label: 'Логин',
            name: 'login',
            type: 'text',
            placeholder: 'Введите логин',
            validationService,
          },
        }),
        InputFormPassword: new InputForm<FormDataLogin>({
          props: {
            label: 'Пароль',
            name: 'password',
            placeholder: 'Введите пароль',
            type: 'password',
            validationService,
          },
        }),
        ButtonLogin: new Button({
          props: {
            label: 'Войти',
            type: 'submit',
          },
          events: {
            click: (event: Event) => this.login(event),
          },
        }),
        LinkLogin: new Link({
          props: {
            label: 'Нет аккаунта?',
          },
          events: {
            click: (event: Event) => navigate('/registration', event),
          },
        }),
      },
    });
    this.validationService = validationService;
  }

  override componentDidMount() {
    this.validationService.init('auth', {
      login: {
        errors: errorsForm.login,
      },
      password: {
        errors: errorsForm.password,
      },
    });
  }

  login(event: Event): void {
    event.preventDefault();
    this.validationService.checkValidity();
    console.log(this.validationService.getFormValue());
  }

  override render(): string {
    return `
                <main class="page-wrapper">
                    <div class="form-authorization-wrapper">
                        <h1 class="authorization-title">Вход</h1>
                        <form class="authorization-form" name="auth">
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
