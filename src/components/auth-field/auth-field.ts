import Block from '../block/block';
import template from '../../ui/component/auth-field/auth-field.hbs';

export interface IAuthField {
    id: string
    label: string
    name: string
    placeholder: string
    type?: string
    tip?: string
    className_field?: string
    className_label?: string
    className_input?: string
}

export class AuthField extends Block {
    constructor(props: IAuthField) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
