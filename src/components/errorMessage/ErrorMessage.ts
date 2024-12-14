import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";

type ErrorMessageProps = {
    class?: string;
    errorText: string;
}

export class ErrorMessage extends Block {
    constructor(errorMessagePropsProps: BlockProperties<ErrorMessageProps>) {
        super({
            ...errorMessagePropsProps
        });
    }

    override render(): string {
        return `<p class="error-message {{class}}">{{errorText}}</p>`;
    }
}
