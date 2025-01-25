import s from './ErrorMessage.module.pcss';
import { ValidationForm } from '../../core/Validation/ValidationForm.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';
import Block from '../../core/Block/Block.ts';
import { FormValue } from '../../core/Validation/types/FormValue.ts';

type ErrorMessageProps<T> = {
  className?: string;
  formName: string;
  errorText?: string;
  validationFormService?: ValidationForm<T>;
};

export class ErrorMessage<T> extends Block {
  constructor(errorMessagePropsProps: BlockProperties<ErrorMessageProps<T>>) {
    super({
      ...errorMessagePropsProps,
    });
  }

  override componentDidMount() {
    const props = this.props as ErrorMessageProps<T>;

    if (props && props.validationFormService) {
      props.validationFormService.changeValueForm((data) => {
        const error: string = (data as FormValue<Record<string, unknown>>)[props.formName]?.errors[0] ?? '';
        if (props.errorText !== error) {
          this.setProps({ errorText: error });
        }
      });
    }
  }

  override render(): string {
    return `<p class="${s.errorMessage} {{className}}">{{errorText}}</p>`;
  }
}
