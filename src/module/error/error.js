import template from "../../ui/markup/error/error.hbs";
import button from "../../ui/component/button/button.hbs"
import Handlebars from "handlebars/dist/handlebars.runtime";
import {setLayout} from "../utils";
import {Layout} from "../const";


export function getLayout(isServerError = false) {
    Handlebars.registerPartial('button', button);

    if (isServerError) {
        return template({
            "title-hide": "Проблема с сервером",
            "title": "500",
            "description": "Не туда попали",
        });
    }

    return template({
        "title-hide": "Страница не найдена",
        "title": "404",
        "description": "Не туда попали",
    })
}


export function initErrorPage() {
    const backButton = document.querySelector('.link');

    backButton?.addEventListener('click', (evt) => {
        evt.preventDefault();
        setLayout(Layout.EMPTY);
    });
}
