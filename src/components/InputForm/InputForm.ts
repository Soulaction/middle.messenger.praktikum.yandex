import { Label } from '../Label/Label.ts';
import { Input } from '../Input/Input.ts';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage.ts';
import { FormDataRegistration } from '../../page/Registration/RegistrationPage.ts';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import Block from '../../core/Block/Block.ts';
import { BlockProperties, EventBlock } from '../../core/Block/types/BlockProps.ts';

type InputFormProps<T> = {
  className?: string;
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  validationService: ValidationForm<T>;
  inputChange?: () => void;
};

export class InputForm<T> extends Block {
  constructor(inputFormProps: BlockProperties<InputFormProps<T>>) {
    super({
      props: {
        className: inputFormProps.props?.className ?? '',
      },
      children: {
        Label: new Label({
          props: {
            label: inputFormProps.props?.label ?? '',
            for: inputFormProps.props?.name,
          },
        }),
        Input: new Input({
          props: {
            id: inputFormProps.props?.name,
            name: inputFormProps.props?.name,
            type: inputFormProps.props?.type,
            placeholder: inputFormProps.props?.placeholder,
          },
          events: {
            input: inputFormProps.props?.inputChange as EventBlock,
          },
        }),
        Error: new ErrorMessage<FormDataRegistration>({
          props: {
            formName: inputFormProps.props?.name ?? '',
            validationFormService: inputFormProps.props!.validationService,
          },
        }),
      },
    });
  }

  override render(): string {
    return `
                <div class="input-wrapper {{className}}">
                        {{{Label}}}
                        {{{Input}}}
                        {{{Error}}}
                </div>
                `;
  }
}
