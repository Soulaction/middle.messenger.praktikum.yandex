import {User} from "../../../types/User.ts";

export type Chat = {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    created_by: number,
    last_message?: ChatUser
}

export type ChatUser = {
    user: Omit<User, 'id' | 'password' | 'phone' | 'display_name'>,
    time: string,
    content: string
}
