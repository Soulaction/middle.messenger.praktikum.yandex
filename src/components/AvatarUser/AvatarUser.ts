import s from './AvatarUser.module.pcss';
import Block from '../../core/Block/Block.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';
import { Modal } from '../Modal/Modal.ts';
import { UploadFileModal } from '../../modals/UploadFileModal/UploadFileModal.ts';

export type AvatarUserProps = {
  imgUrl: string;
};

export class AvatarUser extends Block {
  constructor(avatarUserProps: BlockProperties<AvatarUserProps>) {
    const uploadFileModal = new Modal({
      children: {
        ContentModal: new UploadFileModal({
          props: {
            titleModal: 'Загрузите файл',
          },
        }),
      },
    });

    super({
      ...avatarUserProps
      ,
      children: {
        UploadFileModal: uploadFileModal,
      },
      events: {
        click: () => uploadFileModal.openModel(),
      },
    });
  }

  override render(): string {
    return `
            <div>               
                {{{UploadFileModal}}}
                <div class="${s.userAvatarWrapper}">
                    <img class="${s.userAvatar}" src="{{imgUrl}}" alt="Иконка профиля"/>
                </div>
            </div>
        `;
  }
}
