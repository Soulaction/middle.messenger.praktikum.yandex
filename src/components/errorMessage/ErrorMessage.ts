import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import {ValidationFormService} from "../../services/AuthorizationService/ValidationFormService.ts";
import {FormValue} from "../../services/AuthorizationService/types/FormValue.ts";

type ErrorMessageProps<T> = {
    name: string;
    errorText?: string;
    validationFormService: ValidationFormService<T>;
}

export class ErrorMessage<T> extends Block {
    constructor(errorMessagePropsProps: BlockProperties<ErrorMessageProps<T>>) {
        super({
            ...errorMessagePropsProps
        });
        console.log(errorMessagePropsProps)

    }

    override componentDidMount() {
        const props = this.props as ErrorMessageProps<T>;
        if (props) {
            (props).validationFormService.changeValueForm((data) => {
                const error: string = (data as FormValue<Record<string, unknown>>)[props.name]?.errors[0] ?? '';
                if (props.errorText !== error) {
                    this.setProps({errorText: error});
                }
            })
        }
    }

    override render(): string {
        return `<p class="error-message {{class}}">{{errorText}}</p>`;
    }
}
