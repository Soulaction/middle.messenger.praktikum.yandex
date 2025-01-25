import { Link } from '../../components/Link/Link.ts';
import { Button } from '../../components/Button/Button.ts';
import { InputForm } from '../../components/InputForm/InputForm.ts';
import { checkEqualPassword } from '../../utils/utils.ts';
import Block from '../../core/Block/Block.ts';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import { errorsForm, RoutePath } from '../../utils/const.ts';
import { navigate } from '../../core/utils/navigate.ts';
import authController from '../../controllers/AuthController.ts';

export type FormDataRegistration = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  passwordAgain: string;
};

export class RegistrationPage extends Block {
  validationService: ValidationForm<FormDataRegistration>;

  constructor() {
    const validationService = new ValidationForm<FormDataRegistration>();
    super({
      children: {
        InputFormEmail: new InputForm<FormDataRegistration>({
          props: {
            label: 'Почта',
            name: 'email',
            type: 'email',
            placeholder: 'Введите почтовый адрес',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormLogin: new InputForm<FormDataRegistration>({
          props: {
            label: 'Логин',
            name: 'login',
            placeholder: 'Введите логин',
            type: 'text',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormFirstName: new InputForm<FormDataRegistration>({
          props: {
            label: 'Имя',
            name: 'first_name',
            placeholder: 'Введите имя',
            type: 'text',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormSecondName: new InputForm<FormDataRegistration>({
          props: {
            label: 'Фамилия',
            name: 'second_name',
            placeholder: 'Введите фамилию',
            type: 'text',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormPhone: new InputForm<FormDataRegistration>({
          props: {
            label: 'Телефон',
            name: 'phone',
            placeholder: 'Введите номер телефона',
            type: 'tel',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormPassword: new InputForm<FormDataRegistration>({
          props: {
            label: 'Пароль',
            name: 'password',
            placeholder: 'Введите пароль',
            type: 'password',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => this.changePassword(event.target as HTMLInputElement),
          },
        }),
        InputFormPasswordAgain: new InputForm<FormDataRegistration>({
          props: {
            label: 'Пароль (ещё раз)',
            name: 'passwordAgain',
            placeholder: 'Повторите пароль',
            type: 'password',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => this.changePassword(event.target as HTMLInputElement),
          },
        }),
        ButtonRegistration: new Button({
          props: {
            label: 'Зарегестрироваться',
            type: 'submit',
          },
          events: {
            click: (event: Event) => this.registration(event),
          },
        }),
        LinkLogin: new Link({
          props: {
            label: 'Войти',
          },
          events: {
            click: (event: Event) => this.goToAuthPage(event),
          },
        }),
      },
    });
    this.validationService = validationService;
  }

  override componentDidMount() {
    this.validationService.init('registration', {
      email: {
        errors: errorsForm.email,
      },
      first_name: {
        errors: errorsForm.first_name,
      },
      login: {
        errors: errorsForm.login,
      },
      password: {
        errors: errorsForm.password,
      },
      passwordAgain: {
        errors: errorsForm.password,
      },
      phone: {
        errors: errorsForm.phone,
      },
      second_name: {
        errors: errorsForm.second_name,
      },
    });
  }

  goToAuthPage(event: Event): void {
    event.preventDefault();
    navigate().go(RoutePath.signIn);
  }

  changePassword(event: HTMLInputElement): void {
    this.validationService.setFormData(event);
    checkEqualPassword(this.validationService);
  }

  async registration(event: Event): Promise<void> {
    event.preventDefault();
    if (this.validationService.checkValidity()) {
      await authController.registration(this.validationService.getFormValue() as FormDataRegistration);
    }
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
