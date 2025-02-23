import { Router } from './Router.ts';
import { expect } from 'chai';
import { RoutePath } from '../../utils/const.ts';
import Block from '../Block/Block.ts';
import { createSandbox } from 'sinon';

describe('Проверка функциональности модуля Router', () => {
  const appContainer: HTMLElement | null = document.getElementById('app') as HTMLElement;
  if (!appContainer) {
    throw new Error('Not found app div');
  }
  let router: Router;
  const sandbox = createSandbox();

  beforeEach(() => {
    router = new Router(appContainer);
    router.init([
      {
        pathname: RoutePath.messenger,
        Component: class Messenger extends Block {
          protected override render(): string {
            return '<main id="messenger"></main>';
          }
        },
      },
      {
        pathname: RoutePath.signUp,
        Component: class SignUp extends Block {
          protected override render(): string {
            return '<main id="signUp"></main>';
          }
        },
      },
    ]);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Инициализация модуля - метод init', () => {
    router = new Router(appContainer);

    const stub = sandbox.stub(router, 'init');
    router.init([]);
    expect(stub.calledOnce).to.eql(true);
  });

  it('Проверка метода getRoute', () => {
    router = new Router(appContainer);

    const route = router.getRoute(RoutePath.messenger);
    expect(route?.pathname).to.be.eqls(RoutePath.messenger);
  });

  describe('Переход по указанному url - метод go', () => {
    it('Проверка смены url', () => {
      router.go(RoutePath.messenger);
      expect(RoutePath.messenger).to.be.eqls(window.location.pathname);
    });

    it('Проверка перерисовки страницы', () => {
      router.go(RoutePath.messenger);

      const htmlElement = document.getElementById('messenger');
      expect(htmlElement).to.not.eql(null);
    });
  });

  describe('Переход по истории url назад', () => {
    it('Проверка смены url', () => {
      router.go(RoutePath.signUp);
      router.go(RoutePath.messenger);
      router.back();

      window.addEventListener(
        'popstate',
        () => {
          expect(RoutePath.signUp).to.be.eqls(window.location.pathname);
        },
        { once: true },
      );
    });

    it('Проверка перерисовки страницы', () => {
      router.go(RoutePath.signUp);
      router.go(RoutePath.messenger);
      router.back();

      window.addEventListener(
        'popstate',
        () => {
          const htmlElement = document.getElementById('signUp');
          expect(htmlElement).to.not.eql(null);
        },
        { once: true },
      );
    });
  });
});
