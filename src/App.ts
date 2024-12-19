import {ErrorPage, ChangePasswordPage, LoginPage, ProfilePage, RegistrationPage} from "./page";

export class App {
    appContainer: HTMLDivElement;
    state: { urlPage: string };

    constructor() {
        const appContainer: HTMLDivElement | null = document.getElementById('app') as HTMLDivElement;
        if (!appContainer) {
            throw new Error('Not found app div');
        }
        this.appContainer = appContainer;
        this.state = {urlPage: window.location.pathname};
    }

    render(): void {


        switch (this.state.urlPage) {
            case '/registration':
                const regPage = new RegistrationPage();
                this.appContainer.replaceWith(regPage.getContent());
                regPage.dispatchComponentDidMount();
                break;
            case '/chats':
                // const chatsPage = new RegistrationPage();
                // this.appContainer.replaceWith(chatsPage.getContent());
                // regPage.dispatchComponentDidMount();
                break;
            case '/':
            case '/login':
                const loginPage = new LoginPage();
                this.appContainer.replaceWith(loginPage.getContent());
                loginPage.dispatchComponentDidMount();
                break;
            case '/profile':
                const profilePage = new ProfilePage();
                this.appContainer.replaceWith(profilePage.getContent());
                profilePage.dispatchComponentDidMount();
                break;
            case '/profile-edit':
                // template = Handlebars.compile(Pages.ProfileEdit);
                break;
            case '/profile-password':
                // template = Handlebars.compile(Pages.ChangePassword);
                const changePasswordPage = new ChangePasswordPage();
                this.appContainer.replaceWith(changePasswordPage.getContent());
                changePasswordPage.dispatchComponentDidMount();
                break;
            case '/not-found':
                const errorPage = new ErrorPage({
                    props: {
                        code: '404',
                        errorText: 'Не туда попали'
                    }
                });
                this.appContainer.replaceWith(errorPage.getContent());
                errorPage.dispatchComponentDidMount();
                break;
            case '/server-error':
                const errorServerPage = new ErrorPage({
                    props: {
                        code: '500',
                        errorText: 'Мы уже фиксим'
                    }
                });
                this.appContainer.replaceWith(errorServerPage.getContent());
                errorServerPage.dispatchComponentDidMount();
                break;
            default:
                this.changePage('/not-found');
                return;
        }
    }

    changePage(url: string): void {
        this.state.urlPage = url;
        window.location.pathname = url;
        this.render();
    }
}
