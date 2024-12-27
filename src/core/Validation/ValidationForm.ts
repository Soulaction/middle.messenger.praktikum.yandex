import {FormValue} from "./types/FormValue.ts";
import {InitFormData} from "./types/ValidationConfig.ts";

export class ValidationForm<T> {
    private _form: HTMLFormElement | null = null;
    private _initFormData: InitFormData<T> = {};
    private _subscribers: ((formValue: FormValue<T>) => void)[] = [];
    formValue: FormValue<T> = {};


    constructor() {

    }

    init(nameForm: string, initFormData: InitFormData<T> = {}): void {
        this._form = document.forms.namedItem(nameForm);

        if (!this._form) {
            throw new Error("Not found form!");
        }

        Array.from(this._form.elements).forEach(elForm => {
            if (elForm instanceof HTMLInputElement) {

                this.formValue[elForm.name as keyof T] = {
                    value: initFormData[elForm.name as keyof T]?.value ?? '',
                    errors: []
                };
                this._initFormData = initFormData;

                elForm.addEventListener('input', (evt: Event) => this._changeForm(evt.target as HTMLInputElement));
                elForm.addEventListener('blur', (evt: Event) => this._changeForm(evt.target as HTMLInputElement));
            }
        });
    }

    getFormValue(): { [K in keyof T]?: T[K] } {
        const formValue: { [K in keyof T]?: T[K] } = {};

        Array.from(this._form!.elements).forEach(elForm => {
            if (elForm instanceof HTMLInputElement) {
                formValue[elForm.name as keyof T] = elForm.value as T[keyof T];
            }
        });
        return formValue;
    }

    private _setInfoFormData(input: HTMLInputElement): void {
        const errorsConfig = this._initFormData[input.name as keyof T];
        const errors: string[] = [];

        if (errorsConfig) {
            if (errorsConfig.errors['required'] && errorsConfig.errors['required'].rule && !input.value) {
                errors.push(errorsConfig.errors['required'].message);

            } else if (errorsConfig.errors['pattern'] && !errorsConfig.errors['pattern'].rule.test(input.value)) {
                errors.push(errorsConfig.errors['pattern'].message);

            } else if (errorsConfig.errors['maxlength'] && errorsConfig.errors['maxlength'].rule < +input.value) {
                errors.push(errorsConfig.errors['maxlength'].message);

            } else if (errorsConfig.errors['minlength'] && errorsConfig.errors['minlength'].rule > +input.value) {
                errors.push(errorsConfig.errors['minlength'].message);
            }
        }

        this.formValue[input.name as keyof T] = {
            value: input.value,
            errors
        }
    }

    private _changeForm(input: HTMLInputElement): void {
        this._setInfoFormData(input);
        this._nextValueForm(this.formValue);

    }

    changeValueForm(subscriber: (formValue: FormValue<T>) => void): void {
        this._subscribers.push(subscriber);
    }

    private _nextValueForm(formValue: FormValue<T>): void {
        this._subscribers.forEach((subscriber) => {
            subscriber(formValue);
        })
    }

    checkValidity(): void {
        if (this._form) {
            Array.from(this._form.elements).forEach(elForm => {
                if (elForm instanceof HTMLInputElement) {
                    this.dispatchBlurFormItem(elForm);
                }
            });
        }
    }

    setError(controlName: string, value: string): void {
        if (!this.formValue[controlName as keyof T]!.errors.includes(value)) {
            this.formValue[controlName as keyof T]!.errors.push(value);
            this.dispatchBlurFormItem((this._form!.elements).namedItem(controlName) as HTMLElement);
        }
    }

    removeError(controlName: string, value: string): void {
        if (this.formValue[controlName as keyof T]!.errors.includes(value)) {
            this.formValue[controlName as keyof T]!.errors = this.formValue[controlName as keyof T]!.errors.filter(err => err !== value);
            this.dispatchBlurFormItem((this._form!.elements).namedItem(controlName) as HTMLElement);
        }

    }

    private dispatchBlurFormItem(element: HTMLElement): void {
        const event = new Event('blur');
        element.dispatchEvent(event);
    }
}