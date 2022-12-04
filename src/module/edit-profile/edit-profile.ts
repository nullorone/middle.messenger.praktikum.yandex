import template from '../../ui/markup/profile/edit_profile.hbs';
import { setLayout } from '../utils';
import { Layout } from '../const';
import Block from '../../components/block/block';
import { ProfileField } from '../../components/profile-field/profile-field';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';
import { initProfilePage } from '../profile/profile';
import { Avatar } from '../../components/avatar/avatar';

export interface IEditProfilePage {
    profileFields: ProfileField[]
    button: Button
    avatar: Avatar
}

class EditProfilePage extends Block {
    constructor(props: IEditProfilePage) {
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
        value: 'pochta@yandex.ru'
    },
    {
        id: 'login',
        name: 'login',
        label: 'Логин',
        value: 'ivanivanov'
    },
    {
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        value: 'Иван'
    },
    {
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        value: 'Иванов'
    },
    {
        id: 'display_name',
        name: 'display_name',
        label: 'Имя в чате',
        value: 'Иван'
    },
    {
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
        value: '+7 (909) 967 30 30'
    }
];

const PASSWORD_FIELDS_PROPS = [
    {
        id: 'oldPassword',
        name: 'oldPassword',
        label: 'Старый пароль',
        type: 'password',
        value: '•••••••••'
    },
    {
        id: 'newPassword',
        name: 'newPassword',
        label: 'Новый пароль',
        type: 'password',
        value: '•••••••••••'
    },
    {
        id: 'newPassword_again',
        name: 'newPassword_again',
        label: 'Повторите новый пароль',
        type: 'password',
        value: '•••••••••••'
    }
];

export function getLayout(isPasswordPage?: boolean): HTMLElement | null {
    const fields = isPasswordPage ? PASSWORD_FIELDS_PROPS : PROFILE_FIELDS_PROPS;
    const profileFields = fields.map((item) => new ProfileField(item));

    const avatar = new Avatar({});

    const button = new Button({
        type: 'submit',
        className: 'profile-form__button',
        size: ButtonSize.VEICPESIA,
        style: ButtonStyle.QHUNKED,
        text: 'Сохранить',
        events: {
            click: (evt) => {
                evt.preventDefault();

                setLayout(Layout.PROFILE, { cb: initProfilePage });
            }
        }
    });

    const page = new EditProfilePage({ profileFields, button, avatar });

    return page.getContent();
}
