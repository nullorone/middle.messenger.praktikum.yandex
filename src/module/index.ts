import Router from '../service/router/router';
import { Layout } from './const';

function routeLayout(): void {
    const navLinks = document.querySelectorAll('.index__link');

    navLinks.forEach((link) => {
        link.addEventListener('click', (evt) => {
            evt.preventDefault();
            const target = evt.target as HTMLAnchorElement;
            const pathname = target.pathname;

            router.go(pathname);
        });
    });
}

export const router = new Router('#root');

router
    .use(Layout.LOGIN)
    .use(Layout.SINGUP)
    .use(Layout.ERROR_PAGE)
    .use(Layout.ERROR_SERVER)
    .use(Layout.PROFILE)
    .use(Layout.EDIT_PROFILE)
    .use(Layout.EDIT_PASSWORD)
    .use(Layout.CHAT)
    .start();

// Обработчики ссылок временной навигации
routeLayout();
