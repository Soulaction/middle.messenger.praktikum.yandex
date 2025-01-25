import s from './MessageBlockForm.module.pcss';
import { CircleButton } from '../CircleButton/CircleButton.ts';
import Block from '../../core/Block/Block.ts';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import messageController from '../../controllers/MessageController.ts';
import { InputMessage } from '../InputMessage/InputMessage.ts';
import { UploadButtonForMessage } from '../UploadButtonForMessage/UploadButtonForMessage.ts';

type FormDataMessageBlock = {
  message: string;
};

export class MessageBlockForm extends Block {
  validationService: ValidationForm<FormDataMessageBlock>;

  constructor() {
    const validationService = new ValidationForm<FormDataMessageBlock>();
    super({
      children: {
        UploadButtonForMessage: new UploadButtonForMessage(),
        InputMessage: new InputMessage({
          events: {
            input: (event: Event) => validationService.setFormData(event.target as HTMLInputElement),
          },
        }),
        CircleButton: new CircleButton({
          props: {
            className: s.sendMsgSubmit,
            type: 'submit',
          },
          events: {
            click: (event: Event) => this.sendMessage(event),
          },
        }),
      },
    });
    this.validationService = validationService;
  }

  protected override componentDidMount(): void {
    this.validationService.init('send-msg');
  }

  sendMessage(event: Event): void {
    event.preventDefault();
    const { message } = this.validationService.getFormValue();
    if (message) {
      messageController.sendMessage(message);
      this.validationService.reset();
    }
  }

  override render(): string {
    return `
                <form class="${s.sendMsgInputBlock}" name="send-msg">
                       {{{UploadButtonForMessage}}}
                       {{{InputMessage}}}
                       {{{CircleButton}}}
                </form>`;
  }
}
