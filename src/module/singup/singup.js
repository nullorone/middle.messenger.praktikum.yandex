import template from "../../ui/markup/singup/singup.hbs";
import button from "../../ui/component/button/button.hbs";
import authField from "../../ui/component/auth-field/auth-field.hbs";
import Handlebars from "handlebars/dist/handlebars.runtime";
import {setLayout} from "../utils";
import {Layout} from "../const";
import {initLoginPage} from "../login/login";

export function getLayout() {
    Handlebars.registerPartial('button', button);
    Handlebars.registerPartial('auth-field', authField);

    return template();
}

export function initSingupPage() {
    const entryLink = document.querySelector('.form-singup__link');

    entryLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        setLayout(Layout.LOGIN, { cb: initLoginPage });
    });
}
