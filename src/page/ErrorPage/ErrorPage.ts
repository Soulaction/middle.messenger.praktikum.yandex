import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import {Link} from "../../components/Link/Link.ts";
import s from "./ErrorPage.module.pcss";

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
                    <h1 class="${s.errorTitle}">{{code}}</h1>
                    <p class="${s.errorText}">{{errorText}}</p>
                    {{{Link}}}
                </main>
        `;
    }
}
