import { InputFormProfile } from '../InputFormProfile/InputFormProfile.ts';
import { Button } from '../Button/Button.ts';
import s from './ChangePassword.module.pcss';
import Block from '../../core/Block/Block.ts';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import { errorsForm } from '../../utils/const.ts';
import userController from '../../controllers/UserController.ts';
import { checkEqualPassword } from '../../utils/utils.ts';

export type FormDataChangePassword = {
  oldPassword: string;
  password: string;
  passwordAgain: string;
};

export class ChangePasswordProfile extends Block {
  validationService: ValidationForm<FormDataChangePassword>;

  constructor() {
    const validationService = new ValidationForm<FormDataChangePassword>();
    super({
      children: {
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

  changePassword(event: HTMLInputElement): void {
    this.validationService.setFormData(event);
    checkEqualPassword(this.validationService);
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.validationService.checkValidity()) {
      void userController.changeUserPassword({
        oldPassword: this.validationService.getFormValue().oldPassword!,
        newPassword: this.validationService.getFormValue().password!,
      });
    }
  }

  override render(): string {
    return `
           <form class="user-info ${s.userInfoIndent}" name="edit-password">
                   {{{InputFormProfileOldPsw}}}
                   {{{InputFormProfileNewPsw}}}
                   {{{InputFormProfileAgainNewPsw}}}
               <footer class="${s.userEditPswFooter}">
                   {{{Button}}}
               </footer>
           </form>
        `;
  }
}
