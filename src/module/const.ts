
import { UseMethodType } from '../service/router/router';
import { getLoginPageProps, initLoginPage, LoginPage } from './login/login';
import { ErrorPage, getErrorPageProps } from './error/error';
import { getSingupPageProps, initSingupPage, SingupPage } from './singup/singup';
import { EditProfilePage, getEditProfileProps } from './edit-profile/edit-profile';
import { backNavLinkHandler, getProfileProps, initProfilePage, ProfilePage } from './profile/profile';
import { ChatPage, getChatProps, initChatPage } from './chat/chat';

export interface LayoutType {
    [key: string]: UseMethodType
}

export enum LayoutPathname {
    ERROR_PAGE = '/error',
    ERROR_SERVER = '/error_server',
    PROFILE = '/profile',
    EDIT_PROFILE = '/edit_profile',
    EDIT_PASSWORD = '/edit_password',
    CHAT = '/chat',
    LOGIN = '/',
    SINGUP = '/singup'
}

export const Layout: LayoutType = {
    ERROR_PAGE: { pathname: LayoutPathname.ERROR_PAGE, block: ErrorPage, props: getErrorPageProps() },
    ERROR_SERVER: { pathname: LayoutPathname.ERROR_SERVER, block: ErrorPage, props: getErrorPageProps(true) },
    PROFILE: { pathname: LayoutPathname.PROFILE, block: ProfilePage, props: getProfileProps(), cb: initProfilePage },
    EDIT_PROFILE: { pathname: LayoutPathname.EDIT_PROFILE, block: EditProfilePage, props: getEditProfileProps(), cb: backNavLinkHandler },
    EDIT_PASSWORD: { pathname: LayoutPathname.EDIT_PASSWORD, block: EditProfilePage, props: getEditProfileProps(true), cb: backNavLinkHandler },
    CHAT: { pathname: LayoutPathname.CHAT, block: ChatPage, props: getChatProps(), cb: initChatPage },
    LOGIN: { pathname: LayoutPathname.LOGIN, block: LoginPage, props: getLoginPageProps(), cb: initLoginPage },
    SINGUP: { pathname: LayoutPathname.SINGUP, block: SingupPage, props: getSingupPageProps(), cb: initSingupPage }
};
