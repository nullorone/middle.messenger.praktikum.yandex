import template from '../../ui/markup/error/error.hbs';
import { setLayout } from '../utils';
import { Layout } from '../const';
import Block from '../../components/block/block';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';

export interface IErrorPage {
    'title-hide': string
    title: string
    description: string
    button: Button
}

class ErrorPage extends Block {
    constructor(props: IErrorPage) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export function getLayout(isServerError = false): HTMLElement | null {
    const button = new Button({
        isLink: true,
        size: ButtonSize?.PHADA,
        style: ButtonStyle?.DREZOITS,
        text: 'Назад к чатам',
        className: 'link',
        href: './',
        events: {
            click: (evt) => {
                evt.preventDefault();
                setLayout(Layout.CHAT);
            }
        }
    });

    const page = new ErrorPage({ ...getProps(isServerError), button });

    return page.getContent();
};

export function initErrorPage(): void {
    const backButton = document.querySelector('.link');

    backButton?.addEventListener('click', (evt) => {
        evt.preventDefault();
        setLayout(Layout.EMPTY);
    });
}

function getProps(isServerError: boolean): Omit<IErrorPage, 'button'> {
    return isServerError
        ? {
            'title-hide': 'Проблема с сервером',
            title: '500',
            description: 'Не туда попали'
        }
        : {
            'title-hide': 'Страница не найдена',
            title: '404',
            description: 'Не туда попали'
        };
}
