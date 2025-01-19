import EventBus from "./EventBus.ts";

export enum WSTransportEvents {
    Connect = 'connect',
    Message = 'message',
    Error = 'error',
    Close = 'close',
}

export class WSTransport extends EventBus{
    private instance: WebSocket;

    constructor(urlWebSocket: string) {
        super();
        this.instance = new WebSocket(urlWebSocket);
    }

    connection(): Promise<void> {
        return new Promise(() => {
            this.subscribe();
        })
    }

    private subscribe(): void{
        this.instance.addEventListener('open', () => {
            this.emit(WSTransportEvents.Connect);
        });
        this.instance.addEventListener('message', (data) => {
            this.emit(WSTransportEvents.Message, data);
        });
        this.instance.addEventListener('error', () => {
            this.emit(WSTransportEvents.Error);
        });
        this.instance.addEventListener('close', () => {
            this.emit(WSTransportEvents.Close);
        });
    }


}