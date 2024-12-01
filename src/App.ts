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

    constructor() {
        const appContainer: HTMLDivElement | null = document.getElementById('app') as HTMLDivElement;
        if (!appContainer) {
            throw new Error('Not found app div');
        }
        this.appContainer = appContainer;
    }

    render(): void {
        const template: HandlebarsTemplateDelegate = Handlebars.compile(Pages.LoginPage);

        this.appContainer.innerHTML = template({});
        console.log(Pages.LoginPage);
    }
}