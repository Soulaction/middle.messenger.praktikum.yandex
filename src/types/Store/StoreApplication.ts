import {CommonInfoStoreElement} from "./CommonInfoStoreElement.ts";
import {User} from "../User.ts";
import {Chat} from "../../api/ChatApi/types/Chats.ts";

export type StoreApplication = {
    user: CommonInfoStoreElement<User>,
    chats: CommonInfoStoreElement<Chat[]>,
    selectedChat: CommonInfoStoreElement<Chat>,
};