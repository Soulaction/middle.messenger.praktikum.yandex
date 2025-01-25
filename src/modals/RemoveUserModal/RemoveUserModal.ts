import { Button } from '../../components/Button/Button.ts';
import { InputForm } from '../../components/InputForm/InputForm.ts';
import Block from '../../core/Block/Block.ts';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import store from "../../core/Store.ts";
import {ChatController} from "../../controllers/ChatController.ts";

type FormDataRemoveUser = {
  login: string;
};

export class RemoveUserModal extends Block {
  validationService: ValidationForm<FormDataRemoveUser>;
  chatController: ChatController = new ChatController();

  constructor() {
    const validationService = new ValidationForm<FormDataRemoveUser>();

    super({
      props: {
        titleModal: 'Удалить пользователя',
      },
      children: {
        InputFormLogin: new InputForm<FormDataRemoveUser>({
          props: {
            id: 'login-remove',
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
            label: 'Удалить',
            type: 'submit',
            class: 'submit-btn-modal',
          },
          events: {
            click: (event: Event) => this.deleteUser(event),
          },
        }),
      },
    });
    this.validationService = validationService;
  }

  override componentDidMount() {
    this.validationService.init('remove-user', {
      login: {
        errors: {
          required: { rule: true, message: 'Ведите логин пользователя' },
        },
      },
    });
  }

  async deleteUser(event: Event): Promise<void> {
    event.preventDefault();
    if (this.validationService.checkValidity()) {
      await this.chatController.deleteUsersFromChat(this.validationService.getFormValue().login!);
      this.validationService.reset();
      store.set('isRemoveUserModal', false);
    }
  }

  override render(): string {
    return `
             <form class="form-modal" name="remove-user">
                 <h1 class="title-modal">{{titleModal}}</h1>
                 {{{InputFormLogin}}}
                 {{{Button}}}
             </form>
            `;
  }
}
