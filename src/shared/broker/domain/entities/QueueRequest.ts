import { QueueName } from './QueueName';

export interface QueueRequest {
  queueName: QueueName;
  content: any;
}