import s from './MessageBlockForm.module.pcss';
import {CircleButton} from '../CircleButton/CircleButton.ts';
import {ButtonIcon} from '../ButtonIcon/ButtonIcon.ts';
import {ContextMenu, MenuItem} from '../ContextMenu/ContextMenu.ts';
import Block from '../../core/Block/Block.ts';
import {ValidationForm} from '../../core/Validation/ValidationForm.ts';
import messageController from "../../controllers/MessageController.ts";
import fileIcon from '/icons/file.svg?url';
import {InputMessage} from "../InputMessage/InputMessage.ts";


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
        ];
        const contextMenuClip = new ContextMenu({
            props: {
                items: menuItemClip,
            },
        });

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
                InputMessage: new InputMessage({
                    events: {
                        input: (event: Event) => validationService.setFormData(event.target as HTMLInputElement)
                    },
                }),
                ContextMenuClip: contextMenuClip,
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
        this.contextMenuClip = contextMenuClip;
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
                       {{{InputMessage}}}
                       {{{CircleButton}}}
                       {{{ContextMenuClip}}}
                </form>`;
    }
}
