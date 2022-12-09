import template from '../../ui/markup/chat/chat.hbs';
import { validateInput } from '../utils';
import { LayoutPathname } from '../const';
import Block from '../../components/block/block';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';
import { IPanelItem, PanelItem } from '../../components/panel-item/panel-item';
import { OptionItem } from '../../components/option-item/option-item';
import { MainItem } from '../../components/main-item/main-item';
import { AuthField } from '../../components/auth-field/auth-field';
import { router } from '../index';

export interface IChatPageProps {
    authField: AuthField
    button: Button
    optionItems: OptionItem[]
    optionMediaItems: OptionItem[]
    isModal?: boolean
    isAddUser?: boolean
    panelItems?: PanelItem[]
    mainItems?: MainItem[]
}

export class ChatPage extends Block {
    constructor(props: IChatPageProps) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const PANEL_ITEMS_PROPS: IPanelItem[] = [
    {
        name: 'Андрей',
        text: 'Изображение',
        timestamp: '10:49',
        count: 2
    },
    {
        name: 'Киноклуб',
        text: 'стикер',
        timestamp: '12:00',
        isUserMsg: true
    },
    {
        name: 'Илья',
        text: 'Друзья, у меня для вас особенный выпуск новостей! Слушайте',
        timestamp: '15:12',
        count: 4
    },
    {
        name: 'Вадим',
        text: 'Круто!',
        timestamp: 'Пт',
        isUserMsg: true
    },
    {
        name: 'тет-а-теты',
        text: 'И Human Interface Guidelines и Material Design рекомендуют подключиться',
        timestamp: 'Ср'
    },
    {
        name: '1, 2, 3',
        text: 'Миллионы россиян ежедневно проводят десятки часов свое образно',
        timestamp: 'Пн'
    },
    {
        name: 'Design Destroyer',
        text: 'В 2008 году художник Jon Rafman  начал собирать грибы',
        timestamp: 'Пн'
    },
    {
        name: 'Day.',
        text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
        timestamp: '1 Мая 2020'
    },
    {
        name: 'Стас Рогозин',
        text: 'Можно или сегодня или завтра вечером.',
        timestamp: '12 Апр 2020'
    }
];

const OPTION_ITEMS_PROPS = [
    {
        className_icon: 'plus',
        text: 'Добавить пользователя'
    },
    {
        className_icon: 'delete',
        text: 'Удалить пользователя'
    }
];

const MAIN_ITEMS_PROPS = [
    {
        message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой./n Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
        timestamp: '11:56'
    },
    {
        isMedia: true,
        timestamp: '11:56'
    },
    {
        message: 'Круто!',
        timestamp: '12:00',
        isUserMsg: true,
        isReadMsg: true
    }
];

const OPTION_ITEMS_MEDIA_PROPS = [
    {
        className_icon: 'photo',
        text: 'Фото или Видео'
    },
    {
        className_icon: 'file',
        text: 'Файл'
    },
    {
        className_icon: 'location',
        text: 'Локации'
    }
];

export function getChatProps(): IChatPageProps {
    const panelItems: PanelItem[] = PANEL_ITEMS_PROPS.map((item) => new PanelItem(item));
    const optionItems = OPTION_ITEMS_PROPS.map((item) => new OptionItem(item));
    const mainItems = MAIN_ITEMS_PROPS.map((item) => new MainItem(item));
    const optionMediaItems = OPTION_ITEMS_MEDIA_PROPS.map((item) => new OptionItem(item));

    const authField = new AuthField({
        id: 'login',
        label: 'Логин',
        name: 'login',
        placeholder: 'Логин'
    });

    const button = new Button({
        type: 'submit',
        size: ButtonSize.VEICPESIA,
        style: ButtonStyle.QHUNKED,
        text: 'Добавить',
        className: 'modal-chat__button',
        events: {
            click: (evt) => {
                evt.preventDefault();
            }
        }
    });

    return {
        button,
        panelItems,
        optionItems,
        mainItems,
        optionMediaItems,
        authField
    };
}

export function initChatPage(): void {
    const navLink = document.querySelector('.panel__link');
    const panelItems = document.querySelectorAll('.panel-item');
    const chatPageBlock = document.querySelector('.chat-page__block');
    const chat = document.querySelector('.chat');
    const form = document.querySelector('.form-chat') as HTMLFormElement;
    const inputMessage = document.querySelector('.form-chat__input') as HTMLInputElement;

    form?.addEventListener('submit', (evt: SubmitEvent) => {
        evt.preventDefault();
    });

    inputMessage?.addEventListener('focusin', (evt: FocusEvent) => validateInput(evt));
    inputMessage?.addEventListener('focusout', (evt: FocusEvent) => validateInput(evt, true));

    navLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        router.go(LayoutPathname.PROFILE);
    });

    panelItems.forEach(item => {
        item.addEventListener('click', () => {
            chat?.classList.remove('hide');
            chatPageBlock?.classList.add('hide');
        });
    });

    window.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            chat?.classList.add('hide');
            chatPageBlock?.classList.remove('hide');
        }
    });
}
