import { DataRepository } from "../../domain/repository/DataRepository";
import { Data } from "../../domain/entities/Data";

export class GetDataByIDUseCase {
  constructor(private readonly dataRepository: DataRepository) {}

  async execute(stationId: string): Promise<Data[]> {
    try {
      const data = await this.dataRepository.getAllDataByStationId(stationId);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Error obteniendo los datos");
    }
  }
}