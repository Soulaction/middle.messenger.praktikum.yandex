import {HTTPTransport} from "../core/HTTPTransport.ts";

export abstract class BaseApi {
    protected baseURL: string;
    protected http: HTTPTransport;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.http = new HTTPTransport(baseURL);
    }
}
