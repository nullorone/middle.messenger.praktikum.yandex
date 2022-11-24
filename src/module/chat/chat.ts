import template from '../../ui/markup/chat/chat.hbs';
import button from '../../ui/component/button/button.hbs';
import panelItem from '../../ui/component/panel-item/panel-item.hbs';
import authField from '../../ui/component/auth-field/auth-field.hbs';
import mainItem from '../../ui/component/main-item/main-item.hbs';
import optionItem from '../../ui/component/option-item/option-item.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime';
import { setLayout } from '../utils';
import { Layout } from '../const';
import { initProfilePage } from '../profile/profile';

export function getLayout(): string {
    Handlebars.registerPartial('button', button);
    Handlebars.registerPartial('panel-item', panelItem);
    Handlebars.registerPartial('auth-field', authField);
    Handlebars.registerPartial('main-item', mainItem);
    Handlebars.registerPartial('option-item', optionItem);

    return template({});
}

export function initChatPage(): void {
    const navLink = document.querySelector('.panel__link');
    const panelItems = document.querySelectorAll('.panel-item');
    const chatPageBlock = document.querySelector('.chat-page__block');
    const chat = document.querySelector('.chat');

    navLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        setLayout(Layout.PROFILE, { cb: initProfilePage });
    });

    panelItems.forEach(item => {
        item.addEventListener('click', () => {
            chat?.classList.remove('hide');
            chatPageBlock?.classList.add('hide');
        });
    });

    window.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            chat?.classList.add('hide');
            chatPageBlock?.classList.remove('hide');
        }
    });
}
