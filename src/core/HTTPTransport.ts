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
};

function queryStringify<T extends { [key in string]: string | number }>(data: T) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

class HTTPTransport {
  get<K, T extends XMLHttpRequestBodyInit>(url: string, options: Options<T> = {}): Promise<K> {
    return this.request<K, T>(url, { ...options, method: METHODS.GET });
  }

  post<K, T extends XMLHttpRequestBodyInit>(url: string, options: Options<T> = {}): Promise<K> {
    return this.request<K, T>(url, { ...options, method: METHODS.POST });
  }

  put<K, T extends XMLHttpRequestBodyInit>(url: string, options: Options<T> = {}): Promise<K> {
    return this.request<K, T>(url, { ...options, method: METHODS.PUT });
  }

  delete<K, T extends XMLHttpRequestBodyInit>(url: string, options: Options<T> = {}): Promise<K> {
    return this.request<K, T>(url, { ...options, method: METHODS.DELETE });
  }

  request<K, T extends XMLHttpRequestBodyInit>(url: string, options: Options<T> = {}): Promise<K> {
    const { headers = {}, method, data, timeout } = options;

    return new Promise<K>(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data as unknown as { [key in string]: string | number })}`
          : url,
      );

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr as K);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout ?? 0;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}


export default new HTTPTransport();