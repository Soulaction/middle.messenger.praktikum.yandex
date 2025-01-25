import { Button } from '../../components/Button/Button.ts';
import { InputForm } from '../../components/InputForm/InputForm.ts';
import Block from '../../core/Block/Block.ts';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import { ChatController } from '../../controllers/ChatController.ts';
import store from '../../core/Store.ts';

export type FormDataAddUser = {
  login: string;
};

export class AddUserModal extends Block {
  validationService: ValidationForm<FormDataAddUser>;

  chatController: ChatController = new ChatController();

  constructor() {
    const validationService = new ValidationForm<FormDataAddUser>();

    super({
      props: {
        titleModal: 'Добавить пользователя',
      },
      children: {
        InputFormLogin: new InputForm<FormDataAddUser>({
          props: {
            id: 'login-add',
            label: 'Логин',
            name: 'login',
            type: 'login',
            placeholder: 'Введите логин',
            className: 'input-for-modal',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        Button: new Button({
          props: {
            label: 'Добавить',
            type: 'submit',
            class: 'submit-btn-modal',
          },
          events: {
            click: (event: Event) => this.addUser(event),
          },
        }),
      },
    });
    this.validationService = validationService;
  }

  override componentDidMount() {
    this.validationService.init('add-user', {
      login: {
        errors: {
          required: { rule: true, message: 'Ведите логин пользователя' },
        },
      },
    });
  }

  async addUser(event: Event): Promise<void> {
    event.preventDefault();
    if (this.validationService.checkValidity()) {
      await this.chatController.addUsersToChat(this.validationService.getFormValue().login!);
      this.validationService.reset();
      store.set('isAddUserModal', false);
    }
  }

  override render(): string {
    return `
             <form class="form-modal" name="add-user">
                 <h1 class="title-modal">{{titleModal}}</h1>
                 {{{InputFormLogin}}}
                 {{{Button}}}
             </form>
            `;
  }
}
