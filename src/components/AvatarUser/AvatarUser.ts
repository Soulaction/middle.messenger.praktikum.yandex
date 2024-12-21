import Block from "../../framework/Block.ts";
import {BlockProperties} from "../../framework/types/BlockProps";
import s from "./AvatarUser.module.pcss";

export type AvatarUserProps = {
    imgUrl: string;
}

export class AvatarUser extends Block {
    constructor(avatarUserProps: BlockProperties<AvatarUserProps>) {
        super({
            ...avatarUserProps
        });
    }

    override render(): string {
        return `
                <div class="${s.userAvatarWrapper}">
                    <img class="${s.UserAvatar}" src="{{imgUrl}}" alt="Иконка профиля"/>
                </div>
        `;
    }
}
