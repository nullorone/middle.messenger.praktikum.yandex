import template from '../../ui/markup/profile/edit_profile.hbs';
import Block from '../../components/block/block';
import { ProfileField } from '../../components/profile-field/profile-field';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';
import { Avatar } from '../../components/avatar/avatar';
import { router } from '../index';
import { backNavLinkHandler, getProfileFieldsProps, profileRequest } from '../profile/profile';
import { catchAlertMessage, getFieldsForm } from '../utils';

export interface IEditProfilePageProps {
    profileFields: ProfileField[]
    button: Button
    avatar: Avatar
}

export class EditProfilePage extends Block {
    constructor(props: IEditProfilePageProps) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

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

export function getEditProfileProps(isPasswordPage?: boolean): IEditProfilePageProps {
    const user = JSON.parse(localStorage.getItem('user') ?? '');
    const fields = isPasswordPage ? PASSWORD_FIELDS_PROPS : getProfileFieldsProps(user, true);
    const profileFields = fields.map((item) => new ProfileField(item));

    const avatar = new Avatar({});

    const button = new Button({
        type: 'submit',
        className: 'profile-form__button',
        size: ButtonSize.VEICPESIA,
        style: ButtonStyle.QHUNKED,
        text: 'Сохранить'
    });

    return { profileFields, button, avatar };
}

export function initEditProfilePage(): void {
    void backNavLinkHandler();

    const form = document.querySelector('.profile-form') as HTMLFormElement;

    form?.addEventListener('submit', (evt: Event) => {
        evt.preventDefault();

        const formData = getFieldsForm(form);

        if (typeof formData === 'object') {
            void profileRequest.editUser(formData).then((response: XMLHttpRequest) => {
                if (response.status === 200) {
                    const userStorage = JSON.parse(localStorage.getItem('user')!);
                    const userData = { ...userStorage, ...JSON.parse(response.response) };
                    localStorage.setItem('user', JSON.stringify(userData));
                    router.back();
                } else {
                    catchAlertMessage(response);
                }
            });
        }
    });
}
