import { InputFormProfile } from '../../components/InputFormProfile/InputFormProfile.ts';
import { Button } from '../../components/Button/Button.ts';
import { checkEqualPassword } from '../../utils/utils.ts';
import s from './ChangePassword.module.pcss';
import { AvatarUser } from '../../components/AvatarUser';
import { CircleButton } from '../../components/CircleButton/CircleButton';
import Block from '../../core/Block/Block.ts';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import {errorsForm, RoutePath} from '../../utils/const.ts';
import {navigate} from "../../core/utils/navigate.ts";

export type FormDataChangePassword = {
  oldPassword: string;
  password: string;
  passwordAgain: string;
};

export class ChangePasswordPage extends Block {
  validationService: ValidationForm<FormDataChangePassword>;

  constructor() {
    const validationService = new ValidationForm<FormDataChangePassword>();
    super({
      children: {
        AvatarUser: new AvatarUser({
          props: {
            imgUrl: '/images/profile.png',
          },
        }),
        InputFormProfileOldPsw: new InputFormProfile<FormDataChangePassword>({
          props: {
            label: 'Старый пароль',
            name: 'oldPassword',
            type: 'password',
            placeholder: 'Введите старый пароль',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormProfileNewPsw: new InputFormProfile<FormDataChangePassword>({
          props: {
            label: 'Новый пароль',
            name: 'password',
            type: 'password',
            placeholder: 'Введите новый пароль',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => this.changePassword(event.target as HTMLInputElement),
          },
        }),
        InputFormProfileAgainNewPsw: new InputFormProfile<FormDataChangePassword>({
          props: {
            label: 'Повторите новый пароль',
            name: 'passwordAgain',
            type: 'password',
            placeholder: 'Повторите пароль',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => this.changePassword(event.target as HTMLInputElement),
          },
        }),
        CircleButton: new CircleButton({
          props: {
            type: 'button',
          },
          events: {
            click: (event: Event) => this.goToMessagePage(event),
          },
        }),
        Button: new Button({
          props: {
            label: 'Сохранить',
            type: 'submit',
          },
          events: {
            click: (event: Event) => this.save(event),
          },
        }),
      },
    });
    this.validationService = validationService;
  }

  override componentDidMount() {
    this.validationService.init('edit-password', {
      oldPassword: {
        errors: errorsForm.password,
      },
      password: {
        errors: errorsForm.password,
      },
      passwordAgain: {
        errors: errorsForm.password,
      },
    });
  }

    goToMessagePage(event: Event): void {
        event.preventDefault();
        navigate().go(RoutePath.messenger);
    }

  changePassword(event: HTMLInputElement): void {
    this.validationService.setFormData(event);
    checkEqualPassword(this.validationService);
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
