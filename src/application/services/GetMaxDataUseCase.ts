import { Data } from "../../domain/entities/Data";
import { DataRepository } from "../../domain/repository/DataRepository";

export class GetMaxDataUseCase {
    constructor(private readonly dataRepository: DataRepository) {}
  
    async getMaxData(stationId: string): Promise<Data> {
      try {
        const maxTemperatureData = await this.dataRepository.getMaxTemperature(stationId);
        const maxHumidityData = await this.dataRepository.getMaxHumidity(stationId);
        const maxRadiationData = await this.dataRepository.getMaxRadiation(stationId);
  
        if (maxTemperatureData && maxHumidityData && maxRadiationData) {
          return {
            station_id: stationId,
            temperature: maxTemperatureData.temperature,
            humidity: maxHumidityData.humidity,
            radiation: maxRadiationData.radiation,
          };
        } else {
          throw new Error("Error obteniendo el máximo");
        }
      } catch (error) {
        console.error("Error:", error);   
        throw new Error("Error obteniendo el máximo");
      }
    }
  }