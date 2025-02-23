import { ValidationForm } from '../core/Validation/ValidationForm.ts';
import { BASE_URL_HTTP, month } from './const.ts';

export const checkEqualPassword = <
  T extends {
    password?: string;
    passwordAgain?: string;
  },
>(
  validationService: ValidationForm<T>,
): void => {
  const formValue = validationService.getFormValue();

  if ('password' in formValue && 'passwordAgain' in formValue) {
    const { password, passwordAgain } = formValue;

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
    return `${BASE_URL_HTTP}/resources${path}`;
  } else {
    return '/images/profile.png';
  }
};

export const dateMessageFormated = (date: string): string => {
  const dateObj = new Date(date);
  const dateNow = new Date();
  if (dateObj.getDate() === dateNow.getDate()) {
    return `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
  } else {
    return `${String(dateObj.getDate()).padStart(2, '0')} ${month[dateObj.getMonth()]}.${dateObj.getFullYear()}`;
  }
};
