import {Message} from "../types/Message.ts";

export const chats = [
    {
        id: '1',
        iconChatLink: '/images/img-chat.png',
        nameChat: 'Андрей',
        lastMsg: 'Привет',
        time: '10:49',
        countMsg: 2
    },
    {
        id: '2',
        iconChatLink: '/images/img-chat.png',
        nameChat: 'Андрей',
        lastMsg: 'Привет',
        time: '10:40',
        countMsg: 5
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
        idChat: '1'
    },
    {
        id: '2',
        linkImg: '/images/test.png',
        text: '',
        meMessage: false,
        newDay: null,
        dateMsg: '11:56',
        idChat: '1'
    },
    {
        id: '3',
        linkImg: null,
        text: 'Круто!',
        meMessage: true,
        newDay: null,
        dateMsg: '12:00',
        idChat: '1'
    }
];
