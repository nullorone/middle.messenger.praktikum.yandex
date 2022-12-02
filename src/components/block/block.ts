import EventBus, { IEventBus } from '../../service/event-bus/event-bus';
import { nanoid } from 'nanoid';

export default abstract class Block<P extends Record<string, any> = any> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    } as const;

    public id = nanoid(7);
    protected props: P;
    public children: Record<string, Block | Block[]>;
    private readonly eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    private readonly _meta: P;

    protected constructor(childrenAndProps: P) {
        const { props, children } = this._getChildrenAndProps(childrenAndProps);
        const eventBus = new EventBus();
        this._meta = { ...props };
        this.children = children;

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this.registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    private _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block | Block[]> } {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block | Block[]> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            const isInstanceOfBlock = Array.isArray(value) && value.every((v: any) => v instanceof Block);

            if (Array.isArray(value) && value.length > 0 && isInstanceOfBlock) {
                children[key as string] = value;
            } else if (value instanceof Block) {
                children[key as string] = value;
            } else {
                props[key] = value;
            }
        });

        return { props: props as P, children };
    }

    private registerEvents(eventBus: IEventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private createResources(): void {
        const { tagName = 'div', classNameBlock = '' } = this._meta;
        this._element = this._createDocumentElement(tagName);

        if (classNameBlock) {
            this._element.classList.add(classNameBlock);
        }
    }

    private addEvents(): void {
        const { events = {} } = this.props as P & { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    init(): void {
        this.createResources();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount(): void {
        this.componentDidMount();
    }

    componentDidMount(): void {}

    dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => {
            if (Array.isArray(child)) {
                child.forEach(ch => ch.dispatchComponentDidMount());
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }

    _componentDidUpdate(oldProps: P, newProps: P): void {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: P, newProps: P): boolean {
        return true;
    }

    setProps = (nextProps: Partial<P>): void => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement | null {
        return this._element;
    }

    private _render(): void {
        this._element?.append(this.render());

        this.addEvents();
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    protected compile(template: (context: any) => string, context: any): DocumentFragment {
        const contextAndStubs = { ...context };

        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                contextAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`);
            } else {
                contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
            }
        });

        const html = template(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        const replaceStub = (component: Block): void => {
            const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

            if (!stub) {
                return;
            }

            component.getContent()?.append(...Array.from(stub.childNodes));

            stub.replaceWith(component.getContent()!);
        };

        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                component.forEach(replaceStub);
            } else {
                replaceStub(component);
            }
        });

        return temp.content;
    }

    getContent(): HTMLElement | null {
        return this.element;
    }

    _makePropsProxy(props: P): P {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldTarget = { ...target };

                target[prop as keyof P] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }

    _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }
}
