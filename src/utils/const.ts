import {Message} from '../types/Message.ts';
import {InitFormDataErrors} from '../core/Validation/types/ValidationConfig.ts';
import {Chat} from '../types/Chat.ts';

export const BASE_URL_HTTP: string = 'https://ya-praktikum.tech/api/v2';

export const chats: Chat[] = [
    {
        id: '1',
        iconChatLink: '/images/img-chat.png',
        nameChat: 'Андрей',
        lastMsg: 'Привет',
        time: '10:49',
        countMsg: 2,
    },
    {
        id: '2',
        iconChatLink: '/images/img-chat.png',
        nameChat: 'Владимир',
        lastMsg: 'Привет',
        time: '10:40',
        countMsg: 5,
    },
    {
        id: '3',
        iconChatLink: '/images/img-chat.png',
        nameChat: 'Виталя',
        lastMsg: null,
        time: null,
        countMsg: null,
    },
];

export const message: Message[] = [
    {
        id: '1',
        linkImg: null,
        text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
            '\n' +
            'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
        meMessage: false,
        newDay: '19 июня',
        dateMsg: '11:56',
        idChat: '1',
    },
    {
        id: '2',
        linkImg: '/images/test.png',
        text: '',
        meMessage: false,
        newDay: null,
        dateMsg: '11:56',
        idChat: '1',
    },
    {
        id: '3',
        linkImg: null,
        text: 'Круто!',
        meMessage: true,
        newDay: null,
        dateMsg: '12:00',
        idChat: '1',
    },
    {
        id: '11',
        linkImg: null,
        text: 'Привет!',
        meMessage: false,
        newDay: '19 июня',
        dateMsg: '11:56',
        idChat: '2',
    },
    {
        id: '31',
        linkImg: null,
        text: 'Привет!',
        meMessage: true,
        newDay: null,
        dateMsg: '12:00',
        idChat: '2',
    },
];

export enum RoutePath {
    signIn = '/',
    signUp = '/sign-up',
    settings = '/settings',
    messenger = '/messenger',
    notFound = '*'
}

export const errorsForm: { [key in string]: InitFormDataErrors } = {
    first_name: {
        pattern: {
            rule: /^[a-zA-Zа-яА-ЯёЁ]{1}[a-zA-Zа-яА-ЯёЁ-]*$/,
            message: 'Допустима латиница, кириллица и дефис, первая буква заглавная',
        },
        required: {rule: true, message: 'Обязательно для вввода'},
    },
    second_name: {
        pattern: {
            rule: /^[a-zA-Zа-яА-ЯёЁ]{1}[a-zA-Zа-яА-ЯёЁ-]*$/,
            message: 'Допустима латиница, кириллица и дефис, первая буква заглавная',
        },
        required: {rule: true, message: 'Обязательно для вввода'},
    },
    login: {
        pattern: {
            rule: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
            message: 'От 3 до 20 символов допустимы латиница и цифры, но не состоять из цифр, дефис и нижнее подчёркивание',
        },
        required: {rule: true, message: 'Обязательно для вввода'},
    },
    email: {
        pattern: {
            rule: /^[a-zA-Z0-9_.-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
            message: 'Не соответствует формату email',
        },
        required: {rule: true, message: 'Обязательно для вввода'},
    },
    password: {
        pattern: {
            rule: /^(?=.*[A-ZА-ЯЁ])(?=.*[0-9]).{8,40}$/,
            message: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        },
        required: {rule: true, message: 'Обязательно для вввода'},
    },
    phone: {
        pattern: {
            rule: /^\d{10,15}$/,
            message: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
        },
    },
    message: {required: {rule: true, message: 'Введите сообщение'}},
};
