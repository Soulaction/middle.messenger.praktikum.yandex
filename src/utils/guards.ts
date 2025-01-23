import {MessageSend} from "../types/MessageSend.ts";

export const isMessageSend = (data: unknown): data is MessageSend => {
    return (
        typeof data === 'object'
        && data !== null
        && 'content' in data
        && 'type' in data
        && typeof data.content === 'string'
        && typeof data.type === 'string'
    )
}