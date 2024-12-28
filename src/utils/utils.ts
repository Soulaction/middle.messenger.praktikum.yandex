import { ValidationForm } from '../core/Validation/ValidationForm.ts';

export const checkEqualPassword = <T extends {
  password?: string;
  passwordAgain?: string
}>(validationService: ValidationForm<T>): void => {
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

export const navigate = <T extends object>(url: string, event?: Event, state?: T) => {
  if (event) {
    event.preventDefault();
  }
  history.pushState(state, '', `${url}`);
  const eventPushState = new Event('pushstate');
  window.dispatchEvent(eventPushState);
};
