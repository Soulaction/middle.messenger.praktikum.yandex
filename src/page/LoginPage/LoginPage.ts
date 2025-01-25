import { InputForm } from '../../components/InputForm/InputForm.ts';
import { Button } from '../../components/Button/Button.ts';
import { Link } from '../../components/Link/Link.ts';
import Block from '../../core/Block/Block.ts';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import { errorsForm, RoutePath } from '../../utils/const.ts';
import { navigate } from '../../core/utils/navigate.ts';
import authController from '../../controllers/AuthController.ts';

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
            id: 'login-auth',
            label: 'Логин',
            name: 'login',
            type: 'text',
            placeholder: 'Введите логин',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormPassword: new InputForm<FormDataLogin>({
          props: {
            label: 'Пароль',
            name: 'password',
            placeholder: 'Введите пароль',
            type: 'password',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
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
            click: (event: Event) => this.goToRegistrationPage(event),
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

  goToRegistrationPage(event: Event): void {
    event.preventDefault();
    navigate().go(RoutePath.signUp);
  }

  login(event: Event): void {
    event.preventDefault();
    if (this.validationService.checkValidity()) {
      void authController.login(this.validationService.getFormValue() as FormDataLogin);
    }
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
