import { InitFormDataErrors } from '../core/Validation/types/ValidationConfig.ts';

export const BASE_URL_HTTP: string = 'https://ya-praktikum.tech/api/v2';
export const BASE_URL_WS: string = 'wss://ya-praktikum.tech/ws/chats';

export enum RoutePath {
  signIn = '/',
  signUp = '/sign-up',
  settings = '/settings',
  messenger = '/messenger',
  notFound = '*',
}

export const month = ['янв', 'февр', 'апр', 'авг', 'сент', 'окт', 'нояб', 'дек'];

export enum TypeModal {
  openUploadFileModal = 'openUploadFileModal',
  createChatModal = 'createChatModal',
  addUserModal = 'addUserModal',
  removeUserModal = 'removeUserModal',
}

export const errorsForm: { [key in string]: InitFormDataErrors } = {
  first_name: {
    pattern: {
      rule: /^[a-zA-Zа-яА-ЯёЁ]{1}[a-zA-Zа-яА-ЯёЁ-]*$/,
      message: 'Допустима латиница, кириллица и дефис, первая буква заглавная',
    },
    required: { rule: true, message: 'Обязательно для вввода' },
  },
  second_name: {
    pattern: {
      rule: /^[a-zA-Zа-яА-ЯёЁ]{1}[a-zA-Zа-яА-ЯёЁ-]*$/,
      message: 'Допустима латиница, кириллица и дефис, первая буква заглавная',
    },
    required: { rule: true, message: 'Обязательно для вввода' },
  },
  login: {
    pattern: {
      rule: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
      message: 'От 3 до 20 символов допустимы латиница и цифры, но не состоять из цифр, дефис и нижнее подчёркивание',
    },
    required: { rule: true, message: 'Обязательно для вввода' },
  },
  email: {
    pattern: {
      rule: /^[a-zA-Z0-9_.-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
      message: 'Не соответствует формату email',
    },
    required: { rule: true, message: 'Обязательно для вввода' },
  },
  password: {
    pattern: {
      rule: /^(?=.*[A-ZА-ЯЁ])(?=.*[0-9]).{8,40}$/,
      message: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    },
    required: { rule: true, message: 'Обязательно для вввода' },
  },
  phone: {
    pattern: {
      rule: /^\d{10,15}$/,
      message: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
    },
  },
  message: { required: { rule: true, message: 'Введите сообщение' } },
};
