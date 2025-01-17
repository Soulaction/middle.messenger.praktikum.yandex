import {Router} from "./core/Routing/Router.ts";
import {routeItems} from "./utils/routs.ts";
import authController from "./controllers/AuthController.ts";

export class App {
    appContainer: HTMLElement;

    constructor() {
        const appContainer: HTMLElement | null = document.getElementById('app') as HTMLElement;
        if (!appContainer) {
            throw new Error('Not found app div');
        }
        this.appContainer = appContainer;
    }

    render(): void {
        const router = new Router(this.appContainer);
        router.init(routeItems);
        authController.getAuthUserInfo();
    }
}
