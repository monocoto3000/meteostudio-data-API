import { Data } from "../../domain/entities/Data";
import { DataRepository } from "../../domain/repository/DataRepository";

export class GetMinDataUseCase {
    constructor(private readonly dataRepository: DataRepository) { }

    async getMinData(stationId: string): Promise<Data> {
        try {
            const minTemperatureData = await this.dataRepository.getMinTemperature(stationId);
            const minHumidityData = await this.dataRepository.getMinHumidity(stationId);
            const minRadiationData = await this.dataRepository.getMinRadiation(stationId);
            if (minHumidityData && minRadiationData && minTemperatureData) {
                return {
                    station_id: stationId,
                    temperature: minTemperatureData.temperature,
                    humidity: minHumidityData.humidity,
                    radiation: minRadiationData.radiation,
                };
            } else {
                throw new Error("Error obteniendo el mínimo");
            } 
        } catch (error) {
            console.error("Error:", error);
            throw new Error("Error obteniendo el mínimo");
        }
    }
}