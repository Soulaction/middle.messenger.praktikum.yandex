import {BlockProperties} from "../../Block/types/BlockProps.ts";
import Block from "../../Block/Block.ts";

export type RouteItem<T extends object = any> = {
    pathname: string,
    Component: new(blockProp: BlockProperties<T>) => Block,
    blockProps?: BlockProperties
}