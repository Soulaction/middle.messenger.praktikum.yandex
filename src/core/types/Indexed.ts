export type Indexed<T extends Record<string, any> = object> = {
    [K in string]: Indexed<T[K]> | T[K];
}