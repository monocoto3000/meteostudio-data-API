import { Data } from "../../domain/entities/Data";
import { DataRepository } from "../../domain/repository/DataRepository";

export class GetMinDataUseCase {
    constructor(private readonly dataRepository: DataRepository) { }

    async getMinData(stationId: string, date: string): Promise<Data | null> {
        try {
            const useDate = new Date(date);
            const startOfDay = new Date(useDate.getFullYear(), useDate.getMonth(), useDate.getDate(), 0, 0, 0, 0);
            const endOfDay = new Date(useDate.getFullYear(), useDate.getMonth(), useDate.getDate(), 23, 59, 59, 999);
            const allData = await this.dataRepository.getAllDataByStationId(stationId, startOfDay, endOfDay);
            if (allData.length === 0) {
                return null;
            }
            let minTemperature = Infinity;
            let minHumidity = Infinity;
            let minRadiation = Infinity;

            allData.forEach(data => {
                if (data.temperature < minTemperature) {
                    minTemperature = data.temperature;
                }
                if (data.humidity < minHumidity) {
                    minHumidity = data.humidity;
                }
                if (data.radiation < minRadiation) {
                    minRadiation = data.radiation;
                }
            });

            const minData: Data = {
                station_id: stationId,
                temperature: minTemperature,
                humidity: minHumidity,
                radiation: minRadiation,
                createdAt: new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" })
            };

            return minData;
        } catch (error) {
            console.error("Error:", error);
            throw new Error("Error obteniendo el mínimo");
        }
    }
}