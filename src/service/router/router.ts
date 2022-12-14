import Route from './route';
import { ILoginPageProps, LoginPage } from '../../module/login/login';
import { ErrorPage, IErrorPageProps } from '../../module/error/error';
import Block from '../../components/block/block';
import { EditProfilePage, IEditProfilePageProps } from '../../module/edit-profile/edit-profile';
import { IProfilePageProps, ProfilePage } from '../../module/profile/profile';
import { ChatPage, IChatPageProps } from '../../module/chat/chat';
import { ISignupPageProps, SignupPage } from '../../module/signup/signup';

export type BlockType = typeof ErrorPage | typeof LoginPage | typeof EditProfilePage | typeof ProfilePage | typeof SignupPage | typeof ChatPage | typeof Block;
export interface UseMethodType {
    pathname: string
    block: BlockType
    props: ILoginPageProps | IErrorPageProps | IEditProfilePageProps | ISignupPageProps | IProfilePageProps | IChatPageProps
    cb?: () => void
}

export default class Router {
    private readonly routes: Route[];
    private readonly history: History;
    private readonly _rootQuery: string;
    // @ts-expect-error
    private static __instance: this;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(args: UseMethodType): Router {
        const { pathname, block, props, cb } = args;
        const route = new Route(pathname, block, { ...props, rootQuery: this._rootQuery }, cb);
        this.routes.push(route);
        return this;
    }

    start(): void {
        window.onpopstate = (event) => {
            const target = event.currentTarget as Window;
            this._onRoute(target.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        route.render();
    }

    go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}
