import s from './DialogList.module.pcss';
import { DialogItem } from '../DialogItem/DialogItem.ts';
import { LinkProfile } from '../LinkProfile/LinkProfile.ts';
import { SearchInput } from '../SearchInput/SearchInput.ts';
import { Modal } from '../Modal/Modal.ts';
import { CreateChatModal } from '../../modals/CreateChatModal/CreateChatModal.ts';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon.ts';
import Block from '../../core/Block/Block.ts';
import { BlockProperties } from '../../core/Block/types/BlockProps.ts';
import { navigate } from '../../utils/utils.ts';

export type DialogListProps = {
  ChatList: DialogItem[]
};

export class DialogList extends Block {
  constructor(dialogListProps: BlockProperties<DialogListProps>) {
    const createChatModal = new Modal({
      children: {
        ContentModal: new CreateChatModal(),
      },
    });

    super({
      children: {
        ButtonIconAdd: new ButtonIcon({
          props: {
            iconLink: '/icons/add-grey.svg',
          },
          events: {
            click: () => createChatModal.openModel(),
          },
        }),
        LinkProfile: new LinkProfile({
          events: {
            click: (event: Event) => navigate('/profile', event),
          },
        }),
        SearchInput: new SearchInput({
          props: {
            placeholder: 'Поиск',
            className: s.searchInput,
          },
        }),
        CreateChatModal: createChatModal,
      },
      lists: {
        ChatList: dialogListProps.props!.ChatList,
      },
    });
  }

  override render(): string {
    return `<div class="${s.panelChat}">
                    <div class="${s.panelHeader}">
                        <div class="${s.subHeader}">
                            {{{ButtonIconAdd}}}
                            {{{LinkProfile}}}
                        </div>
                        {{{SearchInput}}}
                    </div>
                    <ul class="${s.listChat}">
                         {{{ChatList}}}
                    </ul>
                        {{{CreateChatModal}}}
                 </div>`;
  }
}
