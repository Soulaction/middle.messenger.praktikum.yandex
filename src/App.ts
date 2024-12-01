import Handlebars from 'handlebars';
import * as Pages from './page';

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