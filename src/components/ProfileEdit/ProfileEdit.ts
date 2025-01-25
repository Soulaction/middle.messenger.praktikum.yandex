import { InputFormProfile } from '../InputFormProfile/InputFormProfile.ts';
import { Button } from '../Button/Button.ts';
import s from './ProfileEdit.module.pcss';
import Block from '../../core/Block/Block.ts';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import { errorsForm } from '../../utils/const.ts';
import { wrapStore } from '../../core/utils/wrapStore.ts';
import { User } from '../../types/User.ts';
import { EqualType, isEqual } from '../../core/utils/isEqual.ts';
import userController from '../../controllers/UserController.ts';
import { UserUpdate } from '../../api/UserApi/types/UserUpdate.ts';

export type FormDataProfileEdite = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};

type ProfileEditedProps = {
  user?: User
};

class ProfileEdited extends Block {
  validationService: ValidationForm<FormDataProfileEdite> = new ValidationForm<FormDataProfileEdite>();

  constructor() {
    super({
      children: {
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
  }

  override componentDidMount() {
    this.validationService.init('edit-profile', {
      email: {
        errors: errorsForm.email,
      },
      login: {
        errors: errorsForm.login,
      },
      first_name: {
        errors: errorsForm.first_name,
      },
      second_name: {
        errors: errorsForm.second_name,
      },
      phone: {
        errors: errorsForm.phone,
      },
    });
  }

  override componentDidUpdate(oldProps: EqualType, newProps: EqualType): boolean {
    const isChangeUserData = !!newProps?.user && !isEqual(oldProps?.user, newProps?.user);

    if (isChangeUserData) {
      this.setChildren({
        InputFormProfileEmail: new InputFormProfile<FormDataProfileEdite>({
          props: {
            label: 'Почта',
            name: 'email',
            value: newProps.user?.email,
            type: 'email',
            placeholder: 'Введите почтовый адрес',
            validationService: this.validationService,
            blur: (event: Event) => this.validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => this.validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormProfileLogin: new InputFormProfile<FormDataProfileEdite>({
          props: {
            id: 'login-edit',
            label: 'Логин',
            name: 'login',
            value: newProps.user?.login,
            type: 'text',
            placeholder: 'Введите логин',
            validationService: this.validationService,
            blur: (event: Event) => this.validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => this.validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormProfileFirstName: new InputFormProfile<FormDataProfileEdite>({
          props: {
            label: 'Имя',
            name: 'first_name',
            value: newProps.user?.first_name,
            type: 'text',
            placeholder: 'Введите имя',
            validationService: this.validationService,
            blur: (event: Event) => this.validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => this.validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormProfileSecondName: new InputFormProfile<FormDataProfileEdite>({
          props: {
            label: 'Фамилия',
            name: 'second_name',
            value: newProps.user?.second_name,
            type: 'text',
            placeholder: 'Введите фамилию',
            validationService: this.validationService,
            blur: (event: Event) => this.validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => this.validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormProfileDisplayName: new InputFormProfile<FormDataProfileEdite>({
          props: {
            label: 'Имя в чате',
            name: 'display_name',
            value: newProps.user?.display_name,
            type: 'text',
            placeholder: 'Введите имя в чате',
            validationService: this.validationService,
            blur: (event: Event) => this.validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => this.validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormProfilePhone: new InputFormProfile<FormDataProfileEdite>({
          props: {
            label: 'Телефон',
            name: 'phone',
            value: newProps.user?.phone,
            type: 'tel',
            placeholder: 'Введите номер телефона',
            validationService: this.validationService,
            blur: (event: Event) => this.validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => this.validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
      });
    }
    return !isChangeUserData;
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.validationService.checkValidity()) {
      userController.changeUserProfile(this.validationService.getFormValue() as UserUpdate);
    }
  }

  override render(): string {
    return `
           <form class="user-info ${s.userInfoIndent}" name="edit-profile">
                   {{{InputFormProfileEmail}}}
                   {{{InputFormProfileLogin}}}
                   {{{InputFormProfileFirstName}}}
                   {{{InputFormProfileSecondName}}}
                   {{{InputFormProfileDisplayName}}}
                   {{{InputFormProfilePhone}}}
               <footer class="${s.userEditDataFooter}">
                   {{{Button}}}
               </footer>
           </form>
        `;
  }
}

export const ProfileEditedWithStore = wrapStore<Partial<ProfileEditedProps>>((state) => (
  { user: state.user?.data }
))(ProfileEdited);
