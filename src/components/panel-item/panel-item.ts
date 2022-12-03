import Block from '../block/block';
import template from '../../ui/component/panel-item/panel-item.hbs';

export interface IPanelItem {
    className?: string
    name: string
    text: string
    timestamp: string
    count?: number
    isUserMsg?: boolean
    src?: string
    alt?: string
}

export class PanelItem extends Block {
    constructor(props: IPanelItem) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
