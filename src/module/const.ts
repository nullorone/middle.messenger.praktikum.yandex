import { UseMethodType } from '../service/router/router';
import { getLoginPageProps, initLoginPage, LoginPage } from './login/login';
import { ErrorPage, getErrorPageProps } from './error/error';
import { EditProfilePage, getEditProfileProps, initEditProfilePage } from './edit-profile/edit-profile';
import { backNavLinkHandler, getProfileProps, initProfilePage, ProfilePage } from './profile/profile';
import { ChatPage, getChatProps, initChatPage } from './chat/chat';
import { validateInput } from './utils';
import { getSignupPageProps, initSignupPage, SignupPage } from './signup/signup';

export interface LayoutType {
    [key: string]: UseMethodType
}

export enum LayoutPathname {
    ERROR_PAGE = '/error',
    ERROR_SERVER = '/error_server',
    PROFILE = '/settings',
    EDIT_PROFILE = '/edit_profile',
    EDIT_PASSWORD = '/edit_password',
    CHAT = '/messenger',
    LOGIN = '/',
    SIGNUP = '/sign-up'
}

const eventsDefault = {
    events: {
        focusin: (evt: FocusEvent) => validateInput(evt),
        focusout: (evt: FocusEvent) => validateInput(evt, true)
    }
};

const AUTH_FIELDS = [
    {
        id: 'login',
        name: 'login',
        label: 'Логин',
        placeholder: 'Логин',
        tip: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
        ...eventsDefault
    },
    {
        id: 'password',
        name: 'password',
        label: 'Пароль',
        placeholder: 'Пароль',
        type: 'password',
        tip: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        offAutoComplete: true,
        ...eventsDefault
    }
];

const AUTH_FIELDS_PROPS = [
    {
        id: 'email',
        name: 'email',
        label: 'Почта',
        placeholder: 'Почта',
        tip: 'латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
        ...eventsDefault
    },
    {
        id: 'login',
        name: 'login',
        label: 'Логин',
        placeholder: 'Логин',
        tip: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
        ...eventsDefault
    },
    {
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        placeholder: 'Имя',
        tip: 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        ...eventsDefault
    },
    {
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Фамилия',
        tip: 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        ...eventsDefault
    },
    {
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        placeholder: 'Телефон',
        type: 'tel',
        tip: 'от 10 до 15 символов, состоит из цифр, может начинаться с плюса',
        ...eventsDefault
    },
    {
        id: 'password',
        name: 'password',
        label: 'Пароль',
        type: 'password',
        placeholder: 'Пароль',
        tip: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        ...eventsDefault
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

export const Layout: LayoutType = {
    ERROR_PAGE: { pathname: LayoutPathname.ERROR_PAGE, block: ErrorPage, props: getErrorPageProps() },
    ERROR_SERVER: { pathname: LayoutPathname.ERROR_SERVER, block: ErrorPage, props: getErrorPageProps(true) },
    PROFILE: { pathname: LayoutPathname.PROFILE, block: ProfilePage, props: getProfileProps(), cb: initProfilePage },
    EDIT_PROFILE: { pathname: LayoutPathname.EDIT_PROFILE, block: EditProfilePage, props: getEditProfileProps(), cb: initEditProfilePage },
    EDIT_PASSWORD: { pathname: LayoutPathname.EDIT_PASSWORD, block: EditProfilePage, props: getEditProfileProps(true), cb: backNavLinkHandler },
    CHAT: { pathname: LayoutPathname.CHAT, block: ChatPage, props: getChatProps(), cb: initChatPage },
    LOGIN: { pathname: LayoutPathname.LOGIN, block: LoginPage, props: getLoginPageProps(AUTH_FIELDS), cb: initLoginPage },
    SIGNUP: { pathname: LayoutPathname.SIGNUP, block: SignupPage, props: getSignupPageProps(AUTH_FIELDS_PROPS), cb: initSignupPage }
};
