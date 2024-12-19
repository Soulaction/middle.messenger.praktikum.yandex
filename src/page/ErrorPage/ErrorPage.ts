import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import {Link} from "../../components/Link/Link.ts";

export type ErrorProps = {
    code: string;
    errorText: string;
}

export class ErrorPage extends Block {

    constructor(errorProps: BlockProperties<ErrorProps>) {
        super({
            ...errorProps,
            children: {
                Link: new Link({
                    props: {
                        label: 'Назад к чатам',
                        link: '#'
                    }
                })
            }
        });
    }

    override render(): string {
        return `
                <main class="page-wrapper">
                    <h1 class="error-title">{{code}}</h1>
                    <p class="error-text">{{errorText}}</p>
                    {{{Link}}}
                </main>
        `;
    }
}
