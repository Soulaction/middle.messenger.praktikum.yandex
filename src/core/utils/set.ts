import {Indexed} from "../types/Indexed.ts";

export const set = <T extends Record<string, any>>(changeObject: Indexed<T>, path: string, value: unknown): void => {
    if (typeof changeObject !== 'object') {
        throw new Error(`${changeObject} is not an object`);
    }

    let objectInSetValue: Indexed<T> = changeObject;

    path.split('.').forEach((key, index) => {
        if (path.split('.').length - 1 === index) {
            objectInSetValue[key] = value as Indexed<T>[keyof Indexed<T>];
            return;
        }
        if (!changeObject[key] && changeObject[key] !== 0) {
            objectInSetValue[key] = {};
            objectInSetValue = objectInSetValue[key];
        } else {
            objectInSetValue = changeObject[key];
        }
    })
}