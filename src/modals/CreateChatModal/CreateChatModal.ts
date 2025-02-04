import { Button } from '../../components/Button/Button.ts';
import { InputForm } from '../../components/InputForm/InputForm.ts';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import Block from '../../core/Block/Block.ts';
import { ChatController } from '../../controllers/ChatController.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';
import store from '../../core/Store.ts';

type CreateChatModalProps = {
  refreshData: () => void,
};

type FormDataCreateChat = {
  name: string,
  refreshData: () => void,
};

export class CreateChatModal extends Block {
  validationService: ValidationForm<FormDataCreateChat>;

  chatController: ChatController = new ChatController();

  refreshData: () => void;

  constructor(createChatModalProps: BlockProperties<CreateChatModalProps>) {
    const validationService = new ValidationForm<FormDataCreateChat>();

    super({
      props: {
        titleModal: 'Создать чат',
      },
      children: {
        InputFormName: new InputForm<FormDataCreateChat>({
          props: {
            label: 'Наименование чата',
            name: 'name',
            type: 'text',
            placeholder: 'Введите наименование чата',
            className: 'input-for-modal',
            validationService,
            blur: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
            inputChange: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        Button: new Button({
          props: {
            label: 'Создать',
            type: 'submit',
            class: 'submit-btn-modal',
          },
          events: {
            click: (event: Event) => this.createChat(event),
          },
        }),
      },
    });
    this.validationService = validationService;
    this.refreshData = createChatModalProps.props!.refreshData;
  }

  override componentDidMount() {
    this.validationService.init('chat-create', {
      name: {
        errors: {
          required: { rule: true, message: 'Нужно ввести наименование чата' },
        },
      },
    });
  }

  createChat(event: Event): void {
    event.preventDefault();
    if (this.validationService.checkValidity()) {
      void this.chatController.createChat(this.validationService.getFormValue().name!);
      this.validationService.reset();
      store.set('isCreateChatModal', false);
      this.refreshData();
    }
  }

  override render(): string {
    return `
             <form class="form-modal" name="chat-create">
                 <h1 class="title-modal">{{titleModal}}</h1>
                 {{{InputFormName}}}
                 {{{Button}}}
             </form>
            `;
  }
}
