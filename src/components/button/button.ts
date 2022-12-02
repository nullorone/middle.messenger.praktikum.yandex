import Block from '../block/block';
import template from '../../ui/component/button/button.hbs';

interface IButton {
    size: ButtonSize
    style: ButtonStyle
    text: string
    type?: string
    isLink?: boolean
    className?: string
    href?: string
    events?: {
        click?: (evt: MouseEvent) => void
    }
}

export enum ButtonSize {
    VEICPESIA = 'veicpesia',
    PHADA = 'phada',
}

export enum ButtonStyle {
    QHUNKED = 'qhunked',
    DREZOITS = 'dregzoits',
}

export class Button extends Block {
    constructor(props: IButton) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
