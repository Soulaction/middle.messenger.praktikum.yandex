import { Input } from '../Input/Input.ts';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage.ts';
import { FormDataRegistration } from '../../page/Registration/RegistrationPage.ts';
import s from './InputFormProfile.module.pcss';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import { BlockProperties, EventBlock } from '../../core/Block/types/BlockProps.ts';
import Block from '../../core/Block/Block.ts';

type InputFormProfileProps<T> = {
  id?: string;
  label: string;
  name: string;
  value?: string;
  type?: string;
  placeholder: string;
  validationService: ValidationForm<T>;
  inputChange?: (event: Event) => void;
  blur?: (event: Event) => void;
};

export class InputFormProfile<T> extends Block {
  constructor(inputFormProfileProps: BlockProperties<InputFormProfileProps<T>>) {
    super({
      props: {
        name: inputFormProfileProps.props?.name ?? '',
        label: inputFormProfileProps.props?.label ?? '',
      },
      children: {
        Input: new Input({
          props: {
            id: inputFormProfileProps.props?.id ?? inputFormProfileProps.props?.name,
            rightPlaceholder: true,
            name: inputFormProfileProps.props?.name,
            value: inputFormProfileProps.props?.value,
            type: inputFormProfileProps.props?.type,
            placeholder: inputFormProfileProps.props?.placeholder,
          },
          events: {
            blur: inputFormProfileProps.props?.blur as EventBlock,
            input: inputFormProfileProps.props?.inputChange as EventBlock,
          },
        }),
        Error: new ErrorMessage<FormDataRegistration>({
          props: {
            className: s.errorMessageRight,
            formName: inputFormProfileProps.props?.name ?? '',
            validationFormService: inputFormProfileProps.props!.validationService,
          },
        }),
      },
    });
  }

  override render(): string {
    return `
                <div>
                    <div class="${s.userInfoItemEdit}">
                        <label class="user-info-label"
                               for="{{name}}">
                                   {{label}}
                               </label>
                        {{{Input}}}
                    </div>
                    {{{Error}}}
                 </div>
        `;
  }
}
