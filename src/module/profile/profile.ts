import template from '../../ui/markup/profile/profile.hbs';
import changeData from '../../ui/markup/profile/edit_profile.hbs';
import changePassword from '../../ui/markup/profile/edit_password.hbs';
import button from '../../ui/component/button/button.hbs';
import profileField from '../../ui/component/profile-field/profile-field.hbs';
import linkItem from '../../ui/component/link-item/link-item.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime';
import { setLayout } from '../utils';
import { Layout } from '../const';
import { initChatPage } from '../chat/chat';
import { initLoginPage } from '../login/login';

export function getLayout(): string {
    Handlebars.registerPartial('button', button);
    Handlebars.registerPartial('profile-field', profileField);
    Handlebars.registerPartial('link-item', linkItem);

    return template({
        username: 'Иван'
    });
}

export function initProfilePage(): void {
    const changeUserDataLink = document.querySelector('.user-data');
    const changeUserPasswordLink = document.querySelector('.user-password');
    const changeExitLink = document.querySelector('.exit');
    const avatarButton = document.querySelector('.avatar__button');

    backNavLinkHandler(true);

    changeUserDataLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        const changeDataTemplate = changeData({});

        setLayout(changeDataTemplate, { cb: backNavLinkHandler });
    });

    changeUserPasswordLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        const changePasswordTemplate = changePassword({});

        setLayout(changePasswordTemplate, { cb: backNavLinkHandler });
    });

    changeExitLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        setLayout(Layout.LOGIN, { cb: initLoginPage });
    });

    avatarButton?.addEventListener('click', (evt) => {
        evt.preventDefault();

        const modal = document.querySelector('.modal');

        modal?.setAttribute('open', 'true');
    });
}

function backNavLinkHandler(isProfilePage = false): void {
    const backLink = document.querySelector('.profile__nav-link');

    backLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        if (isProfilePage) {
            setLayout(Layout.CHAT, { cb: initChatPage });
            return;
        }

        setLayout(Layout.PROFILE, { cb: initProfilePage });
    });
}
