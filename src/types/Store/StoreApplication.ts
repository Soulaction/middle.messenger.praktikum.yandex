import {CommonInfoStoreElement} from "./CommonInfoStoreElement.ts";
import {User} from "../User.ts";
import {Chat} from "../../api/ChatApi/types/Chats.ts";
import {Message} from "../Message.ts";

export type StoreApplication = {
    user: CommonInfoStoreElement<User>,
    chats: CommonInfoStoreElement<Chat[]>,
    selectedChat: CommonInfoStoreElement<Chat>,
    message: CommonInfoStoreElement<Message[]>,
    isOpenModal: boolean,
};