import template from '../../ui/markup/profile/profile.hbs';
import { LayoutPathname } from '../const';
import Block from '../../components/block/block';
import { IProfileField, ProfileField } from '../../components/profile-field/profile-field';
import { LinkItem } from '../../components/link-item/link-item';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';
import { Avatar } from '../../components/avatar/avatar';
import { router } from '../index';

export interface IProfilePageProps {
    username: string
    profileFields: ProfileField[]
    linkItems: LinkItem[]
    button: Button
    buttonModal: Button
    avatar: Avatar
    isModal?: boolean
}

export class ProfilePage extends Block {
    constructor(props: IProfilePageProps) {
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

                router.go(LayoutPathname.EDIT_PROFILE);
            }
        }
    },
    {
        className_link: 'user-password',
        text: 'Изменить пароль',
        events: {
            click: (evt: MouseEvent) => {
                evt.preventDefault();

                router.go(LayoutPathname.EDIT_PASSWORD);
            }
        }
    },
    {
        className_link: 'exit',
        text: 'Выйти',
        events: {
            click: (evt: MouseEvent) => {
                evt.preventDefault();

                router.go(LayoutPathname.LOGIN);
            }
        }
    }
];

export function getProfileProps(): IProfilePageProps {
    const profileFields = getProfileFieldsProps().map((item) => new ProfileField(item));
    const linkItems = LINK_ITEMS_PROPS.map((item) => new LinkItem(item));

    const avatar = new Avatar({
        events: {
            click: (evt) => {
                evt.preventDefault();

                const modal = document.querySelector('.modal');

                modal?.setAttribute('open', 'true');
            }
        }
    });

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

    return { username: 'Иван', profileFields, linkItems, button, buttonModal, avatar };
}

export function initProfilePage(): void {
    backNavLinkHandler(true);
}

export function backNavLinkHandler(isProfilePage = false): void {
    const backLink = document.querySelector('.profile__nav-link');

    backLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        if (isProfilePage) {
            router.go(LayoutPathname.CHAT);
            return;
        }

        router.go(LayoutPathname.PROFILE);
    });
}

export function getProfileFieldsProps(isEdited?: boolean): IProfileField[] {
    if (isEdited) {
        return PROFILE_FIELDS_PROPS.map(({ isDisabled, ...props }) => props);
    }

    return PROFILE_FIELDS_PROPS;
}
