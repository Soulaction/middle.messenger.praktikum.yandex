import s from './MessageBlockForm.module.pcss';
import {CircleButton} from '../CircleButton/CircleButton.ts';
import {ButtonIcon} from '../ButtonIcon/ButtonIcon.ts';
import {ContextMenu, MenuItem} from '../ContextMenu/ContextMenu.ts';
import Block from '../../core/Block/Block.ts';
import {ValidationForm} from '../../core/Validation/ValidationForm.ts';
import messageController from "../../controllers/MessageController.ts";
import fileIcon from '/icons/file.svg?url';
import locationIcon from '/icons/location.svg?url';


type FormDataMessageBlock = {
    message: string;
};

export class MessageBlockForm extends Block {
    validationService: ValidationForm<FormDataMessageBlock>;

    contextMenuClip!: ContextMenu;

    constructor() {
        const validationService = new ValidationForm<FormDataMessageBlock>();
        const menuItemClip: MenuItem[] = [
            {
                iconURL: fileIcon,
                text: 'Файл',
                event: () => {
                },
            },
            {
                iconURL: locationIcon,
                text: 'Локация',
                event: () => {
                },
            },
        ];

        super({
            children: {
                ButtonIconClip: new ButtonIcon({
                    props: {
                        iconLink: '/icons/clip.svg',
                    },
                    events: {
                        click: event => this.showMenuClip(event),
                    },
                }),
                ContextMenuClip: new ContextMenu({
                    props: {
                        items: menuItemClip,
                    },
                }),
                CircleButton: new CircleButton({
                    props: {
                        className: s.sendMsgSubmit,
                        type: 'submit',
                    },
                    events: {
                        click: (event: Event) => this.sendMessage(event),
                    },
                }),
            }
        });
        this.validationService = validationService;
    }

    protected override componentDidMount(): void {
        this.validationService.init('send-msg');
    }

    sendMessage(event: Event): void {
        event.preventDefault();
        const {message} = this.validationService.getFormValue();
        if (message) {
            messageController.sendMessage(message);
        }
    }

    showMenuClip(event: Event): void {
        const imgIcon: HTMLImageElement = event.target as HTMLImageElement;
        const imgIconSize: DOMRect = imgIcon.getBoundingClientRect();
        const bottom: number = window.innerHeight - imgIconSize.top + 24;
        const left: number = imgIconSize.left - 8;

        this.contextMenuClip.openContextMenu({bottom, left});
    }

    override render(): string {
        return `
                <form class="${s.sendMsgInputBlock}" name="send-msg">
                       {{{ButtonIconClip}}}
                       <input class="${s.sendMsgInput}" name="message" placeholder="Сообщение"/>
                       {{{CircleButton}}}
                       {{{ContextMenuClip}}}
                </form>`;
    }
}
