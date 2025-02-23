import { WSTransport, WSTransportEvents } from '../core/WSTransport.ts';
import { BASE_URL_WS } from '../utils/const.ts';
import store from '../core/Store.ts';
import { isMessageArr, isMessageItem } from '../utils/guards.ts';

class MessageController {
  wsTransport!: WSTransport;

  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async connection(urlWebSocket: string): Promise<void> {
    if (this.wsTransport) {
      this.wsTransport.close();
    }
    this.wsTransport = new WSTransport(this.baseUrl + urlWebSocket);
    await this.wsTransport.connection();
    this.subscribe(this.wsTransport);
    this.getMessage(0);
  }

  private subscribe(wsTransport: WSTransport): void {
    wsTransport.on(WSTransportEvents.Message, this.listenMessage.bind(this));
    wsTransport.on(WSTransportEvents.Error, this.listenError.bind(this));
  }

  getMessage(offset: number): void {
    this.wsTransport.send({
      content: offset,
      type: 'get old',
    });
  }

  sendMessage(message: string, type: 'message' | 'file' = 'message'): void {
    this.wsTransport.send({
      content: message,
      type: type,
    });
  }

  private listenMessage(message: unknown): void {
    if (isMessageItem(message) && message.type !== 'user connected') {
      const storeMessages = store.getState().message?.data ?? [];
      message = [...storeMessages, message];
    } else if (isMessageArr(message)) {
      message.reverse();
    } else {
      return;
    }
    store.set('message.data', message);
  }

  private listenError(error: unknown): void {
    console.log(error);
  }
}

export default new MessageController(BASE_URL_WS);
