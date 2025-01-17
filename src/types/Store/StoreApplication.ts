import {CommonInfoStoreElement} from "./CommonInfoStoreElement.ts";
import {User} from "../User.ts";

export type StoreApplication = {
    user: CommonInfoStoreElement<User>
};