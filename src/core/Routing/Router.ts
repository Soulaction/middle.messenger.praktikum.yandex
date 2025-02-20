import { Route } from './Route.ts';
import { isEqualSrt } from '../utils/isEqualSrt.ts';
import { RouteItem } from './types/RouteItem.ts';

export class Router {
  private appContainer!: HTMLElement;

  private static instance: Router;

  private currentRoute: Route | null = null;

  private forEveryOneRoute: Route | null = null;

  public routes: Route[] = [];

  public readonly history: History = window.history;


  constructor(appContainer: HTMLElement) {
    if (Router.instance) {
      return Router.instance;
    }

    this.appContainer = appContainer;
    this.routes = [];
    this.currentRoute = null;

    Router.instance = this;
  }

  private start(): void {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.addEventListener('popstate', (event: PopStateEvent) => {
      if (event.currentTarget) {
        this.onRoute((event.currentTarget as Window).location.pathname);
      }
    });
    this.onRoute(window.location.pathname);
  }

  private onRoute(pathname: string): void {
    const route = this.getRoute(pathname) ?? this.forEveryOneRoute;
    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    } else if (this.currentRoute && this.currentRoute === route) {
      return;
    }

    this.currentRoute = route;
    route.go(pathname);
  }

  static getRouterInstance(): Router | never {
    if (!Router.instance) {
      throw new Error('Router not found');
    }

    return Router.instance;
  }

  init(routeItems: RouteItem[]): void {
    routeItems.forEach(routeItem => {
      const route = new Route(this.appContainer, routeItem);
      if (routeItem.pathname === '*') {
        this.forEveryOneRoute = route;
      } else {
        this.routes.push(route);
      }
    });
    this.start();
  }

  go<T>(pathname: string, state?: T): void {
    this.history.pushState(state, '', pathname);
    this.onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => isEqualSrt(route.pathname, pathname));
  }
}
