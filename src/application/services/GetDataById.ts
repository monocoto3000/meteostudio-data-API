import { DataRepository } from "../../domain/repository/DataRepository";
import { Data } from "../../domain/entities/Data";

export class GetDataByIDUseCase {
  constructor(private readonly dataRepository: DataRepository) {}
  async execute(stationId: string): Promise<Data[]> {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const data = await this.dataRepository.getAllDataByStationId(stationId, startOfDay, endOfDay);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Error obteniendo los datos");
    }
  }
}