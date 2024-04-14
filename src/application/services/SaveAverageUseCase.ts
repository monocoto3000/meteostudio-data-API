import { DataRepository } from '../../domain/repository/DataRepository';
import { BrokerRepository } from '../../shared/broker/domain/repository/BrokerRepository';
import { Data } from '../../domain/entities/Data';
import { QueueRequest, QueueName } from '../../shared/broker/domain/entities';

export class SaveAverageUseCase {
  constructor(
    private dataRepository: DataRepository,
    private brokerRepository: BrokerRepository
  ) {}

  async execute(data: Data[]): Promise<void> {
    const averages = this.calculateAverages(data);

    for (const average of averages) {
      average.createdAt = new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"});
      await this.dataRepository.saveAverage(average);
      
      const queueRequest: QueueRequest = {
        queueName: QueueName.FinalQueue,
        content: average 
      };
      await this.brokerRepository.sendMessageToChannel(queueRequest)
    }
  }

  private calculateAverages(data: Data[]): Data[] {
    if (!data || data.length === 0) {
      throw new Error('No se han proporcionado datos válidos');
    }

    const groupedData = data.reduce((acc, item) => {
      if (!acc[item.station_id]) {
        acc[item.station_id] = {
          station_id: item.station_id,
          temperature: 0,
          humidity: 0,
          radiation: 0,
          count: 0
        };
      }
      acc[item.station_id].temperature += item.temperature;
      acc[item.station_id].humidity += item.humidity;
      acc[item.station_id].radiation += item.radiation;
      acc[item.station_id].count++;
      return acc;
    }, {} as Record<string, { station_id: string; temperature: number; humidity: number; radiation: number; count: number }>);

    const averages = Object.values(groupedData).map(({ station_id, temperature, humidity, radiation, count }) => ({
      station_id,
      temperature: temperature / count,
      humidity: humidity / count,
      radiation: (radiation / count) * 1000
    }));

    return averages;
  }
}