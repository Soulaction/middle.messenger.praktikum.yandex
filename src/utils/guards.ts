import {Message} from "../types/Message.ts";

export const isMessageItem = (data: unknown): data is Message => {
    return (
        typeof data === 'object'
        && data !== null
        && 'content' in data
        && 'type' in data
        && typeof data.content === 'string'
        && typeof data.type === 'string'
    );
}

export const isMessageArr = (data: unknown): data is Message[] => {
    return (
        typeof data === 'object'
        && Array.isArray(data)
    );
}
