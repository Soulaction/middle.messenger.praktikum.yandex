import Block from "../../framework/Block.ts";
import {Input} from "../Input/Input.ts";
import {BlockProperties, EventBlock} from "../../framework/types/BlockProps.ts";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage.ts";
import {FormDataRegistration} from "../../page/Registration/RegistrationPage.ts";
import {ValidationFormService} from "../../services/AuthorizationService/ValidationFormService.ts";

type InputFormProfileProps<T> = {
    classInput?: string;
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
                        className: inputFormProfileProps.props?.classInput,
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
                        name: inputFormProfileProps.props?.name ?? '',
                        validationFormService: inputFormProfileProps.props!.validationService
                    }
                }),
            }
        });
    }

    override render(): string {
        return `
                 <div class="user-info-item-edit">
                     <label class="user-info-label user-info-label-edit user-info-text"
                            for="{{name}}">
                                {{label}}
                            </label>
                     {{{Input}}}
                     {{{Error}}}
                 </div>
        `;
    }
}






export default `

`;
