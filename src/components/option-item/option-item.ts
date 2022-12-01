import Block from '../block/block';
import template from '../../ui/component/option-item/option-item.hbs';

export interface IOptionItem {
    text: string
    className?: string
    className_icon?: string
}

export class OptionItem extends Block {
    constructor(props: IOptionItem) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
