import { Request, Response } from 'express';
import { SaveAverageUseCase } from '../../application/services/SaveAverageUseCase';
import { Amqplib } from '../../infrastructure/brokers/amqplib/Amqplib';
import { QueueName } from '../../shared/broker/domain/entities/QueueName';

export class ReceiveDataController {
  private channel: any;

  constructor(private saveAverageUseCase: SaveAverageUseCase, private amqpLib: Amqplib) {
    this.initChannel();
    this.consumeFromQueue(); 
  }

  private async initChannel() {
    this.channel = await this.amqpLib.createChannel();
    await this.channel.assertQueue(QueueName.InitialQueue);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data = request.body; 
      console.log(data)
      if (!data || !Array.isArray(data)) {
        return response.status(400).json({ error: 'Datos incorrectos o faltantes' });
      }
      
      await this.saveAverageUseCase.execute(data);

      return response.status(200).json({ message: 'Datos recibidos y guardados correctamente' });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      return response.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  private async consumeFromQueue(): Promise<void> {
    try {
      await this.channel.consume(QueueName.InitialQueue, async (msg: any) => {
        if (msg !== null) {
          const parsedData = JSON.parse(msg.content.toString());
          await this.saveAverageUseCase.execute([parsedData]); 
          this.channel.ack(msg);
        } else {
          console.log("No hay más mensajes")
        }
      });
    } catch (err: any) {
      console.error('Error al consumir de la cola:', err);
    }
  }
}
