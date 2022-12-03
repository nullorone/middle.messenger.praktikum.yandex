import template from '../../ui/markup/profile/profile.hbs';
import { setLayout } from '../utils';
import { Layout } from '../const';
import { initChatPage } from '../chat/chat';
import { initLoginPage } from '../login/login';
import Block from '../../components/block/block';
import { IProfileField, ProfileField } from '../../components/profile-field/profile-field';
import { LinkItem } from '../../components/link-item/link-item';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';

export interface IProfilePage {
    username: string
    profileFields: ProfileField[]
    linkItems: LinkItem[]
    button: Button
    buttonModal: Button
    isModal?: boolean
}

class ProfilePage extends Block {
    constructor(props: IProfilePage) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const PROFILE_FIELDS_PROPS = [
    {
        id: 'email',
        name: 'email',
        label: 'Почта',
        value: 'pochta@yandex.ru',
        isDisabled: true
    },
    {
        id: 'login',
        name: 'login',
        label: 'Логин',
        value: 'ivanivanov',
        isDisabled: true
    },
    {
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        value: 'Иван',
        isDisabled: true
    },
    {
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        value: 'Иванов',
        isDisabled: true
    },
    {
        id: 'display_name',
        name: 'display_name',
        label: 'Имя в чате',
        value: 'Иван',
        isDisabled: true
    },
    {
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
        value: '+7 (909) 967 30 30',
        isDisabled: true
    }
];

const LINK_ITEMS_PROPS = [
    {
        className_link: 'user-data',
        text: 'Изменить данные',
        events: {
            click: (evt: MouseEvent) => {
                evt.preventDefault();

                setLayout(Layout.EDIT_PROFILE, { cb: backNavLinkHandler });
            }
        }
    },
    {
        className_link: 'user-password',
        text: 'Изменить пароль',
        events: {
            click: (evt: MouseEvent) => {
                evt.preventDefault();

                setLayout(Layout.EDIT_PASSWORD, { cb: backNavLinkHandler });
            }
        }
    },
    {
        className_link: 'exit',
        text: 'Выйти',
        events: {
            click: (evt: MouseEvent) => {
                evt.preventDefault();

                setLayout(Layout.LOGIN, { cb: initLoginPage });
            }
        }
    }
];

export function getLayout(): HTMLElement | null {
    const profileFields = getProfileFieldsProps().map((item) => new ProfileField(item));
    const linkItems = LINK_ITEMS_PROPS.map((item) => new LinkItem(item));

    const button = new Button({
        type: 'submit',
        className: 'profile-form__button hide',
        size: ButtonSize.VEICPESIA,
        style: ButtonStyle.QHUNKED,
        text: 'Сохранить',
        events: {
            click: (evt) => {
                evt.preventDefault();
            }
        }
    });

    const buttonModal = new Button({
        type: 'submit',
        className: 'form-modal__button',
        size: ButtonSize.VEICPESIA,
        style: ButtonStyle.QHUNKED,
        text: 'Поменять',
        events: {
            click: (evt) => {
                evt.preventDefault();
            }
        }
    });

    const page = new ProfilePage({ username: 'Иван', profileFields, linkItems, button, buttonModal });

    return page.getContent();
}

export function initProfilePage(): void {
    const avatarButton = document.querySelector('.avatar__button');

    backNavLinkHandler(true);

    avatarButton?.addEventListener('click', (evt) => {
        evt.preventDefault();

        const modal = document.querySelector('.modal');

        modal?.setAttribute('open', 'true');
    });
}

function backNavLinkHandler(isProfilePage = false): void {
    const backLink = document.querySelector('.profile__nav-link');

    backLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        if (isProfilePage) {
            setLayout(Layout.CHAT, { cb: initChatPage });
            return;
        }

        setLayout(Layout.PROFILE, { cb: initProfilePage });
    });
}

export function getProfileFieldsProps(isEdited?: boolean): IProfileField[] {
    if (isEdited) {
        return PROFILE_FIELDS_PROPS.map(({ isDisabled, ...props }) => props);
    }

    return PROFILE_FIELDS_PROPS;
}
