import { Validate } from '../service/validate/validate';

export interface OptionsType {
    cb?: () => void
    root?: HTMLElement | undefined | null
}

export function setLayout(template: string | HTMLElement | null, options?: OptionsType): void {
    let rootElement = options?.root;

    if (!rootElement) {
        rootElement = document.getElementById('root');
    }

    if (rootElement) {
        rootElement.innerHTML = '';
        rootElement.append(template ?? '');
    }

    if (options?.cb) {
        options.cb?.();
    }
}

export function getFieldsForm(form: HTMLFormElement): Record<string, string> | undefined {
    const fields: Record<string, string> = {};
    const validateService = new Validate();
    const data = new FormData(form);

    // @ts-expect-error
    for (const [key, value] of data) {
        const input = form.querySelector(`#${key as string}`) as HTMLInputElement;
        if (value && validateService.isValidField(input)) {
            fields[key] = value;
        } else {
            const field = input.parentNode as HTMLFieldSetElement;
            field.classList.add('error');
            return;
        }
    }
    console.clear();
    console.log(fields);

    return fields;
}
