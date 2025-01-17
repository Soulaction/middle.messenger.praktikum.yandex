import {RouteItem} from "../core/Routing/types/RouteItem.ts";
import {ErrorPage, ErrorProps} from "../page/ErrorPage/ErrorPage.ts";
import {ChatPage, LoginPage, ProfilePage, RegistrationPage} from "../page";
import {RoutePath} from "./const.ts";

export const routeItems: RouteItem<ErrorProps>[] = [
    {
        pathname: RoutePath.signIn,
        Component: LoginPage
    },
    {
        pathname: RoutePath.signUp,
        Component: RegistrationPage
    },
    {
        pathname: RoutePath.settings,
        Component: ProfilePage,
        blockProps: {
            props: {
                mode: 'profileInfo',
            },
        }
    },
    {
        pathname: RoutePath.messenger,
        Component: ChatPage
    },
    {
        pathname: RoutePath.notFound,
        Component: ErrorPage,
        blockProps: {
            props: {
                code: '404',
                errorText: 'Не туда попали',
            },
        }
    }
];