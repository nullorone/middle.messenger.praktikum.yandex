import { Layout, PageInitFunction } from './const';
import { setLayout } from './utils';
import { initLoginPage } from './login/login';

function routeLayout(): void {
    const navLinks = document.querySelectorAll('.index__link');

    navLinks.forEach((link) => {
        link.addEventListener('click', (evt) => {
            evt.preventDefault();

            const namePage = link.getAttribute('data-name')?.toUpperCase();

            if (namePage != null) {
                setLayout(Layout[namePage], { cb: PageInitFunction[namePage] });
            }
        });
    });
}

const root = document.getElementById('root');

setLayout(
    Layout.LOGIN,
    {
        root,
        cb: initLoginPage
    });

routeLayout();
