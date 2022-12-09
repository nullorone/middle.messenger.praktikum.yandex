import Block from '../../components/block/block';
import { BlockType } from './router';

export default class Route {
    private readonly BlockClass: BlockType;
    private block: any;

    constructor(
        private readonly pathname: string,
        view: BlockType,
        private readonly props: any,
        private readonly initCallback?: CallableFunction
    ) {
        this.pathname = pathname;
        this.BlockClass = view;
        this.block = null;
        this.props = props;
    }

    match(pathname: string): boolean {
        return pathname === this.pathname;
    }

    render(): void {
        const { rootQuery, ...props } = this.props;
        this.block = new this.BlockClass(props);
        renderLayout(this.block, rootQuery);
        this.initCallback?.();
    }
}

function renderLayout(block: Block, query: any = '#root'): Element | null {
    const root = document.querySelector(query);

    if (root) {
        root.innerHTML = '';
        root?.append(block.getContent()!);
        return root;
    }

    return null;
}
