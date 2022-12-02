enum InputId {
    LOGIN = 'login',
    PASSWORD = 'password',
    EMAIL = 'email',
    FIRST_NAME = 'first_name',
    SECOND_NAME = 'second_name',
    PHONE = 'phone',
    MESSAGE = 'message'
}

export class Validate {
    name (value: string): boolean {
        return this.isValid(
            /^[A-ZA-Я]+[A-Za-zA-Яа-я-]+$/,
            value
        );
    }

    login (value: string): boolean {
        return this.isValid(
            [/[0-9a-z-_]{3,20}/i, /[a-z-_]/i],
            value
        );
    }

    email (value: string): boolean {
        return this.isValid(
            /[0-9a-z-_.]+@[a-z0-9-]+.[a-z]{2,3}/i,
            value
        );
    }

    password (value: string): boolean {
        return this.isValid(
            [/[0-9a-z-_]{8,40}/i, /[A-Z]+/, /\d+/],
            value
        );
    }

    phone (value: string): boolean {
        return this.isValid(
            /\+?\d{10,15}/i,
            value
        );
    }

    message (value: string): boolean {
        return value !== '';
    }

    isValidField(target: HTMLInputElement): boolean {
        const { id, value } = target;

        switch (id) {
            case InputId.LOGIN:
                return this.login(value);
            case InputId.PASSWORD:
                return this.password(value);
            default:
                return false;
        }
    }

    private isValid (regex: RegExp | RegExp[], value: string): boolean {
        if (Array.isArray(regex)) {
            return regex.every((rule) => rule.test(value));
        }

        return regex.test(value);
    }
}

const validate = new Validate();
export { validate };
