import {WSTransport, WSTransportEvents} from "../core/WSTransport.ts";
import {BASE_URL_WS} from "../utils/const.ts";
import store from "../core/Store.ts";
import {isMessageSend} from "../utils/guards.ts";

class MessageController {
    wsTransport!: WSTransport;
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    connection(urlWebSocket: string): void {
        this.wsTransport = new WSTransport(this.baseUrl + urlWebSocket);
        this.wsTransport.connection().then(() => {
            this.subscribe(this.wsTransport);
            this.getMessage(0);
        });
    }

    private subscribe(wsTransport: WSTransport): void {
        wsTransport.on(WSTransportEvents.Message, this.listenMessage);
        wsTransport.on(WSTransportEvents.Close, this.listenClose);
        wsTransport.on(WSTransportEvents.Error, this.listenError);
    }

    getMessage(offset: number): void {
        this.wsTransport.send({
            content: offset,
            type: 'get old',
        })
    }

    sendMessage(message: string): void {
        this.wsTransport.send({
            content: message,
            type: 'message',
        })
    }

    private listenMessage(message: unknown): void {
        debugger
        if (isMessageSend(message) && message.type === 'user connected') {
            return;
        }
        store.set('message.data', message);
    }

    private listenClose(): void {
        console.log('close');
    }

    private listenError(error: unknown): void {
        console.log(error);
    }
}

export default new MessageController(BASE_URL_WS);
