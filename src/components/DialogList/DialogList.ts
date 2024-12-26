import Block from "../../framework/Block.ts";
import s from "./DialogList.module.pcss";
import {DialogItem} from "../DialogItem/DialogItem.ts";
import {LinkProfile} from "../LinkProfile/LinkProfile.ts";
import {SearchInput} from "../SearchInput/SearchInput.ts";
import {Modal} from "../Modal/Modal.ts";
import {CreateChatModal} from "../../modals/CreateChatModal/CreateChatModal.ts";
import {ButtonIcon} from "../ButtonIcon/ButtonIcon.ts";
import {BlockProperties} from "../../framework/types/BlockProps.ts";

export type DialogListProps = {
    ChatList: DialogItem[]
}

export class DialogList extends Block {
    constructor(dialogListProps: BlockProperties<DialogListProps>) {
        const createChatModal = new Modal({
            children: {
                ContentModal: new CreateChatModal()
            }
        });

        super({
            children: {
                ButtonIconAdd: new ButtonIcon({
                    props: {
                        iconLink: '/icons/add.svg'
                    },
                    events: {
                        click: () => createChatModal.openModel()
                    }
                }),
                LinkProfile: new LinkProfile({
                    props: {
                        link: '#'
                    }
                }),
                SearchInput: new SearchInput({
                    props: {
                        placeholder: 'Поиск',
                        className: s.searchInput
                    }
                }),
                CreateChatModal: createChatModal
            },
            lists: {
                ChatList: dialogListProps.props!.ChatList
            }
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
