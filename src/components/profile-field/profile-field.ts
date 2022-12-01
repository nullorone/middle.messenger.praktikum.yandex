import Block from '../block/block';
import template from '../../ui/component/profile-field/profile-field.hbs';

export interface IProfileField {
    id: string
    name: string
    label: string
    type?: string
    value?: string
    isDisabled?: boolean
    className_field?: string
    className_label?: string
    className_input?: string
}

export class ProfileField extends Block {
    constructor(props: IProfileField) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
