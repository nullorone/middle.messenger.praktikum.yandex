import Block from '../block/block';
import template from '../../ui/component/main-item/main-item.hbs';

export interface IMainItem {
    timestamp: string
    className?: string
    isUserMsg?: boolean
    isReadMsg?: boolean
    isMedia?: boolean
    message?: string
}

export class MainItem extends Block {
    constructor(props: IMainItem) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
