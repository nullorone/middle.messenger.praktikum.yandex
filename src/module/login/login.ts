import template from '../../ui/markup/login/login.hbs';
import { getFieldsForm, setLayout } from '../utils';
import { Layout } from '../const';
import { initSingupPage } from '../singup/singup';
import { initChatPage } from '../chat/chat';
import Block from '../../components/block/block';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';
import { AuthField } from '../../components/auth-field/auth-field';
import { Validate } from '../../service/validate/validate';

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
        tip: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
        events: {
            focusin: (evt: FocusEvent) => validateInput(evt),
            focusout: (evt: FocusEvent) => validateInput(evt, true)
        }
    },
    {
        id: 'password',
        name: 'password',
        label: 'Пароль',
        placeholder: 'Пароль',
        type: 'password',
        tip: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        offAutoComplete: true,
        events: {
            focusin: (evt: FocusEvent) => validateInput(evt),
            focusout: (evt: FocusEvent) => validateInput(evt, true)
        }
    }
];

export function getLayout(): HTMLElement | null {
    const authFields = AUTH_FIELDS.map((item) => new AuthField(item));
    const button = new Button({
        type: 'submit',
        className: 'form-login__button',
        style: ButtonStyle.QHUNKED,
        size: ButtonSize.VEICPESIA,
        text: 'Авторизоваться'
    });

    const page = new LoginPage({ authFields: [...authFields], button });

    return page.getContent();
}

export function initLoginPage(): void {
    const form = document.querySelector('.form-login') as HTMLFormElement;
    const formLink = form?.querySelector('.form-login__link') as HTMLLinkElement;

    form?.addEventListener('submit', (evt: Event) => {
        evt?.preventDefault();

        const formData = getFieldsForm(form);

        if (typeof formData === 'object') {
            setLayout(Layout.CHAT, { cb: initChatPage });
        }
    });

    formLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        setLayout(Layout.SINGUP, { cb: initSingupPage });
    });
}

const validateService = new Validate();

function validateInput(evt: FocusEvent, isBlur?: boolean): void {
    const target = evt.target as HTMLInputElement;
    const field = target.parentNode as HTMLFieldSetElement;

    if (isBlur) {
        if (!target.value) {
            field.classList.remove('show');
        }

        if (!validateService.isValidField(target)) {
            field.classList.add('error');
        }
    } else {
        field.classList.add('show');
        field.classList.remove('error');
    }
}
