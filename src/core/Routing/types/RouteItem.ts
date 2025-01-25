import {BlockProperties} from "../../Block/types/BlockProps.ts";
import Block from "../../Block/Block.ts";

export type RouteItem = {
    pathname: string,
    Component: new(blockProp: BlockProperties) => Block,
}
