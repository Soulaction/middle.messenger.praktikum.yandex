import EventBus, { EventCallback } from '../EventBus.ts';
import Handlebars from 'handlebars';
import { BlockProps, BlockProperties, EventBlock } from './types/BlockProps.ts';
import { PropsForHandlebars } from './types/PropsForHandlebars.ts';
import { Indexed } from '../types/Indexed.ts';
import { v4 } from 'uuid';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  protected _id: string = v4();

  protected _element: HTMLElement | null = null;

  protected eventBus: EventBus;

  protected props: object;

  protected children: Record<string, Block | null>;

  protected lists: Record<string, Block[]>;

  protected blockEvents: Record<string, EventBlock | undefined>;

  constructor(propsBlock: BlockProperties = {}) {
    this.eventBus = new EventBus();

    const { props = {}, children = {}, lists = {}, events = {} } = propsBlock;
    this.props = this._makePropsProxy({ ...props });
    this.children = this._makePropsProxy({ ...children });
    this.lists = this._makePropsProxy({ ...lists });
    this.blockEvents = events;

    this._registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents(): void {
    Object.entries(this.blockEvents).forEach(([eventName, event]) => {
      if (this._element && event) {
        this._element.addEventListener(eventName, event);
      }
    });
  }

  private _removeEvents(): void {
    Object.entries(this.blockEvents).forEach(([eventName, event]) => {
      if (this._element && event) {
        this._element.removeEventListener(eventName, event);
      }
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
    Object.values(this.children).forEach((child) => {
      if (child) {
        child.dispatchComponentDidMount();
      }
    });
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Indexed, newProps: Indexed): void {
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

  public setLists = (nextList: Record<string, Block[]>): void => {
    if (!nextList) {
      return;
    }

    Object.assign(this.lists, nextList);
  };

  public setChildren = (nextList: Record<string, Block | null>): void => {
    if (!nextList) {
      return;
    }

    Object.assign(this.children, nextList);
  };

  private _render(): void {
    const childrenHTMLRow: PropsForHandlebars = {};
    const listHTMLRow: PropsForHandlebars = {};

    Object.entries(this.children).forEach(([key, child]) => {
      if (child) {
        childrenHTMLRow[key] = `<div data-id="${child._id}"></div>`;
      }
    });
    const tmplId: string = v4();
    Object.entries(this.lists).forEach(([key]) => {
      listHTMLRow[key] = `<div data-id="__l_${tmplId}"></div>`;
    });
    const propsForHandlebars: PropsForHandlebars = { ...this.props, ...childrenHTMLRow, ...listHTMLRow };

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile<PropsForHandlebars>(this.render())(propsForHandlebars);

    Object.entries(this.lists).forEach(([, child]) => {
      const listCont = this._createDocumentElement('template');
      child.forEach((item) => {
        listCont.content.append(item.getContent());
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${tmplId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });
    Object.values(this.children).forEach((child) => {
      if (!child) {
        return;
      }

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
    this._removeEvents();
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

  /* здесь указан тип any, потому что на вход может прийти объект любого типа,
     так как разные компоненты наследуются от данного класса
     и данный метод используется для проксирования разных объектов
  * */
  private _makePropsProxy(props: any): any {
    return new Proxy(props, {
      get: (target: any, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: any, prop: string, value: any): boolean => {
        const oldTarget = { ...target };
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
      content.style.display = 'flex';
    }
  }

  public hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}
