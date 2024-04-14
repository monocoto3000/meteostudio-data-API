import { DataRepository } from "../../domain/repository/DataRepository";
import { Data } from "../../domain/entities/Data";

export class GetDataByIDUseCase {
  constructor(private readonly dataRepository: DataRepository) {}
  async execute(stationId: string): Promise<Data[]> {
    try {
      const date = new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"})
      const useDate = new Date(date);
      const startDate = new Date(useDate.getFullYear(), useDate.getMonth(), useDate.getDate(), 0, 0, 0, 0);
      const endDate = new Date(useDate.getFullYear(), useDate.getMonth(), useDate.getDate(), 23, 59, 59, 999);

      const data = await this.dataRepository.getAllDataByStationId(stationId, startDate, endDate);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Error obteniendo los datos");
    }
  }
}