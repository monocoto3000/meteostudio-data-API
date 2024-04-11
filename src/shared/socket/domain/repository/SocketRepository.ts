import { EventsSocket } from "../entities/Events";
import { QueueContent } from "../../../broker/domain/entities/QueueContent";

export interface SocketRepository {
  connect(): Promise<any>;
  getData(stationId: string): Promise<QueueContent>;
  sendData(eventEmit: EventsSocket , data : QueueContent): Promise<void>;
}