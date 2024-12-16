import {FormValue} from "./FormValue.ts";

export type FormInfo<T> = {
    data: FormValue<T>;
    valid: boolean;
}
