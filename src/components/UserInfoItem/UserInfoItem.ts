import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";
import s from "./UserInfoItem.module.pcss";

export type UserInfoItemProps = {
    label: string;
    value: string;
}

export class UserInfoItem extends Block {

    constructor(userInfoItemProps: BlockProperties<UserInfoItemProps>) {
        super({
            ...userInfoItemProps
        });
    }

    override render(): string {
        return `
            <div class="${s.userInfoItem}">
                <span class="user-info-label">{{label}}</span>
                <p class="${s.userInfoDescription}">{{value}}</p>
            </div>
        `;
    }
}
