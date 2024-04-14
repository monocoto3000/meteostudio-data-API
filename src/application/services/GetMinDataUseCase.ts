import { Data } from "../../domain/entities/Data";
import { DataRepository } from "../../domain/repository/DataRepository";

export class GetMinDataUseCase {
    constructor(private readonly dataRepository: DataRepository) { }

    async getMinData(stationId: string): Promise<Data> {
        try {
            const currentDate = new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" });
            const minData = await this.dataRepository.getMinData(stationId, currentDate);
            if (minData) {
                return minData;
            } else {
                throw new Error("Error obteniendo el mínimo");
            }
        } catch (error) {
            console.error("Error:", error);
            throw new Error("Error obteniendo el mínimo");
        }
    }
}