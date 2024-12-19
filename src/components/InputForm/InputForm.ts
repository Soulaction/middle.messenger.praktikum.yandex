import Block from "../../framework/Block.ts";
import {BlockProperties, EventBlock} from "../../framework/types/BlockProps.ts";
import {Label} from "../Label/Label.ts";
import {Input} from "../Input/Input.ts";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage.ts";
import {FormDataRegistration} from "../../page/registration/RegistrationPage.ts";
import {ValidationFormService} from "../../services/AuthorizationService/ValidationFormService.ts";

type InputFormProps<T> = {
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    validationService: ValidationFormService<T>;
    inputChange?: () => void;
}

export class InputForm<T> extends Block {
    constructor(inputFormProps: BlockProperties<InputFormProps<T>>) {
        super({
            children: {
                Label: new Label({
                    props: {
                        label: inputFormProps.props?.label ?? '',
                        for: inputFormProps.props?.name
                    }
                }),
                Input: new Input({
                    props: {
                        id: inputFormProps.props?.name,
                        name: inputFormProps.props?.name,
                        type: inputFormProps.props?.type,
                        placeholder: inputFormProps.props?.placeholder
                    },
                    events: {
                        input: inputFormProps.props?.inputChange as EventBlock
                    }
                }),
                Error: new ErrorMessage<FormDataRegistration>({
                    props: {
                        name: inputFormProps.props?.name ?? '',
                        validationFormService: inputFormProps.props!.validationService
                    }
                }),
            }
        });
    }

    override render(): string {
        return `
                <div class="input-wrapper">
                        {{{Label}}}
                        {{{Input}}}
                        {{{Error}}}
                </div>
                `;
    }
}
