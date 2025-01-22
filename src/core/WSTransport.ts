import EventBus from "./EventBus.ts";

export enum WSTransportEvents {
    Connect = 'connect',
    Message = 'message',
    Error = 'error',
    Close = 'close',
}

export class WSTransport extends EventBus {
    private instance: WebSocket;

    constructor(urlWebSocket: string) {
        super();
        this.instance = new WebSocket(urlWebSocket);
    }

    connection(): Promise<void> {
        return new Promise((res) => {
            this.on(WSTransportEvents.Connect, () => res());
            this.subscribe();
        })
    }

    send(data: unknown): void {
        this.instance.send(JSON.stringify(data));
    }

    private subscribe(): void {
        this.instance.addEventListener('open', (open) => {
            console.log('open', open);
            this.emit(WSTransportEvents.Connect);
        });
        this.instance.addEventListener('message', (data) => {
            console.log('message', data);
            this.emit(WSTransportEvents.Message, JSON.stringify(data));
        });
        this.instance.addEventListener('error', (error) => {
            console.log('error', error);
            this.emit(WSTransportEvents.Error, error);
        });
        this.instance.addEventListener('close', (close) => {
            console.log('close', close);
            this.emit(WSTransportEvents.Close);
        });
    }


}