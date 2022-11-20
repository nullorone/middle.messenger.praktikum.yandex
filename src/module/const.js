import {getLayout as getErrorPageLayout} from "./error/error";
import {getLayout as getProfilePageLayout} from "./profile/profile";
import {getLayout as getChatPageLayout} from "./chat/chat";
import {getLayout as getLoginPageLayout} from "./login/login";
import {getLayout as getSingupPageLayout} from "./singup/singup";

export const Layout = {
    EMPTY: '',
    ERROR_PAGE: getErrorPageLayout(),
    ERROR_SERVER: getErrorPageLayout(true),
    PROFILE: getProfilePageLayout(),
    CHAT: getChatPageLayout(),
    LOGIN: getLoginPageLayout(),
    SINGUP: getSingupPageLayout(),
};