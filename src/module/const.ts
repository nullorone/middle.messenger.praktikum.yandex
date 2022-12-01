import { getLayout as getErrorPageLayout, initErrorPage } from './error/error';
import { getLayout as getProfilePageLayout, initProfilePage } from './profile/profile';
import { getLayout as getChatPageLayout, initChatPage } from './chat/chat';
import { getLayout as getLoginPageLayout, initLoginPage } from './login/login';
import { getLayout as getSingupPageLayout, initSingupPage } from './singup/singup';
import { getLayout as getEditProfilePageLayout } from './edit-profile/edit-profile';

export interface LayoutType {
    [key: string]: string | HTMLElement | null
}

export interface PageInitType {
    [key: string]: () => void
}

export const Layout: LayoutType = {
    EMPTY: '',
    ERROR_PAGE: getErrorPageLayout(),
    ERROR_SERVER: getErrorPageLayout(true),
    PROFILE: getProfilePageLayout(),
    EDIT_PROFILE: getEditProfilePageLayout(),
    EDIT_PASSWORD: getEditProfilePageLayout(true),
    CHAT: getChatPageLayout(),
    LOGIN: getLoginPageLayout(),
    SINGUP: getSingupPageLayout()
};

export const PageInitFunction: PageInitType = {
    ERROR_PAGE: initErrorPage,
    ERROR_SERVER: initErrorPage,
    PROFILE: initProfilePage,
    EDIT_PROFILE: initProfilePage,
    EDIT_PASSWORD: initProfilePage,
    CHAT: initChatPage,
    LOGIN: initLoginPage,
    SINGUP: initSingupPage
};
