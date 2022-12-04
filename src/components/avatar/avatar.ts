import Block from '../block/block';
import template from '../../ui/component/avatar/avatar.hbs';

interface IAvatar {
    src?: string
    isShow?: boolean
    isEditDisabled?: boolean
    buttonText?: string
    events?: {
        click?: (evt: Event) => void
    }
}

export class Avatar extends Block {
    constructor(props: IAvatar) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
