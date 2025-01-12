import {AvatarUser} from '../../components/AvatarUser';
import s from './ProfilePage.module.pcss';
import Block from '../../core/Block/Block.ts';
import {navigate} from "../../core/utils/navigate.ts";
import {RoutePath} from "../../utils/const.ts";
import {ProfileInfo} from "../../components/ProfileInfo";
import {CircleButton} from "../../components/CircleButton/CircleButton.ts";
import {ModeProfile} from "../../types/ModeProfile.ts";
import {ChangePasswordProfile} from "../../components/ChangePasswordProfile";
import {ProfileEdited} from "../../components/ProfileEdit/ProfileEdit.ts";

export class ProfilePage extends Block {
    private blockMode: string = '';

    constructor() {
        super({
            children: {
                AvatarUser: new AvatarUser({
                    props: {
                        imgUrl: '/images/profile.png',
                    },
                }),
                CircleButton: new CircleButton({
                    props: {
                        type: 'button',
                    },
                    events: {
                        click: (event: Event) => this.goToMessagePage(event),
                    }
                }),
            },
        });
    }

    protected override componentDidMount() {
        this.changeMode('profileInfo');
    }

    goToMessagePage(event: Event): void {
        event.preventDefault();
        navigate().go(RoutePath.messenger);
    }

    changeMode(mode: ModeProfile): void {
        switch (mode) {
            case "changeProfile":
                const profileEditedPage = new ProfileEdited();
                this.blockMode = '{{{ProfileEditedPage}}}';

                this.setChildren({
                    ProfileInfo: null,
                    ProfileEditedPage: profileEditedPage,
                    ChangePasswordProfile: null
                });
                profileEditedPage.componentDidMount();
                break;
            case "changePassword":
                const changePasswordProfile = new ChangePasswordProfile();
                this.blockMode = '{{{ChangePasswordProfile}}}';

                this.setChildren({
                    ProfileInfo: null,
                    ProfileEditedPage: null,
                    ChangePasswordProfile: changePasswordProfile,
                });
                changePasswordProfile.componentDidMount();
                break;
            default:
                const profileInfo = new ProfileInfo({
                    props: {
                        changeMode: (mode: ModeProfile) => this.changeMode(mode)
                    }
                });
                this.blockMode = '{{{ProfileInfo}}}';

                this.setChildren({
                    ProfileInfo: profileInfo,
                    ProfileEditedPage: null,
                    ChangePasswordProfile: null,
                });
                profileInfo.componentDidMount();
        }
    }

    override render(): string {
        return `
                    <main class="page-profile">
                        <div class="left-panel">
                            {{{CircleButton}}}
                        </div>
                        <div class="${s.pageProfileContent}">
                            {{{AvatarUser}}}
                            ${this.blockMode}
                        </div>
                    </main>
                `;
    }
}
