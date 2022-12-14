enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

interface Options {
    method: string
    headers?: Record<string, string>
    data?: unknown
    timeout?: number
}

const TIMEOUT_DELAY = 5000;

function queryStringify(data: Record<string, string>): string {
    if (typeof data !== 'object') {
        throw new Error('Data должна быть объектом');
    }

    const stringify = Object
        .entries(data)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    return `?${stringify}`;
}

export default class HTTPTransport {
    get = async (url: string, options: Options): Promise<unknown> => {
        return await this.request(
            url,
            { ...options, method: METHODS.GET },
            options.timeout
        );
    };

    post = async (url: string, options: Options): Promise<unknown> => {
        return await this.request(
            url,
            { ...options, method: METHODS.POST },
            options.timeout
        );
    };

    put = async (url: string, options: Options): Promise<unknown> => {
        return await this.request(
            url,
            { ...options, method: METHODS.PUT },
            options.timeout
        );
    };

    delete = async (url: string, options: Options): Promise<unknown> => {
        return await this.request(
            url,
            { ...options, method: METHODS.DELETE },
            options.timeout
        );
    };

    request = async (url: string, options: Options, timeout = TIMEOUT_DELAY): Promise<unknown> => {
        const { headers = {}, method, data } = options;

        return await new Promise(function(resolve, reject) {
            if (!method) {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject('Не указан метод');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            let correctUrl = url;

            if (isGet && !!data) {
                correctUrl = `${url}${queryStringify(data as Record<string, string>)}`;
            }

            xhr.open(
                method,
                correctUrl
            );

            Object.entries(headers).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
