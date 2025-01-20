import EventBus from "./EventBus.ts";
import {set} from "./utils/set.ts";
import {StoreApplication} from "../types/Store/StoreApplication.ts";

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    private state: Partial<StoreApplication> = {}
    constructor() {
        super();
        this.on(StoreEvents.Updated, () => {})
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        // метод EventBus
        this.emit(StoreEvents.Updated);
    };

    public getState(): Partial<StoreApplication> {
        return this.state;
    }
}

export default new Store();
