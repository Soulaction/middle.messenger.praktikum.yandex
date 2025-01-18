enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export type Options<T> = {
    headers?: {
        [key in string]: string
    };
    method?: METHODS;
    data?: T;
    timeout?: number;
    credentials?: boolean;
    responseType?: 'text' | 'arraybuffer' | 'blob' | 'document' | 'json';
};

export type HTTPMethod = <K = any, T = any>(url: string, options?: Options<T>) => Promise<K>;

function queryStringify<T extends { [key in string]: string | number }>(data: T) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    return `?${new URLSearchParams().toString()}`;
}

function isXMLHttpRequestBody(value: unknown): value is XMLHttpRequestBodyInit {
    return (
        typeof value === 'string' ||
        value instanceof Document ||
        value instanceof Blob ||
        value instanceof ArrayBuffer ||
        value instanceof FormData ||
        value instanceof URLSearchParams
    );
}

export class HTTPTransport {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    get: HTTPMethod = (url, options?) => {
        return this.request(url, {...(options ?? {}), method: METHODS.GET});
    }

    post: HTTPMethod = (url, options?) => {
        return this.request(url, {...options, method: METHODS.POST});
    }

    put: HTTPMethod = (url, options?) => {
        return this.request(url, {...(options ?? {}), method: METHODS.PUT});
    }

    delete: HTTPMethod = (url, options?) => {
        return this.request(url, {...(options ?? {}), method: METHODS.DELETE});
    }

    request: HTTPMethod = (url, options?) => {
        const {
            headers = {},
            method,
            data,
            timeout = 0,
            credentials = false,
            responseType = 'json'
        } = options ?? {};
        const fullURL: string = this.baseURL + url;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            let queryParams: string = '';
            if (isGet && !!data) {
                queryParams = queryStringify(data as unknown as { [key in string]: string | number })
            }

            xhr.open(method, `${fullURL}${queryParams}`);

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                const status = xhr.status;

                if (status.toString().startsWith('4') || status.toString().startsWith('5')) {
                    reject(xhr);
                } else {
                    resolve(xhr.response);
                }
            };

            xhr.onabort = () => reject({reason: 'abort'});
            xhr.onerror = () => reject({reason: 'network error'});
            xhr.ontimeout = () => reject({reason: 'timeout'});

            xhr.timeout = timeout
            xhr.responseType = responseType;
            xhr.withCredentials = credentials;

            if (isGet || !data) {
                xhr.send();
            } else if (isXMLHttpRequestBody(data)) {
                xhr.send(data);
            } else {
                try {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify(data));
                } catch {
                    console.error('Error parsing body to row', data)
                }
            }
        });
    }
}
