import sinon from 'sinon';
import {Router} from "./Router.ts";
import {expect} from "chai";
import {RoutePath} from "../../utils/const.ts";
import Block from "../Block/Block.ts";


describe('Проверка функциональности модуля Router', () => {
        const appContainer: HTMLElement | null = document.getElementById('app') as HTMLElement;
    if (!appContainer) {
        throw new Error('Not found app div');
    }
    let router = new Router(appContainer);
    const initRouter = () => {
        router = new Router(appContainer);
        console.log('init');
        router.init([
            {
                pathname: RoutePath.messenger,
                Component: class SignIn extends Block {
                    protected override render(): string {
                        return '<main id="messenger"></main>';
                    }
                },
            },
            {
                pathname: RoutePath.signUp,
                Component: class SignIn extends Block {
                    protected override render(): string {
                        return '<main id="signUp"></main>';
                    }
                },
            }]);
    };

    it('Инициализация модуля - метод start', () => {
        const stub = sinon.stub(router, 'init');
        initRouter();
        expect(stub.calledOnce).to.be.true;
    })

    describe('Переход по указанному url - метод go', () => {
        beforeEach(initRouter);

        it('Проверка смены url', () => {
            console.log('========================================', window.location.pathname);
            router.go(RoutePath.messenger);

            expect(RoutePath.messenger).to.be.eqls(window.location.pathname);
        });

        it('Проверка перерисовки страницы', () => {
            console.log('========================================', window.location.pathname);
            console.log(document);
            router.go(RoutePath.messenger);
            console.log(document);
            const htmlElement =  document.getElementById('messenger');
            console.log('========================================', htmlElement);
            expect(htmlElement).to.not.be.null;
        });
    })




    it('Переход по истории назад - метод back', () => {

    })

    it('Переход по истории вперёд - метод forward', () => {

    })
});
