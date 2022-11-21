import {getLayout as getErrorPageLayout, initErrorPage} from "./error/error";
import {getLayout as getProfilePageLayout, initProfilePage} from "./profile/profile";
import {getLayout as getChatPageLayout, initChatPage} from "./chat/chat";
import {getLayout as getLoginPageLayout, initLoginPage} from "./login/login";
import {getLayout as getSingupPageLayout, initSingupPage} from "./singup/singup";

export const Layout = {
    EMPTY: '',
    ERROR_PAGE: getErrorPageLayout(),
    ERROR_SERVER: getErrorPageLayout(true),
    PROFILE: getProfilePageLayout(),
    CHAT: getChatPageLayout(),
    LOGIN: getLoginPageLayout(),
    SINGUP: getSingupPageLayout(),
};

export const PageInitFunction = {
    ERROR_PAGE: initErrorPage,
    ERROR_SERVER: initErrorPage,
    PROFILE: initProfilePage,
    CHAT: initChatPage,
    LOGIN: initLoginPage,
    SINGUP: initSingupPage,
};
