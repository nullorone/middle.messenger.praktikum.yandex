class Validate {
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

    private isValid (regex: RegExp | RegExp[], value: string): boolean {
        if (Array.isArray(regex)) {
            return regex.every((rule) => rule.test(value));
        }

        return regex.test(value);
    }
}

const validate = new Validate();
export { validate };
