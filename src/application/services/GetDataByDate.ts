import { DataRepository } from "../../domain/repository/DataRepository";
import { Data } from "../../domain/entities/Data";

export class GetDataByDateUseCase {
  constructor(private readonly dataRepository: DataRepository) {}
  async execute(stationId: string, startDate: Date, endDate: Date): Promise<Data[]> {
    try {
      const data = await this.dataRepository.getAllDataByStationId(stationId, startDate, endDate);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Error obteniendo los datos");
    }
  }
}