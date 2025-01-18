import s from './AvatarUser.module.pcss';
import Block from '../../core/Block/Block.ts';
import {Modal} from '../Modal/Modal.ts';
import {UploadFileModal} from '../../modals/UploadFileModal/UploadFileModal.ts';
import {wrapStore} from "../../core/utils/wrapStore.ts";
import {getAvatar} from "../../utils/utils.ts";

export type AvatarUserProps = {
  imgUrl?: string;
};

class AvatarUser extends Block {
  constructor() {
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
                    <img class="${s.userAvatar}" 
                         src="{{imgUrl}}" 
                         alt="Иконка профиля"/>
                </div>
            </div>
        `;
  }
}

export const AvatarUserWithStore = wrapStore<Partial<AvatarUserProps>>((state) => (
    {imgUrl: getAvatar(state.user?.data.avatar)}
))(AvatarUser);
