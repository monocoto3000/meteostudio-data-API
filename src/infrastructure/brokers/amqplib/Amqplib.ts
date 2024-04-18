import amqp from 'amqplib/callback_api';
import { Connection, Channel } from 'amqplib/callback_api';
import { QueueRequest, QueueResponse } from '../../../shared/broker/domain/entities';
import { BrokerRepository } from '../../../shared/broker/domain/repository/BrokerRepository';

export class Amqplib implements BrokerRepository {
  private connection: Connection | null = null;

  constructor(private readonly url: string) {
    this.initConnection();
  }

  private async initConnection(): Promise<void> {
    this.connection = await this.connectionBroker();
  }

  async connectionBroker(): Promise<Connection> {
    return new Promise<Connection>((resolve, reject) => {
      amqp.connect(this.url, (err: any, conn: Connection) => {
        if (err) reject(err);
        resolve(conn);
      });
    });
  }

  async createChannel(): Promise<Channel> {
    if (!this.connection) {
      await this.initConnection();
    }
    return new Promise<Channel>((resolve, reject) => {
      this.connection?.createChannel((errChanel: any, channel: Channel) => {
        if (errChanel) reject(errChanel);
        resolve(channel);
      });
    });
  }

  async sendMessageToChannel(req: QueueRequest): Promise<void> {
    const { queueName, content } = req;
    try {
      const channel = await this.createChannel();
      await channel.assertQueue(queueName, {durable:true, arguments:{"x-queue-type":"quorum"}});
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(content)), {
        persistent: true,
      });
      console.log(`Mensaje enviado a la cola ${queueName}:`)
      console.log(content);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async consumeQueue(queueName: string): Promise<QueueResponse | null> {
    try {
      const channel = await this.createChannel();
      await channel.assertQueue(queueName, {durable:true, arguments:{"x-queue-type":"quorum"}});
      const message = await new Promise<QueueResponse | null>((resolve, reject) => {
        channel.get(queueName, { noAck: false }, (err, msg) => {
          if (err) {
            reject(err);
          } else {
            resolve(msg);
          }
        });
      });
      if (message) {
        const parsedContent = JSON.parse(message.content.toString());
        await channel.ack(message);
        return parsedContent;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export function initAmqpLib(url: string): Amqplib {
  return new Amqplib(url);
}