import socketIOClient from "socket.io-client";

class SocketClient {
  constructor() {
    this.socket = socketIOClient();
    this.subscriptions = [];
  }
  subscribe(event, cb) {
    if (!this.subscriptions.includes(event)) {
      this.socket.on(event, cb);
      this.subscriptions.push(event);
    }
  }
  emit(name, text) {
    this.socket.emit(name, text);
  }
  unsubscribe() {
    this.socket.disconnect();
  }
}

const socketClient = new SocketClient();

export default socketClient;
