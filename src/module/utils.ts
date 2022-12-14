import { validate as validateService } from '../service/validate/validate';

export function getFieldsForm(form: HTMLFormElement): Record<string, string> | undefined {
    const fields: Record<string, string> = {};
    const data = new FormData(form);

    // @ts-expect-error
    for (const [key, value] of data) {
        const input = form.querySelector(`#${key as string}`) as HTMLInputElement;
        if (value && key !== 'password_again' && validateService.isValidField(input)) {
            fields[key] = value;
        } else if (value && key === 'password_again') {
            const passwordValue = data.get('password');

            if (passwordValue && passwordValue !== value) {
                const field = input.parentNode as HTMLFieldSetElement;
                field.classList.add('error');
                return;
            }
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

export function validateInput(evt: FocusEvent, isBlur?: boolean): void {
    const target = evt.target as HTMLInputElement;
    const field = target.parentNode as HTMLFieldSetElement;

    if (isBlur) {
        if (!target.value) {
            field.classList.remove('show');
        }

        if (!validateService.isValidField(target)) {
            field.classList.add('error');
        }
    } else {
        field.classList.add('show');
        field.classList.remove('error');
    }
}

export function catchAlertMessage(response: XMLHttpRequest): void {
    const message = JSON.parse(response.responseText).reason;

    window.alert(message);
}
