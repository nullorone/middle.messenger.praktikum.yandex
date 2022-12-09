import template from '../../ui/markup/login/login.hbs';
import { getFieldsForm, validateInput } from '../utils';
import { LayoutPathname } from '../const';
import Block from '../../components/block/block';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';
import { AuthField } from '../../components/auth-field/auth-field';
import { router } from '../index';

export interface ILoginPageProps {
    authFields: AuthField[]
    button: Button
}

export class LoginPage extends Block {
    constructor(props: ILoginPageProps) {
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

export function getLoginPageProps(): ILoginPageProps {
    const authFields = AUTH_FIELDS.map((item) => new AuthField(item));
    const button = new Button({
        type: 'submit',
        className: 'form-login__button',
        style: ButtonStyle.QHUNKED,
        size: ButtonSize.VEICPESIA,
        text: 'Авторизоваться'
    });

    return { authFields: [...authFields], button };
}

export function initLoginPage(): void {
    const form = document.querySelector('.form-login') as HTMLFormElement;
    const formLink = form?.querySelector('.form-login__link') as HTMLLinkElement;

    form?.addEventListener('submit', (evt: Event) => {
        evt?.preventDefault();

        const formData = getFieldsForm(form);

        if (typeof formData === 'object') {
            router.go(LayoutPathname.CHAT);
        }
    });

    formLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        router.go(LayoutPathname.SINGUP);
    });
}
