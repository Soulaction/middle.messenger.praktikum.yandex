import { Button } from '../../components/Button/Button.ts';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage.ts';
import s from './UploadFileModal.module.pcss';
import { UploadButton } from '../../components/UploadButton/UploadButton.ts';
import Block from '../../core/Block/Block.ts';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';
import userController from '../../controllers/UserController.ts';
import store from '../../core/Store.ts';

type FormDataFile = {
  file: FileList;
};

type UploadFileModalProps = {
  titleModal?: string;
};

export class UploadFileModal extends Block {
  validationService: ValidationForm<FormDataFile>;

  constructor(uploadFileModalProps: BlockProperties<UploadFileModalProps>) {
    const validationService = new ValidationForm<FormDataFile>();

    super({
      props: {
        titleModal: 'Нужно выбрать файл',
        ...uploadFileModalProps.props,
      },
      children: {
        UploadButton: new UploadButton(
          {
            props: {
              label: 'Выбрать файл на компьютере',
              name: 'file',
              class: s.uploadFile,
              validationFormService: validationService,
            },
          }),
        Button: new Button({
          props: {
            label: 'Поменять',
            type: 'submit',
            class: 'submit-btn-modal',
          },
          events: {
            click: (event: Event) => this.uploadFile(event),
          },
        }),
      },
    });
    this.validationService = validationService;
  }

  override componentDidMount() {
    this.validationService.init('upload-file');
  }

  uploadFile(event: Event): void {
    event.preventDefault();
    const file = this.validationService.formValue.file;

    if (file?.value && file?.value[0]) {
      void userController.changeUserAvatar(file.value as FileList);
      this.setChildren({
        Error: new ErrorMessage<FormDataFile>({
          props: {
            formName: 'file',
            errorText: '',
          },
        }),
      });
      store.set('isOpenUploadFileModal', false);
    } else {
      this.setChildren({
        Error: new ErrorMessage<FormDataFile>({
          props: {
            formName: 'file',
            errorText: 'Выберете файл',
          },
        }),
      });
    }
  }

  override render(): string {
    return `
                 <form class="form-modal" name="upload-file">
                     <h1 class="title-modal">{{titleModal}}</h1>
                     {{{UploadButton}}}
                     {{{Error}}}
                     {{{Button}}}
                 </form>
                `;
  }
}
