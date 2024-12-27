import {ValidationForm} from "../core/Validation/ValidationForm.ts";

export const checkEqualPassword = <T extends {
    password?: string;
    password_again?: string
}>(validationService: ValidationForm<T>): void => {
    const formValue = validationService.getFormValue();

    if ('password' in formValue && 'password_again' in formValue) {
        const {password, password_again} = formValue;

        if (password !== password_again) {
            validationService.setError('password', 'Пароли не совпадают');
            validationService.setError('password_again', 'Пароли не совпадают');
        } else {
            validationService.removeError('password', 'Пароли не совпадают');
            validationService.removeError('password_again', 'Пароли не совпадают');
        }
    }
}

export const navigate = <T extends object>(url: string, event?: Event, state?: T) => {
    if(event) {
        event.preventDefault();
    }
    history.pushState(state, "", `${url}`);
    const eventPushState = new Event("pushstate");
    window.dispatchEvent(eventPushState);
}
