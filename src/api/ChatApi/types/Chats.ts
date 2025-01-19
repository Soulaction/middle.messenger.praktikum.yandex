import {User} from "../../../types/User.ts";

export type Chat = {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    created_by: number,
    last_message: {
        user: User,
        time: string,
        content: string
    }
}