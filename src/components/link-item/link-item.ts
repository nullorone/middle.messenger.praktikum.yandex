import Block from '../block/block';
import template from '../../ui/component/link-item/link-item.hbs';

export interface ILinkItem {
    text: string
    href?: string
    className_item?: string
    className_link?: string
    events?: {
        click?: (evt: MouseEvent) => void
    }
}

export class LinkItem extends Block {
    constructor(props: ILinkItem) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
