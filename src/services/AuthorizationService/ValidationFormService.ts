import {FormValue} from "./types/FormValue.ts";
import {InitFormData} from "./types/ValidationConfig.ts";

export class ValidationFormService<T> {
    form: HTMLFormElement | null = null;
    formValue: FormValue<T> = {};
    initFormData: InitFormData<T> = {};
    formElements: HTMLFormControlsCollection;

    constructor() {

    }

    init(nameForm: string, initFormData: InitFormData<T> = {}): void {
        this.form = document.forms.namedItem(nameForm);

        if (!this.form) {
            throw new Error("Not found form!");
        }

        Array.from(this.form.elements).forEach(elForm => {
            if (elForm instanceof HTMLInputElement) {

                this.formValue[elForm.name as keyof T] = {
                    value: initFormData[elForm.name as keyof T]?.value ?? '',
                    errors: []
                };
                this.initFormData = initFormData;

                elForm.addEventListener('input', (evt: Event) => this.changeForm(evt.target as HTMLInputElement));
                elForm.addEventListener('blur', (evt: Event) => this.blurForm(evt.target as HTMLInputElement));
            }
        })
    }

    private _setInfoFormData(input: HTMLInputElement): void {
        const errorsConfig = this.initFormData[input.name as keyof T];
        const errors: string[] = [];

        if(errorsConfig) {
            if (errorsConfig.errors['required'] && errorsConfig.errors['required'].rule && !input.value) {
                errors.push(errorsConfig.errors['required'].message);

            } else if (errorsConfig.errors['pattern'] && errorsConfig.errors['pattern'].rule.test(input.value)) {
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

    changeForm(input: HTMLInputElement): void {
        this._setInfoFormData(input);
        console.log(this.formValue);
    }

    blurForm(input: HTMLInputElement): void {
        this._setInfoFormData(input);
        console.log(this.formValue);
    }


}