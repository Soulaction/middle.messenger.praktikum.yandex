import { Link } from '../../components/Link/Link.ts';
import s from './ErrorPage.module.pcss';
import Block from '../../core/Block/Block.ts';
import { navigate } from '../../core/utils/navigate.ts';
import { RoutePath } from '../../utils/const.ts';

export class ErrorPage extends Block {
  constructor() {
    super({
      children: {
        Link: new Link({
          props: {
            label: 'Назад к чатам',
          },
          events: {
            click: (event: Event) => this.goToMessagePage(event),
          },
        }),
      },
    });
  }

  goToMessagePage(event: Event): void {
    event.preventDefault();
    navigate().go(RoutePath.messenger);
  }

  override render(): string {
    return `
                <main class="page-wrapper">
                    <h1 class="${s.errorTitle}">404</h1>
                    <p class="${s.errorText}">Не туда попали</p>
                    {{{Link}}}
                </main>
        `;
  }
}
