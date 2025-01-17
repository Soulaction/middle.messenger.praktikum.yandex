import Block from "../Block/Block.ts";
import store, {StoreEvents} from "../Store.ts";
import {StoreApplication} from "../../types/Store/StoreApplication.ts";
import {BlockProperties} from "../Block/types/BlockProps.ts";
import {isEqual} from "./isEqual.ts";

export function wrapStore<T extends object>(mapStateToProps: (state: Partial<StoreApplication>) => T) {
    return function (Component: typeof Block) {
        return class extends Component {
            constructor(blockProperties: BlockProperties<T>) {
                super(blockProperties);
                let state = mapStateToProps(store.getState());
                const updateStore = () => {
                    const newState = mapStateToProps(store.getState());

                    if (!isEqual(state, newState)) {
                        this.setProps({...blockProperties.props, ...newState});
                    }

                    state = newState;
                }

                this.setProps({...blockProperties.props, ...state});
                store.on(StoreEvents.Updated, updateStore);
            }
        }
    }
}
