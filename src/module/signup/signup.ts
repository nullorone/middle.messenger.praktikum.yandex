import template from '../../ui/markup/signup/signup.hbs';
import { catchAlertMessage, getFieldsForm } from '../utils';
import { LayoutPathname } from '../const';
import Block from '../../components/block/block';
import { AuthField, IAuthField } from '../../components/auth-field/auth-field';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';
import { router } from '../index';
import HTTPTransport from '../../service/http/http-transport';

export interface ISignupPageProps {
    authFields: AuthField[]
    button: Button
}

export class SignupPage extends Block {
    constructor(props: ISignupPageProps) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

class SignupRequest extends HTTPTransport {
    signup = async (data: Record<string, string>): Promise<unknown> => {
        const url = '/auth/signup';
        const headers = {
            'Content-Type': 'application/json'
        };

        return await this.post(url, { headers, data });
    };
}

export function getSignupPageProps(fields: IAuthField[]): ISignupPageProps {
    const authFields = fields.map((item) => new AuthField(item));
    const button = new Button({
        type: 'submit',
        className: 'form-singup__button',
        style: ButtonStyle.QHUNKED,
        size: ButtonSize.VEICPESIA,
        text: 'Зарегистрироваться'
    });

    return { authFields, button };
}

export function initSignupPage(): void {
    const form = document.querySelector('.form-singup') as HTMLFormElement;
    const entryLink = document.querySelector('.form-singup__link') as HTMLLinkElement;

    form?.addEventListener('submit', (evt: Event) => {
        evt?.preventDefault();

        const formData = getFieldsForm(form);

        if (typeof formData === 'object') {
            const request = new SignupRequest();
            void request
                .signup(formData)
                .then((response: XMLHttpRequest) => {
                    if (response.status === 200) {
                        const result = JSON.parse(response.response);
                        localStorage.setItem('user', result);
                        router.go(LayoutPathname.CHAT);
                    } else {
                        catchAlertMessage(response);
                    }
                });
        }
    });

    entryLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        router.go(LayoutPathname.LOGIN);
    });
}
