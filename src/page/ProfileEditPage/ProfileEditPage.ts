import {InputFormProfile} from "../../components/InputFormProfile/InputFormProfile.ts";
import {Button} from "../../components/Button/Button.ts";
import s from "./ProfileEditPage.module.pcss";
import {AvatarUser} from "../../components/AvatarUser";
import {CircleButton} from "../../components/CircleButton/CircleButton";
import Block from "../../core/Block/Block.ts";
import {ValidationForm} from "../../core/Validation/ValidationForm.ts";

export type FormDataProfileEdite = {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
}

export class ProfileEditedPage extends Block {
    validationService: ValidationForm<FormDataProfileEdite>;

    constructor() {
        const validationService = new ValidationForm<FormDataProfileEdite>();
        super({
            children: {
                AvatarUser: new AvatarUser({
                    props: {
                        imgUrl: '/images/profile.png'
                    }
                }),
                InputFormProfileEmail: new InputFormProfile<FormDataProfileEdite>({
                    props: {
                        label: 'Почта',
                        name: 'email',
                        type: 'email',
                        placeholder: 'Введите почтовый адрес',
                        validationService
                    }
                }),
                InputFormProfileLogin: new InputFormProfile<FormDataProfileEdite>({
                    props: {
                        label: 'Логин',
                        name: 'login',
                        type: 'text',
                        placeholder: 'Введите логин',
                        validationService
                    }
                }),
                InputFormProfileFirstName: new InputFormProfile<FormDataProfileEdite>({
                    props: {
                        label: 'Имя',
                        name: 'first_name',
                        type: 'text',
                        placeholder: 'Введите имя',
                        validationService
                    }
                }),
                InputFormProfileSecondName: new InputFormProfile<FormDataProfileEdite>({
                    props: {
                        label: 'Фамилия',
                        name: 'second_name',
                        type: 'text',
                        placeholder: 'Введите фамилию',
                        validationService
                    }
                }),
                InputFormProfileDisplayName: new InputFormProfile<FormDataProfileEdite>({
                    props: {
                        label: 'Имя в чате',
                        name: 'display_name',
                        type: 'text',
                        placeholder: 'Введите имя в чате',
                        validationService
                    }
                }),
                InputFormProfilePhone: new InputFormProfile<FormDataProfileEdite>({
                    props: {
                        label: 'Телефон',
                        name: 'phone',
                        type: 'tel',
                        placeholder: 'Введите номер телефона',
                        validationService
                    }
                }),
                CircleButton: new CircleButton({
                    props: {
                        type: 'button'
                    }
                }),
                Button: new Button({
                    props: {
                        label: 'Сохранить'
                    }
                })
            }
        });
        this.validationService = validationService;
    }

    override componentDidMount() {
        this.validationService.init('edit-profile', {
            email: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            },
            login: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            },
            first_name: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            },
            second_name: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            },
            display_name: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            },
            phone: {
                errors: {
                    required: {rule: true, message: 'Обязательно для вввода'}
                }
            }
        });
    }

    override render(): string {
        return `
                <main class="page-profile">
                    <div class="left-panel">
                        {{{CircleButton}}}
                    </div>
                    <div class="page-wrapper page-profile-content">
                        {{{AvatarUser}}}
                        <form class="user-info" name="edit-profile">
                                {{{InputFormProfileEmail}}}
                                {{{InputFormProfileLogin}}}
                                {{{InputFormProfileFirstName}}}
                                {{{InputFormProfileSecondName}}}
                                {{{InputFormProfileDisplayName}}}
                                {{{InputFormProfilePhone}}}
                            <footer class="${s.userEditDataFooter}">
                                {{{Button}}}
                            </footer>
                        </form>
                    </div>
                </main>
        `;
    }
}
