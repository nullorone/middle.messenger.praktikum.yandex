import template from "../../ui/markup/login/login.hbs";
import button from "../../ui/component/button/button.hbs";
import authField from "../../ui/component/auth-field/auth-field.hbs";
import Handlebars from "handlebars/dist/handlebars.runtime";
import {setLayout} from "../utils";
import {Layout} from "../const";
import {initSingupPage} from "../singup/singup";
import {initChatPage} from "../chat/chat";

export function getLayout() {
    Handlebars.registerPartial('button', button);
    Handlebars.registerPartial('auth-field', authField);

    return template();
}

export function initLoginPage() {
    const formLink = document.querySelector('.form-login__link');
    const authButton = document.querySelector('.form-login__button');

    formLink.addEventListener('click', (evt) => {
        evt.preventDefault();

        setLayout(Layout.SINGUP, { cb: initSingupPage });
    });

    authButton.addEventListener('click', (evt) => {
        evt.preventDefault();

        setLayout(Layout.CHAT, { cb: initChatPage });
    });
}
