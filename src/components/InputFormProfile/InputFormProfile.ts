import Block from "../../framework/Block.ts";
import {Input} from "../Input/Input.ts";
import {BlockProperties, EventBlock} from "../../framework/types/BlockProps.ts";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage.ts";
import {FormDataRegistration} from "../../page/Registration/RegistrationPage.ts";
import {ValidationFormService} from "../../services/AuthorizationService/ValidationFormService.ts";
import s from './InputFormProfile.module.pcss';

type InputFormProfileProps<T> = {
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    validationService: ValidationFormService<T>;
    inputChange?: () => void;
}

export class InputFormProfile<T> extends Block {
    constructor(inputFormProfileProps: BlockProperties<InputFormProfileProps<T>>) {
        super({
            props: {
                name: inputFormProfileProps.props?.name ?? '',
                label: inputFormProfileProps.props?.label ?? ''
            },
            children: {
                Input: new Input({
                    props: {
                        id: inputFormProfileProps.props?.name,
                        rightPlaceholder: true,
                        name: inputFormProfileProps.props?.name,
                        type: inputFormProfileProps.props?.type,
                        placeholder: inputFormProfileProps.props?.placeholder
                    },
                    events: {
                        input: inputFormProfileProps.props?.inputChange as EventBlock
                    }
                }),
                Error: new ErrorMessage<FormDataRegistration>({
                    props: {
                        className: s.errorMessageRight,
                        formName: inputFormProfileProps.props?.name ?? '',
                        validationFormService: inputFormProfileProps.props!.validationService
                    }
                }),
            }
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
