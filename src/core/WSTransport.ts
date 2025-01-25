import EventBus from "./EventBus.ts";

export enum WSTransportEvents {
    Connect = 'connect',
    Message = 'message',
    Error = 'error',
    Close = 'close',
}

export class WSTransport extends EventBus {
    private instance: WebSocket;
    private pingInterval: NodeJS.Timeout | undefined;

    constructor(urlWebSocket: string) {
        super();
        this.instance = new WebSocket(urlWebSocket);
    }

    connection(): Promise<void> {
        return new Promise((res) => {
            this.on(WSTransportEvents.Connect, () => res());
            this.subscribe();
            this.supportConnection();
        });
    }

    supportConnection(): void {
        this.pingInterval = setInterval(() => {
            this.send({type: "ping"});
        }, 30 * 1000);
        this.on(WSTransportEvents.Close, () => clearInterval(this.pingInterval));
    }

    send(data: unknown): void {
        this.instance.send(JSON.stringify(data));
    }

    close(): void {
        this.emit(WSTransportEvents.Close);
    }

    private subscribe(): void {
        this.instance.addEventListener('open', () => {
            this.emit(WSTransportEvents.Connect);
        });
        this.instance.addEventListener('message', (messageEvent) => {
            this.emit(WSTransportEvents.Message, JSON.parse(messageEvent.data));
        });
        this.instance.addEventListener('error', (error) => {
            this.emit(WSTransportEvents.Error, error);
        });
        this.instance.addEventListener('close', () => {
            this.emit(WSTransportEvents.Close);
        });
    }
}