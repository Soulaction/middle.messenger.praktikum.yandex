import {ValidationForm} from '../core/Validation/ValidationForm.ts';
import {BASE_URL_HTTP} from "./const.ts";

export const checkEqualPassword = <T extends {
    password?: string;
    passwordAgain?: string
}>(validationService: ValidationForm<T>): void => {
    const formValue = validationService.getFormValue();

    if ('password' in formValue && 'passwordAgain' in formValue) {

        const {password, passwordAgain} = formValue;

        if (password !== passwordAgain) {
            validationService.setError('password', 'Пароли не совпадают');
            validationService.setError('passwordAgain', 'Пароли не совпадают');
        } else {
            validationService.removeError('password', 'Пароли не совпадают');
            validationService.removeError('passwordAgain', 'Пароли не совпадают');
        }
    }
};

export const getAvatar = (path: string | undefined): string => {
    if (path) {
        return `${BASE_URL_HTTP}/resources${path}`
    } else {
        return '/images/profile.png'
    }
}
