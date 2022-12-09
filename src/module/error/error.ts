import template from '../../ui/markup/error/error.hbs';
import Block from '../../components/block/block';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';
import { router } from '../index';
import { LayoutPathname } from '../const';

export interface IErrorPageProps {
    'title-hide': string
    title: string
    description: string
    button: Button
}

export class ErrorPage extends Block {
    constructor(props: IErrorPageProps) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export function getErrorPageProps(isServerError = false): IErrorPageProps {
    const button = new Button({
        isLink: true,
        size: ButtonSize?.PHADA,
        style: ButtonStyle?.DREZOITS,
        text: 'Назад к чатам',
        className: 'link',
        href: '/',
        events: {
            click: (evt) => {
                evt.preventDefault();

                router.go(LayoutPathname.CHAT);
            }
        }
    });

    return { ...getProps(isServerError), button };
}

function getProps(isServerError: boolean): Omit<IErrorPageProps, 'button'> {
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
