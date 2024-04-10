import { DataRepository } from '../../domain/repository/DataRepository';
import { Data } from '../../domain/entities/Data';

export class SaveAverageUseCase {
  constructor(private dataRepository: DataRepository) {}

  async execute(data: Data[]): Promise<void> {
    const averages = this.calculateAverages(data);
    await this.dataRepository.saveAverage(averages);
  }

  private calculateAverages(data: Data[]): Data {
    if (!data || data.length === 0) {
      throw new Error('No se han proporcionado datos válidos');
    }
    const stationId = data[0].station_id;
    const temperature = data.reduce((sum, item) => sum + item.temperature, 0) / data.length;
    const humidity = data.reduce((sum, item) => sum + item.humidity, 0) / data.length;
    const radiation = data.reduce((sum, item) => sum + item.radiation, 0) / data.length;
  
    return { station_id: stationId, temperature: temperature, humidity: humidity, radiation: radiation };
  }
  
}