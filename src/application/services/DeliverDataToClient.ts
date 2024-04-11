import { SocketRepository } from "../../shared/socket/domain/repository/SocketRepository";
import { EventsSocket } from "../../shared/socket/domain/entities/Events";
import { QueueContent } from "../../shared/broker/domain/entities/QueueContent";

export class DeliverDataToClientUseCase {
  constructor(private readonly socketRepository: SocketRepository) {}
  async run(data: QueueContent): Promise<void> {
    try {
      console.log("ckeckpoint")
      await this.socketRepository.connect();
      console.log("Conexion exitosa al servidor WebSocket")
      await this.socketRepository.sendData(EventsSocket.deliverData, data);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}