import { Data } from "../../domain/entities/Data";
import { DataRepository } from "../../domain/repository/DataRepository";

export class GetMaxDataUseCase {
  constructor(private readonly dataRepository: DataRepository) { }

  async getMaxData(stationId: string, date: string): Promise<Data | null> {
    try {
      const useDate = new Date(date);
      const startOfDay = new Date(useDate.getFullYear(), useDate.getMonth(), useDate.getDate(), 0, 0, 0, 0);
      const endOfDay = new Date(useDate.getFullYear(), useDate.getMonth(), useDate.getDate(), 23, 59, 59, 999);

      const allData = await this.dataRepository.getAllDataByStationId(stationId, startOfDay, endOfDay);

      let maxTemperature = -Infinity;
      let maxHumidity = -Infinity;
      let maxRadiation = -Infinity;

      allData.forEach(data => {
        if (data.temperature > maxTemperature) {
          maxTemperature = data.temperature;
        }
        if (data.humidity > maxHumidity) {
          maxHumidity = data.humidity;
        }
        if (data.radiation > maxRadiation) {
          maxRadiation = data.radiation;
        }
      });

      const maxData: Data = {
        station_id: stationId,
        temperature: maxTemperature,
        humidity: maxHumidity,
        radiation: maxRadiation,
        createdAt: new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"})
      };

      return maxData;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Error obteniendo el máximo");
    }
  }
}
