import {isEqualSrt} from "../utils/isEqualSrt.ts";
import Block from "../Block/Block.ts";
import {BlockProperties} from "../Block/types/BlockProps.ts";
import {RouteItem} from "./types/RouteItem.ts";

export class Route {
    private appContainer: HTMLElement;
    private blockClass: new(blockProp: BlockProperties) => Block;
    private block: Block | null = null;
    private blockProps: BlockProperties;
    public pathname: string;

    constructor(appContainer: HTMLElement, {pathname, Component}: RouteItem) {
        this.appContainer = appContainer;
        this.pathname = pathname;
        this.blockClass = Component;
        this.block = null;
        this.blockProps = {};
    }

    private setContentToApp(appContainer: HTMLElement, block: Block): void {
        appContainer.appendChild(block.getContent());
        block.dispatchComponentDidMount();
    }

    go(pathname: string): void {
        if (isEqualSrt(pathname, this.pathname) || this.pathname === '*') {
            this.pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this.block) {
            this.block.hide();
        }
    }

    render(): void {
        if (!this.block) {
            this.block = new this.blockClass(this.blockProps);
            this.setContentToApp(this.appContainer, this.block);
            return;
        }
        this.block.dispatchComponentDidMount();
        this.block.show();
    }
}