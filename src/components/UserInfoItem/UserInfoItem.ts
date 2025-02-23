import s from './UserInfoItem.module.pcss';
import Block from '../../core/Block/Block.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';

export type UserInfoItemProps = {
  label: string;
  value: string;
};

export class UserInfoItem extends Block {
  constructor(userInfoItemProps: BlockProperties<UserInfoItemProps>) {
    super({
      ...userInfoItemProps,
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
