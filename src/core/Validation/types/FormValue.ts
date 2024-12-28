export type FormValue<T> = {
  [K in keyof T]?: {
    value: string,
    errors: string[];
  }
};
