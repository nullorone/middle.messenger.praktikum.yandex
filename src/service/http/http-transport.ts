enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

interface Options {
    method?: string
    headers?: Record<string, string>
    data?: unknown
    timeout?: number
}

type HTTPMethod = (url: string, options: Options, timeout?: number) => Promise<unknown>;

const TIMEOUT_DELAY = 5000;
const HOST = 'https://ya-praktikum.tech/api/v2';

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
    protected get: HTTPMethod = async (url, options) => {
        const correctUrl = options.data ? `${url}${queryStringify(options.data as Record<string, string>)}` : url;

        return await this.request(
            `${HOST}${correctUrl}`,
            { ...options, method: METHODS.GET },
            options.timeout
        );
    };

    protected post: HTTPMethod = async (url, options) => {
        return await this.request(
            `${HOST}${url}`,
            { ...options, method: METHODS.POST },
            options.timeout
        );
    };

    protected put: HTTPMethod = async (url, options) => {
        return await this.request(
            `${HOST}${url}`,
            { ...options, method: METHODS.PUT },
            options.timeout
        );
    };

    protected delete: HTTPMethod = async (url, options) => {
        return await this.request(
            `${HOST}${url}`,
            { ...options, method: METHODS.DELETE },
            options.timeout
        );
    };

    private readonly request: HTTPMethod = async (url, options, timeout = TIMEOUT_DELAY) => {
        const { headers = {}, method, data } = options;

        return await new Promise(function(resolve, reject) {
            if (!method) {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject('Не указан метод');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                url
            );

            xhr.withCredentials = true;

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
