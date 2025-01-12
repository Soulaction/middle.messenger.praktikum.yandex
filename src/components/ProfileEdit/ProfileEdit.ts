import {InputFormProfile} from '../InputFormProfile/InputFormProfile.ts';
import {Button} from '../Button/Button.ts';
import s from './ProfileEdit.module.pcss';
import Block from '../../core/Block/Block.ts';
import {ValidationForm} from '../../core/Validation/ValidationForm.ts';
import {errorsForm} from '../../utils/const.ts';

export type FormDataProfileEdite = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};

export class ProfileEdited extends Block {
  validationService: ValidationForm<FormDataProfileEdite>;

  constructor() {
    const validationService = new ValidationForm<FormDataProfileEdite>();
    super({
      children: {
        InputFormProfileEmail: new InputFormProfile<FormDataProfileEdite>({
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
        InputFormProfileLogin: new InputFormProfile<FormDataProfileEdite>({
          props: {
            label: 'Логин',
            name: 'login',
            type: 'text',
            placeholder: 'Введите логин',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormProfileFirstName: new InputFormProfile<FormDataProfileEdite>({
          props: {
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            placeholder: 'Введите имя',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormProfileSecondName: new InputFormProfile<FormDataProfileEdite>({
          props: {
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            placeholder: 'Введите фамилию',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormProfileDisplayName: new InputFormProfile<FormDataProfileEdite>({
          props: {
            label: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            placeholder: 'Введите имя в чате',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        InputFormProfilePhone: new InputFormProfile<FormDataProfileEdite>({
          props: {
            label: 'Телефон',
            name: 'phone',
            type: 'tel',
            placeholder: 'Введите номер телефона',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
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

  save(event: Event): void {
    event.preventDefault();
    this.validationService.checkValidity();
    console.log(this.validationService.getFormValue());
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
