import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";

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
            <div class="user-info-item">
                <span class="user-info-label user-info-text">{{label}}</span>
                <p class="user-info-description user-info-text">{{value}}</p>
            </div>
        `;
    }
}

