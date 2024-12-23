import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import s from "./SearchInput.module.pcss";

export type SearchInputProps = {
    placeholder?: string;
    className?: string;
}

export class SearchInput extends Block {
    constructor(linkProps: BlockProperties<SearchInputProps>) {
        super({
            ...linkProps
        });
    }

    override render(): string {
        return `<input class="${s.inputSearch} {{className}}" placeholder="{{placeholder}}"/>`;
    }
}
