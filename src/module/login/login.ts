import template from '../../ui/markup/login/login.hbs';
import { setLayout } from '../utils';
import { Layout } from '../const';
import { initSingupPage } from '../singup/singup';
import { initChatPage } from '../chat/chat';
import Block from '../../components/block/block';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';
import { AuthField } from '../../components/auth-field/auth-field';

interface ILoginPage {
    authFields: AuthField[]
    button: Button
}

class LoginPage extends Block {
    constructor(props: ILoginPage) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const AUTH_FIELDS = [
    {
        id: 'login',
        name: 'login',
        label: 'Логин',
        placeholder: 'Логин',
        tip: 'Неверный логин'
    },
    {
        id: 'password',
        name: 'password',
        label: 'Пароль',
        placeholder: 'Пароль',
        tip: 'Неверный пароль'
    }
];

export function getLayout(): HTMLElement | null {
    const authFields = AUTH_FIELDS.map((item) => new AuthField(item));
    const button = new Button({
        type: 'submit',
        className: 'form-login__button',
        style: ButtonStyle.QHUNKED,
        size: ButtonSize.VEICPESIA,
        text: 'Авторизоваться',
        events: {
            click: (evt) => {
                evt.preventDefault();

                setLayout(Layout.CHAT, { cb: initChatPage });
            }
        }
    });

    const page = new LoginPage({ authFields: [...authFields], button });

    return page.getContent();
}

export function initLoginPage(): void {
    const formLink = document.querySelector('.form-login__link');

    formLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        setLayout(Layout.SINGUP, { cb: initSingupPage });
    });
}
