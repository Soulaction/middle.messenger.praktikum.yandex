import {Link} from "../../components/Link/Link.ts";
import s from "./ErrorPage.module.pcss";
import Block from "../../core/Block/Block.ts";
import {BlockProperties} from "../../core/Block/types/BlockProps.ts";
import {navigate} from "../../utils/utils.ts";

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
                        label: 'Назад к чатам'
                    },
                    events: {
                        click: (event: Event) => navigate('/chat', event)
                    }
                })
            }
        });
    }

    override render(): string {
        return `
                <main class="page-wrapper">
                    <h1 class="${s.errorTitle}">{{code}}</h1>
                    <p class="${s.errorText}">{{errorText}}</p>
                    {{{Link}}}
                </main>
        `;
    }
}
