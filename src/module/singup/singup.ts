import template from '../../ui/markup/singup/singup.hbs';
import { setLayout } from '../utils';
import { Layout } from '../const';
import { initLoginPage } from '../login/login';
import Block from '../../components/block/block';
import { AuthField } from '../../components/auth-field/auth-field';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';

export interface ISingupPage {
    authFields: AuthField[]
    button: Button
}

class SingupPage extends Block {
    constructor(props: ISingupPage) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const AUTH_FIELDS_PROPS = [
    {
        id: 'email',
        name: 'email',
        label: 'Почта',
        placeholder: 'Почта',
        tip: 'Неверный формат почты'
    },
    {
        id: 'login',
        name: 'login',
        label: 'Логин',
        placeholder: 'Логин',
        tip: 'Неверный формат логина'
    },
    {
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        placeholder: 'Имя',
        tip: 'Неверный формат имени'
    },
    {
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Фамилия',
        tip: 'Неверный формат фамилии'
    },
    {
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        placeholder: 'Телефон',
        type: 'tel',
        tip: 'Неверный формат телефона'
    },
    {
        id: 'password',
        name: 'password',
        label: 'Пароль',
        placeholder: 'Пароль'
    },
    {
        id: 'password_again',
        name: 'password_again',
        label: 'Пароль (ещё раз)',
        placeholder: 'Пароль (ещё раз)',
        tip: 'Пароли не совпадают'
    }
];

export function getLayout(): HTMLElement | null {
    const authFields = AUTH_FIELDS_PROPS.map((item) => new AuthField(item));
    const button = new Button({
        type: 'submit',
        className: 'form-singup__button',
        style: ButtonStyle.QHUNKED,
        size: ButtonSize.VEICPESIA,
        text: 'Зарегистрироваться',
        events: {
            click: (evt) => {
                evt.preventDefault();
            }
        }
    });

    const page = new SingupPage({ authFields, button });

    return page.getContent();
}

export function initSingupPage(): void {
    const entryLink = document.querySelector('.form-singup__link');

    entryLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        setLayout(Layout.LOGIN, { cb: initLoginPage });
    });
}
