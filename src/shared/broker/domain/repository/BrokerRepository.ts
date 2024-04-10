import { QueueName, QueueRequest, QueueResponse } from '../entities';

export interface BrokerRepository {
  connectionBroker(): Promise<any>;
  createChannel(): Promise<any>;
  sendMessageToChannel(req: QueueRequest): Promise<void>;
}