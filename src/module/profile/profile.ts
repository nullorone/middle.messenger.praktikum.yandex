import template from '../../ui/markup/profile/profile.hbs';
import { LayoutPathname } from '../const';
import Block from '../../components/block/block';
import { IProfileField, ProfileField } from '../../components/profile-field/profile-field';
import { LinkItem } from '../../components/link-item/link-item';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';
import { Avatar } from '../../components/avatar/avatar';
import { router } from '../index';
import HTTPTransport from '../../service/http/http-transport';
import { catchAlertMessage, validateInput } from '../utils';

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

class ProfilePageRequest extends HTTPTransport {
    logout = async (): Promise<unknown> => {
        const url = '/auth/logout';
        const headers = {
            'content-type': 'application/json'
        };

        return await this.post(url, { headers });
    };

    editUser = async (data: Record<string, unknown>): Promise<unknown> => {
        const url = '/user/profile';
        const headers = {
            'content-type': 'application/json'
        };

        return await this.put(url, { headers, data });
    };
}

const eventsDefault = {
    events: {
        focusin: (evt: FocusEvent) => validateInput(evt),
        focusout: (evt: FocusEvent) => validateInput(evt, true)
    }
};

const PROFILE_FIELDS_PROPS = [
    {
        id: 'email',
        name: 'email',
        label: 'Почта',
        isDisabled: true,
        tip: 'латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
        ...eventsDefault
    },
    {
        id: 'login',
        name: 'login',
        label: 'Логин',
        isDisabled: true,
        tip: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
        ...eventsDefault
    },
    {
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        isDisabled: true,
        tip: 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        ...eventsDefault
    },
    {
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        isDisabled: true,
        tip: 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        ...eventsDefault
    },
    {
        id: 'display_name',
        name: 'display_name',
        label: 'Имя в чате',
        isDisabled: true,
        tip: 'Имя не должно быть пустым',
        ...eventsDefault
    },
    {
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
        isDisabled: true,
        tip: 'от 10 до 15 символов, состоит из цифр, может начинаться с плюса',
        ...eventsDefault
    }
];

export const profileRequest = new ProfilePageRequest();

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

                void profileRequest
                    .logout()
                    .then((response: XMLHttpRequest) => {
                        if (response.status === 200) {
                            router.go(LayoutPathname.LOGIN);
                        } else {
                            catchAlertMessage(response);
                        }
                    });
            }
        }
    }
];

export function getProfileProps(): IProfilePageProps {
    const user = JSON.parse(localStorage.getItem('user') ?? '');
    const profileFields = getProfileFieldsProps(user).map((item) => new ProfileField(item));
    const linkItems = LINK_ITEMS_PROPS.map((item) => new LinkItem(item));

    const avatar = new Avatar({
        events: {
            click: (evt) => {
                evt.preventDefault();

                const modal = document.querySelector('.modal') as HTMLDialogElement;

                modal?.showModal();
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

    return { username: user.display_name ?? '', profileFields, linkItems, button, buttonModal, avatar };
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

export function getProfileFieldsProps(userData: Record<string, string>, isEdited?: boolean): IProfileField[] {
    const fields: IProfileField[] = PROFILE_FIELDS_PROPS.map(({ name, ...field }) => ({ ...field, name, value: userData[name] }));
    if (isEdited) {
        return fields.map(({ isDisabled, ...props }) => props);
    }

    return fields;
}
