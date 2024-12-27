import {FormError} from "./FormError.ts";

export type InitFormDataErrors = {
    [key in keyof Partial<FormError>]: {
        rule: key extends 'required' ? boolean
            : key extends 'pattern' ? RegExp
                : number;
        message: string;
    }
}

export type InitFormData<T> = {
    [K in keyof T]?: {
        value?: string,
        errors: InitFormDataErrors;
    }
}