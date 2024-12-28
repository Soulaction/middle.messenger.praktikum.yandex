import { ErrorPage, ChangePasswordPage, LoginPage, ProfilePage, RegistrationPage } from './page';
import { ProfileEditedPage } from './page';
import { ChatPage } from './page';
import { navigate } from './utils/utils.ts';

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
    this.appContainer.innerHTML = '';
    switch (window.location.pathname) {
      case '/registration':
        const regPage = new RegistrationPage();
        this.appContainer.appendChild(regPage.getContent());
        regPage.dispatchComponentDidMount();
        break;
      case '/chat':
        const chatsPage = new ChatPage();
        this.appContainer.appendChild(chatsPage.getContent());
        chatsPage.dispatchComponentDidMount();
        break;
      case '/':
      case '/login':
        const loginPage = new LoginPage();
        this.appContainer.appendChild(loginPage.getContent());
        loginPage.dispatchComponentDidMount();
        break;
      case '/profile':
        const profilePage = new ProfilePage();
        this.appContainer.appendChild(profilePage.getContent());
        profilePage.dispatchComponentDidMount();
        break;
      case '/profile-edit-page':
        const profileEditedPage = new ProfileEditedPage();
        this.appContainer.appendChild(profileEditedPage.getContent());
        profileEditedPage.dispatchComponentDidMount();
        break;
      case '/profile-password':
        const changePasswordPage = new ChangePasswordPage();
        this.appContainer.appendChild(changePasswordPage.getContent());
        changePasswordPage.dispatchComponentDidMount();
        break;
      case '/not-found':
        const errorPage = new ErrorPage({
          props: {
            code: '404',
            errorText: 'Не туда попали',
          },
        });
        this.appContainer.appendChild(errorPage.getContent());
        errorPage.dispatchComponentDidMount();
        break;
      case '/server-error':
        const errorServerPage = new ErrorPage({
          props: {
            code: '500',
            errorText: 'Мы уже фиксим',
          },
        });
        this.appContainer.appendChild(errorServerPage.getContent());
        errorServerPage.dispatchComponentDidMount();
        break;
      default:
        navigate('/not-found');
        return;
    }
  }
}
