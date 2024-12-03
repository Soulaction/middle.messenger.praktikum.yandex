import Handlebars from 'handlebars';
import * as Pages from './page';

import Label from './components/label/Label';
import Input from './components/input/Input';
import ErrorMessage from './components/errorMessage/ErrorMessage.ts';
import Button from './components/button/Button';
import Link from './components/link/Link';

Handlebars.registerPartial('Label', Label);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('ErrorMessage', ErrorMessage);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);

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
        let template: HandlebarsTemplateDelegate;
        let templateData = {};

        switch (this.state.urlPage) {
            case '/registration':
                template = Handlebars.compile(Pages.RegistrationPage);
                break;
            case '/chats':
                template = Handlebars.compile(Pages.ChatsPage);
                break;
            case '/login':
                template = Handlebars.compile(Pages.LoginPage);
                break;
            case '/profile':
                template = Handlebars.compile(Pages.ProfilePage);
                break;
            case '/profile-edit':
                template = Handlebars.compile(Pages.ProfileEdit);
                break;
            case '/profile-password':
                template = Handlebars.compile(Pages.ChangePassword);
                break;
            case '/not-found':
                template = Handlebars.compile(Pages.ErrorPage);
                templateData = {code: 404, errorText: 'Не туда попали'};
                break;
            case '/server-error':
                template = Handlebars.compile(Pages.ErrorPage);
                templateData = {code: 500, errorText: 'Мы уже фиксим'};
                break;
            default:
                this.changePage('/not-found');
                return;
        }
        this.appContainer.innerHTML = template(templateData);
        this.addEventListeners();
    }

    addEventListeners(): void {

    }

    changePage(url: string): void {
        this.state.urlPage = url;
        window.location.pathname = url;
        this.render();
    }
}