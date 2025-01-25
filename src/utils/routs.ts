import { RouteItem } from '../core/Routing/types/RouteItem.ts';
import { ChatPage, LoginPage, ProfilePage, RegistrationPage, ErrorPage } from '../page';
import { RoutePath } from './const.ts';

export const routeItems: RouteItem[] = [
  {
    pathname: RoutePath.signIn,
    Component: LoginPage,
  },
  {
    pathname: RoutePath.signUp,
    Component: RegistrationPage,
  },
  {
    pathname: RoutePath.settings,
    Component: ProfilePage,
  },
  {
    pathname: RoutePath.messenger,
    Component: ChatPage,
  },
  {
    pathname: RoutePath.notFound,
    Component: ErrorPage,
  },
];
