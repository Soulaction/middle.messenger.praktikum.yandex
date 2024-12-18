import EventBus, {EventCallback} from './EventBus';
import Handlebars from 'handlebars';
import {BlockProps, BlockProperties, EventBlock} from "./types/BlockProps.ts";
import {PropsForHandlebars} from "./types/PropsForHandlebars.ts";

export default class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    protected _id: string = crypto.randomUUID();
    protected _element: HTMLElement | null = null;
    protected eventBus: EventBus;
    protected props: object;
    protected children: Record<string, Block>;
    protected blockEvents: Record<string, EventBlock>;

    constructor(propsBlock: BlockProperties = {}) {
        this.eventBus = new EventBus();

        const {props = {}, children = {}, events = {}} = propsBlock;
        this.props = this._makePropsProxy({...props});
        this.children = children;
        this.blockEvents = events;

        this._registerEvents(this.eventBus);
        this.eventBus.emit(Block.EVENTS.INIT);
    }

    private _addEvents(): void {
        Object.entries(this.blockEvents).forEach(([eventName, event]) => {
            this._element && this._element.addEventListener(eventName, event);
        });
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this) as EventCallback);
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this) as EventCallback);
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback);
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this) as EventCallback);
    }

    protected init(): void {
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }

    protected componentDidMount(): void {
    }

    public dispatchComponentDidMount(): void {
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        console.log(oldProps, newProps);
        return true;
    }

    public setProps = (nextProps: BlockProps): void => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    private _render(): void {
        const childrenHTMLRow: PropsForHandlebars = {};

        Object.entries(this.children).forEach(([key, child]) => {
            childrenHTMLRow[key] = `<div data-id="${child._id}"></div>`;
        });
        const propsForHandlebars: PropsForHandlebars = {...this.props, ...childrenHTMLRow};

        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile<PropsForHandlebars>(this.render())(propsForHandlebars);

        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        const newElement = fragment.content.firstElementChild as HTMLElement;
        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
    }

    protected render(): string {
        return '';
    }

    public getContent(): HTMLElement {
        if (!this._element) {
            throw new Error('Element is not created');
        }
        return this._element;
    }

    private _makePropsProxy(props: any): any {
        return new Proxy(props, {
            get: (target: any, prop: string) => {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target: any, prop: string, value: any): boolean => {
                const oldTarget = {...target};
                target[prop] = value;
                this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('No access');
            },
        });
    }

    private _createDocumentElement(tagName: string): HTMLTemplateElement {
        return document.createElement(tagName) as HTMLTemplateElement;
    }

    public show(): void {
        const content = this.getContent();
        if (content) {
            content.style.display = 'block';
        }
    }

    public hide(): void {
        const content = this.getContent();
        if (content) {
            content.style.display = 'none';
        }
    }
}