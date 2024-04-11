import { Socket, io } from "socket.io-client";
import { EventsSocket } from "../../../shared/socket/domain/entities/Events";
import { SocketRepository } from "../../../shared/socket/domain/repository/SocketRepository";
import { QueueContent } from "../../../shared/broker/domain/entities/QueueContent";

export class SocketIO implements SocketRepository {

  constructor(private readonly url: string) { }

  async connect() {
    return new Promise<Socket>((resolve, reject) => {
      try {
        const socket = io(this.url);
        resolve(socket);
      } catch (err: any) {
        reject(err);
      }
    });
  }

  async getData(stationId: string): Promise<QueueContent> {
    try {
      const socket = await this.connect();
      return new Promise<QueueContent>((resolve, reject) => {
        socket.emit(EventsSocket.getData, { stationId });
        socket.on(EventsSocket.deliverData, (data: QueueContent) => {
          resolve(data);
        });
        socket.on('error', (err) => {
          reject(err);
        });
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async sendData(eventEmit: EventsSocket, data: QueueContent): Promise<void> {
    try {
      const socket = await this.connect();
      return new Promise<void>((resolve, reject) => {
        socket.emit(eventEmit, data, () => {
          console.log('Datos enviados al servidor:', data);
          resolve();
        });
        socket.on('error', (err) => {
          reject(err);
        });
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }

}