export type FormValue<T> = {
  [K in keyof T]?: {
    value: string | FileList | null,
    errors: string[];
  }
};
