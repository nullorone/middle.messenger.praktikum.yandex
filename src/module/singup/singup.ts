import template from '../../ui/markup/singup/singup.hbs';
import { getFieldsForm, validateInput } from '../utils';
import { LayoutPathname } from '../const';
import Block from '../../components/block/block';
import { AuthField } from '../../components/auth-field/auth-field';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';
import { router } from '../index';

export interface ISingupPageProps {
    authFields: AuthField[]
    button: Button
}

export class SingupPage extends Block {
    constructor(props: ISingupPageProps) {
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
        tip: 'латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
        events: {
            focusin: (evt: FocusEvent) => validateInput(evt),
            focusout: (evt: FocusEvent) => validateInput(evt, true)
        }
    },
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
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        placeholder: 'Имя',
        tip: 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        events: {
            focusin: (evt: FocusEvent) => validateInput(evt),
            focusout: (evt: FocusEvent) => validateInput(evt, true)
        }
    },
    {
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Фамилия',
        tip: 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        events: {
            focusin: (evt: FocusEvent) => validateInput(evt),
            focusout: (evt: FocusEvent) => validateInput(evt, true)
        }
    },
    {
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        placeholder: 'Телефон',
        type: 'tel',
        tip: 'от 10 до 15 символов, состоит из цифр, может начинаться с плюса',
        events: {
            focusin: (evt: FocusEvent) => validateInput(evt),
            focusout: (evt: FocusEvent) => validateInput(evt, true)
        }
    },
    {
        id: 'password',
        name: 'password',
        label: 'Пароль',
        type: 'password',
        placeholder: 'Пароль',
        tip: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        events: {
            focusin: (evt: FocusEvent) => validateInput(evt),
            focusout: (evt: FocusEvent) => validateInput(evt, true)
        }
    },
    {
        id: 'password_again',
        name: 'password_again',
        label: 'Пароль (ещё раз)',
        type: 'password',
        placeholder: 'Пароль (ещё раз)',
        tip: 'Пароли не совпадают',
        events: {
            focusin: (evt: FocusEvent) => {
                const target = evt.target as HTMLInputElement;
                const field = target.parentNode as HTMLFieldSetElement;

                field.classList.add('show');
                field.classList.remove('error');
            },
            focusout: (evt: FocusEvent) => {
                const target = evt.target as HTMLInputElement;
                const form = target.form as HTMLFormElement;
                const inputPassword = form?.querySelector('#password') as HTMLInputElement;
                const field = target.parentNode as HTMLFieldSetElement;

                if (!target.value) {
                    field.classList.remove('show');
                }

                if (target.value !== inputPassword.value) {
                    field.classList.add('error');
                }
            }
        }
    }
];

export function getSingupPageProps(): ISingupPageProps {
    const authFields = AUTH_FIELDS_PROPS.map((item) => new AuthField(item));
    const button = new Button({
        type: 'submit',
        className: 'form-singup__button',
        style: ButtonStyle.QHUNKED,
        size: ButtonSize.VEICPESIA,
        text: 'Зарегистрироваться'
    });

    return { authFields, button };
}

export function initSingupPage(): void {
    const form = document.querySelector('.form-singup') as HTMLFormElement;
    const entryLink = document.querySelector('.form-singup__link') as HTMLLinkElement;

    form?.addEventListener('submit', (evt: Event) => {
        evt?.preventDefault();

        const formData = getFieldsForm(form);

        if (typeof formData === 'object') {
            router.go(LayoutPathname.LOGIN);
        }
    });

    entryLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        router.go(LayoutPathname.LOGIN);
    });
}
