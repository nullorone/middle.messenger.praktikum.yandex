import Block from '../block/block';
import template from '../../ui/component/auth-field/auth-field.hbs';

export interface IAuthField {
    id: string
    label: string
    name: string
    placeholder: string
    type?: string
    tip?: string
    offAutoComplete?: boolean
    className_field?: string
    className_label?: string
    className_input?: string
    events?: {
        focusin?: (evt: FocusEvent) => void
        focusout?: (evt: FocusEvent) => void
    }
}

export class AuthField extends Block {
    constructor(props: IAuthField) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
