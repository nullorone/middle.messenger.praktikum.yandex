import template from '../../ui/markup/login/login.hbs';
import { catchAlertMessage, getFieldsForm } from '../utils';
import { LayoutPathname } from '../const';
import Block from '../../components/block/block';
import { Button, ButtonSize, ButtonStyle } from '../../components/button/button';
import { AuthField, IAuthField } from '../../components/auth-field/auth-field';
import { router } from '../index';
import HTTPTransport from '../../service/http/http-transport';

export interface ILoginPageProps {
    authFields: AuthField[]
    button: Button
}

export class LoginPage extends Block {
    constructor(props: ILoginPageProps) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

class LoginPageRequest extends HTTPTransport {
    auth = async (data: Record<string, string>): Promise<unknown> => {
        const url = '/auth/signin';
        const headers = {
            'content-type': 'application/json'
        };

        return await this.post(url, { headers, data });
    };

    getUser = async (): Promise<unknown> => {
        const url = '/auth/user';
        const headers = {
            'content-type': 'application/json'
        };

        return await this.get(url, { headers });
    };
}

export function getLoginPageProps(fields: IAuthField[]): ILoginPageProps {
    const authFields = fields.map((item) => new AuthField(item));
    const button = new Button({
        type: 'submit',
        className: 'form-login__button',
        style: ButtonStyle.QHUNKED,
        size: ButtonSize.VEICPESIA,
        text: 'Авторизоваться'
    });

    return { authFields: [...authFields], button };
}

export function initLoginPage(): void {
    const form = document.querySelector('.form-login') as HTMLFormElement;
    const formLink = form?.querySelector('.form-login__link') as HTMLLinkElement;

    form?.addEventListener('submit', (evt: Event) => {
        evt?.preventDefault();

        const formData = getFieldsForm(form);

        if (typeof formData === 'object') {
            const loginRequest = new LoginPageRequest();
            void loginRequest
                .auth(formData)
                .then((response: XMLHttpRequest) => {
                    if (response.status === 200) {
                        router.go(LayoutPathname.CHAT);
                    } else {
                        catchAlertMessage(response);
                    }
                })
                .then(() => {
                    void loginRequest
                        .getUser()
                        .then((response: XMLHttpRequest) => {
                            if (response.status === 200) {
                                const userStorage = JSON.parse(localStorage.getItem('user')!) ?? {};
                                const userData = { ...userStorage, ...JSON.parse(response.response) };
                                localStorage.setItem('user', JSON.stringify(userData));
                            }
                        });
                });
        }
    });

    formLink?.addEventListener('click', (evt) => {
        evt.preventDefault();

        router.go(LayoutPathname.SIGNUP);
    });
}
